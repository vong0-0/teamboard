import { SidebarTrigger as SidebarTriggerPrimitive } from "~/components/ui/sidebar";

export function SidebarTrigger() {
  return (
    <SidebarTriggerPrimitive className="border-ink bg-paper text-ink shadow-hard-sm size-10 rounded-sm border-2 md:hidden lg:inline-flex" />
  );
}
