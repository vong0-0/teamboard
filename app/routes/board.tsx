import { useState } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/board";
import { BoardHeader } from "~/components/board/board-header";
import { BoardEmptyState } from "~/components/board/board-empty-state";
import { BoardColumns } from "~/components/board/board-columns";
import type { BoardView } from "~/components/board/board-view-tabs";
import { SidebarTrigger } from "~/components/layout/sidebar-trigger";
import { Topbar } from "~/components/layout/topbar";
import { mockProjects } from "~/mock-data/projects";
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
  const view = getBoardView(searchParams.get("view"));

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
            <BoardColumns />
          ) : (
            <ComingSoonView view={view} />
          )
        ) : (
          <BoardEmptyState
            selectedProjectId={selectedProjectId}
            onProjectSelect={setSelectedProjectId}
          />
        )}
      </div>
    </>
  );
}

function getBoardView(value: string | null): BoardView {
  return value === "list" || value === "timeline" ? value : "board";
}

function ComingSoonView({ view }: { view: Exclude<BoardView, "board"> }) {
  const label = view === "list" ? "List" : "Timeline";

  return (
    <section
      aria-live="polite"
      className="flex min-h-72 items-center justify-center text-center"
    >
      <p className="font-mono text-sm font-bold text-gray-500">
        {label} view is coming back soon.
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
