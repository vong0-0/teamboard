import type {
  StatCardBadgeTone,
  StatCardProps,
} from "~/components/dashboard/stat-card";
import type { Priority } from "~/components/shared/priority-badge";

export const mockDashboardStats = [
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

export const mockDashboardActivities = [
  {
    initials: "HP",
    name: "Haemin",
    action: 'moved "Hero" to Done',
    time: "2m ago",
  },
  {
    initials: "OP",
    name: "Olga",
    action: 'commented on "API docs"',
    time: "18m ago",
  },
  {
    initials: "JS",
    name: "Jin",
    action: 'created project "Brand v2"',
    time: "1h ago",
  },
  { initials: "AL", name: "Ana", action: "uploaded 4 files", time: "3h ago" },
  { initials: "TR", name: "Tom", action: "closed bug #204", time: "5h ago" },
];

export type RevenuePeriod = "7D" | "30D" | "1Y";

type RevenuePoint = {
  label: string;
  value: number;
};

export const mockRevenueByPeriod: Record<RevenuePeriod, RevenuePoint[]> = {
  "7D": [
    { label: "MON", value: 6820 },
    { label: "TUE", value: 7340 },
    { label: "WED", value: 7050 },
    { label: "THU", value: 8120 },
    { label: "FRI", value: 7790 },
    { label: "SAT", value: 8610 },
    { label: "SUN", value: 8420 },
  ],
  "30D": [
    { label: "NOV", value: 6120 },
    { label: "DEC", value: 7280 },
    { label: "JAN", value: 6820 },
    { label: "FEB", value: 8420 },
    { label: "MAR", value: 7790 },
    { label: "APR", value: 9120 },
    { label: "MAY", value: 8610 },
    { label: "JUN", value: 10380 },
    { label: "JUL", value: 9760 },
    { label: "AUG", value: 10890 },
    { label: "SEP", value: 10120 },
    { label: "OCT", value: 11420 },
  ],
  "1Y": [
    { label: "NOV", value: 24800 },
    { label: "DEC", value: 28600 },
    { label: "JAN", value: 27100 },
    { label: "FEB", value: 33400 },
    { label: "MAR", value: 31200 },
    { label: "APR", value: 36800 },
    { label: "MAY", value: 34500 },
    { label: "JUN", value: 42100 },
    { label: "JUL", value: 39700 },
    { label: "AUG", value: 45800 },
    { label: "SEP", value: 43100 },
    { label: "OCT", value: 48290 },
  ],
};

export const mockTaskStatuses = [
  { name: "Done", value: 64, color: "var(--color-ink)" },
  { name: "In progress", value: 43, color: "var(--color-gray-500)" },
  { name: "To do", value: 35, color: "var(--color-gray-200)" },
];

export const mockLatestTasks: {
  title: string;
  project: string;
  due: string;
  priority: Priority;
  assignee: string;
}[] = [
  { title: "Design kanban cards", project: "Retro Kit", due: "Oct 24", priority: "HIGH", assignee: "HP" },
  { title: "Fix navbar overflow", project: "Marketing", due: "Oct 25", priority: "MED", assignee: "OP" },
  { title: "Write API docs", project: "Mockapi", due: "Oct 26", priority: "LOW", assignee: "MC" },
  { title: "Review pull requests", project: "Retro Kit", due: "Oct 27", priority: "HIGH", assignee: "JS" },
  { title: "Export icon set", project: "Brand", due: "Oct 28", priority: "MED", assignee: "AL" },
];

export const mockStatCardChartPointsByTone: Record<StatCardBadgeTone, number[]> = {
  positive: [3, 7, 5, 11, 9, 14, 16],
  negative: [15, 13, 14, 9, 12, 8, 6],
  live: [7, 12, 9, 14, 10, 12, 11],
};

export const mockNeutralStatCardChartPoints = [5, 8, 6, 10, 7, 9, 11];
