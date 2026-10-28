import { Sidebar, SidebarContent } from "~/components/ui/sidebar";

export function ProtectedSidebar() {
  return (
    <Sidebar side="left" collapsible="icon" className="md:hidden lg:block">
      <SidebarContent className="p-5" />
    </Sidebar>
  );
}
