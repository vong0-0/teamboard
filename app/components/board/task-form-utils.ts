import { mockBoardColumns } from "~/mock-data/board";
import { mockProjects } from "~/mock-data/projects";
import type { Task } from "~/type";
import type { TaskFormValues } from "./task-form-schema";

export function getTaskFormValues(
  task: Task | null,
  projectId: string,
  initialColumnId?: number,
): TaskFormValues {
  const project = task
    ? (mockProjects[task.projectId - 1] ?? mockProjects[0])
    : null;

  return {
    title: task?.title ?? "",
    description: task?.description ?? "",
    projectId: project?.id ?? projectId,
    columnId:
      task?.columnId ??
      initialColumnId ??
      mockBoardColumns.find((column) => column.label === "To do")?.id ??
      mockBoardColumns[0].id,
    priority: task?.priority ?? "med",
    dueDate: task?.dueDate ?? "",
    assigneeIds: task?.assigneeIds ?? [],
    labelIds: task?.labelIds ?? [],
    subtasks: task?.subtasks ?? [],
  };
}

export function createTaskFromForm(
  values: TaskFormValues,
  existing: Task | null,
  allTasks: Task[],
): Task {
  const now = new Date().toISOString();
  const id =
    existing?.id ?? Math.max(0, ...allTasks.map((task) => task.id)) + 1;
  const projectIndex = mockProjects.findIndex(
    (project) => project.id === values.projectId,
  );
  const sameColumnTasks = allTasks.filter(
    (task) => task.columnId === values.columnId && task.id !== existing?.id,
  );

  return {
    id,
    key: existing?.key ?? `TB-${id}`,
    projectId: projectIndex >= 0 ? projectIndex + 1 : 1,
    sprintId: existing?.sprintId ?? 14,
    columnId: values.columnId,
    order:
      existing?.columnId === values.columnId
        ? existing.order
        : sameColumnTasks.length,
    title: values.title.trim(),
    description: values.description.trim(),
    priority: values.priority,
    assigneeIds: values.assigneeIds,
    labelIds: values.labelIds,
    subtasks: values.subtasks.map((subtask, order) => ({ ...subtask, order })),
    dueDate: values.dueDate || null,
    createdById: existing?.createdById ?? 1,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    commentCount: existing?.commentCount ?? 0,
    attachmentCount: existing?.attachmentCount ?? 0,
  };
}
