import { useState } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/board";
import { BoardEmptyState } from "~/components/board/board-empty-state";
import { BoardHeader } from "~/components/board/board-header";
import {
  BoardColumns,
  type BoardTasksByColumn,
} from "~/components/board/board-columns";
import { BoardList } from "~/components/board/board-list";
import { TaskDrawer } from "~/components/board/task-drawer";
import type { BoardView } from "~/components/board/board-view-tabs";
import { SidebarTrigger } from "~/components/layout/sidebar-trigger";
import { Topbar } from "~/components/layout/topbar";
import { mockProjects } from "~/mock-data/projects";
import { mockBoardColumns, mockBoardTasks } from "~/mock-data/board";
import type { Subtask } from "~/type";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Board | Teamboard" },
    { name: "description", content: "Your Teamboard workspace board." },
  ];
}

export default function Board() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProjectId, setSelectedProjectId] = useState(
    () => mockProjects[0]?.id ?? "",
  );
  const [tasksByColumn, setTasksByColumn] = useState(
    createInitialTasksByColumn,
  );
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const view = getBoardView(searchParams.get("view"));
  const tasks = Object.values(tasksByColumn).flat();
  const selectedTask = selectedTaskId
    ? (tasks.find((task) => task.id === selectedTaskId) ?? null)
    : null;

  function handleViewChange(nextView: BoardView) {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set("view", nextView);
      return nextParams;
    });
  }

  return (
    <>
      <Topbar left={<PageBreadcrumb />} right={<SidebarTrigger />} />
      <div className="page-content">
        <BoardHeader
          selectedProjectId={selectedProjectId}
          onProjectSelect={setSelectedProjectId}
          view={view}
          onViewChange={handleViewChange}
        />
        {selectedProjectId ? (
          view === "board" ? (
            <BoardColumns
              tasksByColumn={tasksByColumn}
              onTasksChange={setTasksByColumn}
              onTaskSelect={(task) => setSelectedTaskId(task.id)}
            />
          ) : view === "list" ? (
            <BoardList
              tasks={tasks}
              onTaskSelect={(task) => setSelectedTaskId(task.id)}
            />
          ) : (
            <ComingSoonView />
          )
        ) : (
          <BoardEmptyState
            selectedProjectId={selectedProjectId}
            onProjectSelect={setSelectedProjectId}
          />
        )}
      </div>
      <TaskDrawer
        task={selectedTask}
        tasks={tasks}
        open={selectedTask !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedTaskId(null);
        }}
        onTaskSelect={(nextTask) => setSelectedTaskId(nextTask.id)}
        onTaskDelete={(taskId) => {
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
        }}
        onSubtasksChange={(
          taskId: number,
          update: (subtasks: Subtask[]) => Subtask[],
        ) => {
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
        }}
      />
    </>
  );
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

function getBoardView(value: string | null): BoardView {
  return value === "list" || value === "timeline" ? value : "board";
}

function ComingSoonView() {
  return (
    <section
      aria-live="polite"
      className="flex min-h-72 items-center justify-center text-center"
    >
      <p className="font-mono text-sm font-bold text-gray-500">
        Timeline view is coming back soon.
      </p>
    </section>
  );
}

function PageBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbPage>Board</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
