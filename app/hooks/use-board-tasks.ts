import { useState } from "react";
import { createTaskFromForm } from "~/components/board/task-form-utils";
import type { TaskFormValues } from "~/components/board/task-form-schema";
import { mockBoardColumns, mockBoardTasks } from "~/mock-data/board";
import type { BoardTasksByColumn, Subtask, Task } from "~/type";

export function useBoardTasks() {
  const [tasksByColumn, setTasksByColumn] = useState<BoardTasksByColumn>(
    createInitialTasksByColumn,
  );
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null);
  const [newTaskColumnId, setNewTaskColumnId] = useState<number | undefined>();

  const tasks = Object.values(tasksByColumn).flat();
  const selectedTask = selectedTaskId
    ? (tasks.find((task) => task.id === selectedTaskId) ?? null)
    : null;

  function openTask(task: Task) {
    setSelectedTaskId(task.id);
  }

  function openNewTask(columnId?: number) {
    setTaskBeingEdited(null);
    setNewTaskColumnId(columnId);
    setTaskFormOpen(true);
  }

  function openEditTask(task: Task) {
    setTaskBeingEdited(task);
    setSelectedTaskId(null);
    setTaskFormOpen(true);
  }

  function closeTaskForm() {
    setTaskFormOpen(false);
    setTaskBeingEdited(null);
    setNewTaskColumnId(undefined);
  }

  function saveTask(values: TaskFormValues) {
    const nextTask = createTaskFromForm(values, taskBeingEdited, tasks);

    setTasksByColumn((current) => {
      const next = Object.fromEntries(
        Object.entries(current).map(([columnId, columnTasks]) => [
          columnId,
          columnTasks
            .filter((task) => task.id !== nextTask.id)
            .map((task, order) => ({ ...task, order })),
        ]),
      );
      const destination = String(nextTask.columnId);
      const destinationTasks = next[destination] ?? [];
      next[destination] = [...destinationTasks, nextTask]
        .sort((left, right) => left.order - right.order)
        .map((task, order) => ({ ...task, order }));
      return next;
    });

    closeTaskForm();
  }

  function deleteTask(taskId: number) {
    setTasksByColumn((current) =>
      Object.fromEntries(
        Object.entries(current).map(([columnId, columnTasks]) => [
          columnId,
          columnTasks
            .filter((task) => task.id !== taskId)
            .map((task, order) => ({ ...task, order })),
        ]),
      ),
    );
    setSelectedTaskId(null);
  }

  function updateSubtasks(
    taskId: number,
    update: (subtasks: Subtask[]) => Subtask[],
  ) {
    setTasksByColumn((current) =>
      Object.fromEntries(
        Object.entries(current).map(([columnId, columnTasks]) => [
          columnId,
          columnTasks.map((task) =>
            task.id === taskId
              ? { ...task, subtasks: update(task.subtasks) }
              : task,
          ),
        ]),
      ),
    );
  }

  return {
    tasks,
    tasksByColumn,
    setTasksByColumn,
    selectedTask,
    taskFormOpen,
    taskBeingEdited,
    newTaskColumnId,
    openTask,
    openNewTask,
    openEditTask,
    closeTaskForm,
    saveTask,
    deleteTask,
    updateSubtasks,
    closeTaskDrawer: () => setSelectedTaskId(null),
  };
}

function createInitialTasksByColumn(): BoardTasksByColumn {
  return Object.fromEntries(
    mockBoardColumns.map((column) => [
      String(column.id),
      mockBoardTasks
        .filter(
          (task) =>
            task.columnId === column.id &&
            (task.sprintId === null || task.sprintId === 14),
        )
        .sort((left, right) => left.order - right.order),
    ]),
  );
}
