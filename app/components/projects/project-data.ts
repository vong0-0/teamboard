import type { ProjectStatus } from "~/components/shared/project-status-badge";

export type Project = {
  id: string;
  initials: string;
  name: string;
  description: string;
  owner: string;
  ownerInitials: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  due: string;
};

export const mockProjects: Project[] = [
  { id: "retro-kit", initials: "RE", name: "Retro Kit", description: "Design system", owner: "Haemin", ownerInitials: "HP", status: "ACTIVE", progress: 72, budget: 12400, due: "Nov 12" },
  { id: "marketing-site", initials: "MA", name: "Marketing site", description: "Landing + blog", owner: "Olga", ownerInitials: "OP", status: "ACTIVE", progress: 45, budget: 8900, due: "Nov 20" },
  { id: "mockapi-docs", initials: "MO", name: "Mockapi docs", description: "Developer docs", owner: "Mac", ownerInitials: "MC", status: "ON HOLD", progress: 28, budget: 2100, due: "Dec 01" },
  { id: "brand-v2", initials: "BR", name: "Brand v2", description: "Identity refresh", owner: "Jin", ownerInitials: "JS", status: "ACTIVE", progress: 88, budget: 15000, due: "Oct 30" },
  { id: "mobile-app", initials: "MO", name: "Mobile app", description: "iOS + Android", owner: "Ana", ownerInitials: "AL", status: "ACTIVE", progress: 33, budget: 42000, due: "Jan 15" },
  { id: "newsletter", initials: "NE", name: "Newsletter", description: "Weekly emails", owner: "Tom", ownerInitials: "TR", status: "DONE", progress: 100, budget: 1200, due: "Oct 10" },
  { id: "analytics", initials: "AN", name: "Analytics", description: "Dashboards", owner: "Haemin", ownerInitials: "HP", status: "ON HOLD", progress: 12, budget: 8500, due: "Dec 18" },
  { id: "support-portal", initials: "SU", name: "Support portal", description: "Help center", owner: "Olga", ownerInitials: "OP", status: "ACTIVE", progress: 58, budget: 9800, due: "Nov 28" },
  { id: "mobile-checkout", initials: "MC", name: "Mobile checkout", description: "Payment flow", owner: "Ana", ownerInitials: "AL", status: "ACTIVE", progress: 64, budget: 18500, due: "Dec 04" },
  { id: "brand-guidelines", initials: "BG", name: "Brand guidelines", description: "Visual standards", owner: "Jin", ownerInitials: "JS", status: "DONE", progress: 100, budget: 7200, due: "Oct 22" },
  { id: "api-v2", initials: "AP", name: "API v2", description: "Public endpoints", owner: "Mac", ownerInitials: "MC", status: "ON HOLD", progress: 38, budget: 26400, due: "Jan 08" },
  { id: "onboarding", initials: "ON", name: "Onboarding flow", description: "New user setup", owner: "Olga", ownerInitials: "OP", status: "ACTIVE", progress: 51, budget: 11300, due: "Nov 30" },
  { id: "design-system", initials: "DS", name: "Design system", description: "Tokens and UI", owner: "Haemin", ownerInitials: "HP", status: "ACTIVE", progress: 82, budget: 31600, due: "Dec 12" },
  { id: "email-templates", initials: "ET", name: "Email templates", description: "Lifecycle emails", owner: "Tom", ownerInitials: "TR", status: "DONE", progress: 100, budget: 3400, due: "Oct 18" },
  { id: "help-center", initials: "HC", name: "Help center", description: "Support content", owner: "Ana", ownerInitials: "AL", status: "ON HOLD", progress: 23, budget: 5600, due: "Dec 22" },
  { id: "performance", initials: "PE", name: "Performance audit", description: "Web vitals", owner: "Jin", ownerInitials: "JS", status: "ACTIVE", progress: 76, budget: 9400, due: "Nov 26" },
  { id: "partner-portal", initials: "PP", name: "Partner portal", description: "Vendor workspace", owner: "Olga", ownerInitials: "OP", status: "ACTIVE", progress: 19, budget: 22800, due: "Jan 20" },
  { id: "content-migration", initials: "CM", name: "Content migration", description: "CMS move", owner: "Mac", ownerInitials: "MC", status: "DONE", progress: 100, budget: 6800, due: "Oct 12" },
  { id: "audit-log", initials: "AL", name: "Audit log", description: "Activity history", owner: "Haemin", ownerInitials: "HP", status: "ON HOLD", progress: 42, budget: 14700, due: "Dec 28" },
];

export function filterProjects(
  projects: Project[],
  search: string,
  status: string | null,
) {
  const normalizedSearch = search.toLowerCase();

  return projects.filter((project) => {
    const matchesSearch = `${project.name} ${project.description} ${project.owner}`
      .toLowerCase()
      .includes(normalizedSearch);
    const matchesStatus =
      !status ||
      status === "all" ||
      project.status.toLowerCase().replace(" ", "-") === status;

    return matchesSearch && matchesStatus;
  });
}
