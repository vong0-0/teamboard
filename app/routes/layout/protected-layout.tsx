import { Outlet } from "react-router";
import { ProtectedSidebar } from "../../components/layout/protected-sidebar";
import { TabBar } from "../../components/layout/tab-bar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export default function ProtectedLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "240px",
        } as React.CSSProperties
      }
    >
      <ProtectedSidebar />
      <SidebarInset className="pb-[69px] lg:pb-0">
        <Outlet />
        <TabBar />
      </SidebarInset>
    </SidebarProvider>
  );
}
