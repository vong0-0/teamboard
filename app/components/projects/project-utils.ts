import type { Project } from "./project-types";

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
