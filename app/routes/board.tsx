import { useState } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/board";
import { BoardEmptyState } from "~/components/board/board-empty-state";
import { BoardHeader } from "~/components/board/board-header";
import { BoardColumns } from "~/components/board/board-columns";
import { BoardList } from "~/components/board/board-list";
import { TaskDrawer } from "~/components/board/task-drawer";
import { TaskForm } from "~/components/board/task-form";
import {
  parseBoardView,
  type BoardView,
} from "~/components/board/board-view-tabs";
import { SidebarTrigger } from "~/components/layout/sidebar-trigger";
import { Topbar } from "~/components/layout/topbar";
import { mockProjects } from "~/mock-data/projects";
import { useBoardTasks } from "~/hooks/use-board-tasks";
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
  const board = useBoardTasks();
  const view = parseBoardView(searchParams.get("view"));

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
          onNewTask={() => board.openNewTask()}
        />
        {selectedProjectId ? (
          view === "board" ? (
            <BoardColumns
              tasksByColumn={board.tasksByColumn}
              onTasksChange={board.setTasksByColumn}
              onTaskSelect={board.openTask}
              onTaskCreate={board.openNewTask}
            />
          ) : view === "list" ? (
            <BoardList tasks={board.tasks} onTaskSelect={board.openTask} />
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
        task={board.selectedTask}
        tasks={board.tasks}
        open={board.selectedTask !== null}
        onOpenChange={(open) => {
          if (!open) board.closeTaskDrawer();
        }}
        onTaskSelect={board.openTask}
        onTaskEdit={board.openEditTask}
        onTaskDelete={board.deleteTask}
        onSubtasksChange={board.updateSubtasks}
      />
      <TaskForm
        open={board.taskFormOpen}
        task={board.taskBeingEdited}
        projectId={selectedProjectId}
        initialColumnId={board.newTaskColumnId}
        onOpenChange={(open) => {
          if (!open) board.closeTaskForm();
        }}
        onSubmit={board.saveTask}
      />
    </>
  );
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
