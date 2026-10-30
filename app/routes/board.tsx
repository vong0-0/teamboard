import { useState } from "react";
import type { Route } from "./+types/board";
import { BoardHeader } from "~/components/board/board-header";
import { BoardEmptyState } from "~/components/board/board-empty-state";
import { BoardColumns } from "~/components/board/board-columns";
import { SidebarTrigger } from "~/components/layout/sidebar-trigger";
import { Topbar } from "~/components/layout/topbar";
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
  const [selectedProjectId, setSelectedProjectId] = useState("");

  return (
    <>
      <Topbar left={<PageBreadcrumb />} right={<SidebarTrigger />} />
      <div className="page-content">
        <BoardHeader
          selectedProjectId={selectedProjectId}
          onProjectSelect={setSelectedProjectId}
        />
        {selectedProjectId ? (
          <BoardColumns />
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

function PageBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbPage>Board</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
