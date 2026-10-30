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
  startDate?: string;
  dueDate?: string;
  sprint?: string;
};
