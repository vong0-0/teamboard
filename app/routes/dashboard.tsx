import type { Route } from "./+types/dashboard";
import { Topbar } from "~/components/layout/topbar";
import { SidebarTrigger } from "~/components/ui/sidebar";

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
          <div className="font-mono text-[9px] font-bold tracking-wide text-gray-500">
            WORKSPACE / DASHBOARD
          </div>
        }
        right={
          <SidebarTrigger className="border-ink bg-paper text-ink shadow-hard-sm size-10 rounded-sm border-2 md:hidden lg:inline-flex" />
        }
      />
      <main>
        <div className="font-display text-3xl font-bold">
          Bricolage Grotesque
        </div>
        <div className="font-mono text-3xl font-bold">Bricolage Grotesque</div>
        <div className="font-sans text-3xl font-bold">Bricolage Grotesque</div>
      </main>
    </>
  );
}
