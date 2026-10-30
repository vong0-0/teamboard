import { getAvatarFallback } from "~/lib/get-avatar-fallback";
import type { Project } from "./project-data";
import { projectOwners } from "./project-form-options";
import type { ProjectFormValues } from "./project-form-schema";

export function getProjectFormValues(
  project: Project | null,
): ProjectFormValues {
  const today = toDateInputValue(new Date());
  if (!project) {
    return {
      name: "",
      description: "",
      owner: "Mac",
      status: "ACTIVE",
      progress: 0,
      budget: "",
      sprint: "Sprint 14",
      startDate: today,
      dueDate: "",
    };
  }

  const dueDate =
    project.dueDate || parseDueDate(project.due, new Date().getFullYear());
  return {
    name: project.name,
    description: project.description,
    owner: project.owner,
    status: project.status,
    progress: project.progress,
    budget: project.budget > 0 ? String(project.budget) : "",
    sprint: project.sprint || "Sprint 14",
    startDate: project.startDate || shiftDate(dueDate, -14),
    dueDate,
  };
}

export function createProjectFromForm(
  values: ProjectFormValues,
  existing?: Project,
): Project {
  const name = values.name.trim();
  const owner =
    projectOwners.find((item) => item.value === values.owner) ??
    projectOwners[0];
  return {
    id: existing?.id ?? `${slugify(name)}-${Date.now()}`,
    initials: existing?.initials ?? getAvatarFallback(name),
    name,
    description: values.description.trim(),
    owner: owner.value,
    ownerInitials: owner.initials,
    status: values.status,
    progress: values.progress,
    budget: values.budget ? Number(values.budget) : 0,
    sprint: values.sprint,
    startDate: values.startDate || undefined,
    dueDate: values.dueDate,
    due: formatDueDate(values.dueDate),
  };
}

function parseDueDate(label: string, year: number) {
  const parsed = new Date(`${label} ${year}`);
  return Number.isNaN(parsed.getTime()) ? "" : toDateInputValue(parsed);
}

function shiftDate(value: string, days: number) {
  if (!value) return toDateInputValue(new Date());
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + days);
  return toDateInputValue(date);
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDueDate(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(new Date(year, month - 1, day));
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "project"
  );
}
