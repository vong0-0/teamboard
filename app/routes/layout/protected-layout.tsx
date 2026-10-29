import { Outlet } from "react-router";
import { ProtectedSidebar } from "../../components/layout/protected-sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { TooltipProvider } from "~/components/ui/tooltip";

export default function ProtectedLayout() {
  return (
    <TooltipProvider delay={0}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "240px",
          } as React.CSSProperties
        }
      >
        <ProtectedSidebar />
        <SidebarInset data-testid="sidebar-inset" className="pb-[69px] lg:pb-0">
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
