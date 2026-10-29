import type { Route } from "./+types/dashboard";
import { Topbar } from "~/components/layout/topbar";
import { SidebarTrigger } from "~/components/layout/sidebar-trigger";
import { DashboardHeader } from "~/components/dashboard/dashboard-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { StatCard, type StatCardProps } from "~/components/dashboard/stat-card";
import { RevenueChart } from "~/components/dashboard/charts/revenue-chart";
import { TaskStatusChart } from "~/components/dashboard/charts/task-status-chart";
import { MyLatestTasks } from "~/components/dashboard/tables/my-latest-tasks";
import { ActivityLog } from "~/components/dashboard/activity-log";

const dashboardStats = [
  {
    title: "Revenue",
    value: "$48,290",
    badge: "+12%",
    badgeTone: "positive",
  },
  {
    title: "Active projects",
    value: "24",
    badge: "+3",
    badgeTone: "positive",
  },
  {
    title: "Open tasks",
    value: "78",
    badge: "-8%",
    badgeTone: "negative",
  },
  {
    title: "Team online",
    value: "11 / 16",
    badge: "LIVE",
    badgeTone: "live",
  },
] satisfies StatCardProps[];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | Teamboard" },
    { name: "description", content: "Your Teamboard dashboard." },
  ];
}

export default function Dashboard() {
  return (
    <>
      <Topbar left={<PageBreadcrumb />} right={<SidebarTrigger />} />
      <div className="page-content @container/sidebar min-w-0">
        <DashboardHeader />
        <div className="sidebar:grid-cols-1 mt-6 grid min-w-0 gap-6 @lg/sidebar:grid-cols-2 @5xl/sidebar:grid-cols-4">
          {dashboardStats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="mt-6 grid min-w-0 gap-6 @2xl/sidebar:grid-cols-3">
          <div className="min-w-0 @2xl/sidebar:col-span-2">
            <RevenueChart />
          </div>
          <TaskStatusChart />
        </div>

        <div className="mt-6 grid min-w-0 gap-6 @2xl/sidebar:grid-cols-3">
          <div className="min-w-0 @2xl/sidebar:col-span-2">
          <MyLatestTasks />
          </div>
          <ActivityLog />
        </div>
      </div>
    </>
  );
}

function PageBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbPage>Dashboard</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
