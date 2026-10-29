import {
  Calendar,
  FolderDot,
  FolderUsers,
  LayoutDashboard,
  LogOut,
  Presentation,
  Send,
  User,
  type LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Track } from "../shared/track";
import { getAvatarFallback } from "~/lib/get-avatar-fallback";
import { useIsMobile } from "~/hooks/use-mobile";

const sidebarData = {
  workspace: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: FolderDot,
    },
    {
      title: "Boards",
      url: "/dashboard",
      icon: Presentation,
    },
    {
      title: "Message",
      url: "/dashboard",
      icon: Send,
    },
    {
      title: "Calendar",
      url: "/dashboard",
      icon: Calendar,
    },
    {
      title: "Team",
      url: "/dashboard",
      icon: FolderUsers,
    },
  ],
};

export function ProtectedSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-ink group-data-[side=left]:border-r-2"
      {...props}
    >
      <Header />
      <SidebarContent>
        <NavWorkspace items={sidebarData.workspace} />
      </SidebarContent>

      <SidebarFooter className="space-y-1.5">
        <Storage data={{ storageLimitGB: 10, storageUsedGB: 7.2 }} />
        <UserNav
          user={{
            name: "Vongsouvan Chanthasone",
            email: "vongsouvan@email.com",
          }}
        />
      </SidebarFooter>
      <SidebarRail className="hover:after:bg-gray-500" />
    </Sidebar>
  );
}

function Header() {
  return (
    <SidebarHeader>
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

function NavWorkspace({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarMenu className="space-y-1.5">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              render={<Link to={item.url} />}
              tooltip={{ children: item.title, sideOffset: 10 }}
              isActive={pathname === item.url && item.title === "Dashboard"}
              className="data-active:bg-ink data-active:text-paper transition-colors hover:bg-gray-200"
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function Storage({
  data,
}: {
  data: { storageUsedGB: number; storageLimitGB: number };
}) {
  return (
    <SidebarMenu className="group-data-[collapsible=icon]:hidden">
      <SidebarMenuItem>
        <div className="border-ink space-y-2 rounded-sm border-2 bg-gray-100 p-3.5">
          <p className="font-mono text-[10px] font-bold text-gray-500 uppercase">
            Storage
          </p>

          <div className="space-y-2">
            <p className="text-ink font-mono text-[13px] font-bold">
              {data.storageUsedGB} GB / {data.storageLimitGB} GB
            </p>
            <Track value={data.storageUsedGB} max={data.storageLimitGB} />
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function UserNav({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  const isMobile = useIsMobile();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
            <Avatar className="border-ink h-8 w-8 shrink-0 rounded-full border-2">
              <AvatarFallback className="text-ink rounded-full font-mono text-[13px] font-bold">
                {getAvatarFallback(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-ink truncate text-[13px] font-bold">
                {user.name}
              </span>
              <span className="truncate font-mono text-[10px] text-gray-500">
                {user.email}
              </span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "top" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="border-ink h-8 w-8 shrink-0 rounded-full border-2">
                    <AvatarFallback className="text-ink rounded-full font-mono text-[13px] font-bold">
                      {getAvatarFallback(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="text-ink truncate text-[13px] font-bold">
                      {user.name}
                    </span>
                    <span className="truncate font-mono text-[10px] text-gray-500">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
