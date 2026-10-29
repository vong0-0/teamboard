import type { Route } from "./+types/projects";
import { Topbar } from "~/components/layout/topbar";
import { SidebarTrigger } from "~/components/layout/sidebar-trigger";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | Teamboard" },
    { name: "description", content: "Your Teamboard projects." },
  ];
}

export default function Projects() {
  return (
    <>
      <Topbar
        left={
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbPage>Projects</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        right={<SidebarTrigger />}
      />
      <div className="page-content">
        <h1 className="font-display text-3xl font-bold">Projects</h1>
      </div>
    </>
  );
}
