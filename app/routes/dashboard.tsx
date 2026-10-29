import type { Route } from "./+types/dashboard";
import { Topbar } from "~/components/layout/topbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { SidebarTrigger } from "~/components/layout/sidebar-trigger";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | Teamboard" },
    { name: "description", content: "Your Teamboard dashboard." },
  ];
}

export default function Dashboard() {
  return (
    <>
      <Topbar
        left={
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        right={<SidebarTrigger />}
      />
      <div className="page-content">
        <div className="font-display text-3xl font-bold">
          Bricolage Grotesque
        </div>
        <div className="font-mono text-3xl font-bold">Bricolage Grotesque</div>
        <div className="font-sans text-3xl font-bold">Bricolage Grotesque</div>
      </div>
    </>
  );
}
