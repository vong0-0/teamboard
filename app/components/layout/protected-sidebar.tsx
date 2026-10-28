import { Sidebar, SidebarContent } from "~/components/ui/sidebar";

export function ProtectedSidebar() {
  return (
    <Sidebar
      side="left"
      collapsible="icon"
      className="border-ink group-data-[side=left]:border-r-2 md:hidden lg:block"
    >
      <SidebarContent className="p-5" />
    </Sidebar>
  );
}
