import type { Route } from "./+types/projects";
import { Topbar } from "~/components/layout/topbar";
import { SidebarTrigger } from "~/components/layout/sidebar-trigger";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { ProjectsHeader } from "~/components/projects/projects-header";
import { ProjectStatusTabs } from "~/components/projects/project-status-tabs";
import { ProjectsToolbar } from "~/components/projects/projects-toolbar";
import { ProjectsTable } from "~/components/projects/projects-table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | Teamboard" },
    { name: "description", content: "Your Teamboard projects." },
  ];
}

export default function Projects() {
  return (
    <>
      <Topbar left={<PageBreadcrumb />} right={<SidebarTrigger />} />
      <div className="page-content">
        <ProjectsHeader />
        <ProjectStatusTabs />
        <ProjectsToolbar />
        <ProjectsTable />
      </div>
    </>
  );
}

function PageBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbPage>Projects</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
