import { Link } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

export function ProtectedSidebar() {
  return (
    <Sidebar
      side="left"
      collapsible="icon"
      className="border-ink group-data-[side=left]:border-r-2 md:hidden lg:block"
    >
      <Header />
    </Sidebar>
  );
}

function Header() {
  return (
    <SidebarHeader className="p-5 transition-all group-data-[collapsible=icon]:p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          {/* Brand */}
          <SidebarMenuButton
            render={<Link to="/dashboard" />}
            size="lg"
            tooltip="Teamboard"
            className="h-auto p-0"
          >
            <div className="bg-ink flex aspect-square size-8 shrink-0 items-center justify-center rounded-sm">
              <span className="text-paper text-lg font-bold">M</span>
            </div>
            <div className="font-display text-[22px] leading-tight font-bold">
              <span>Teamboard</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
