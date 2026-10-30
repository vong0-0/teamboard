import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { mockProjects } from "~/mock-data/projects";
import { filterProjects } from "~/components/projects/project-utils";
import type { Project } from "~/components/projects/project-types";

export function useProjectsTable(projects: Project[] = mockProjects) {
  const [searchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status");

  useEffect(() => {
    setPage(1);
  }, [search, status, projects.length]);

  const filteredProjects = useMemo(
    () => filterProjects(projects, search, status),
    [projects, search, status],
  );
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageProjects = filteredProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const allPageSelected =
    pageProjects.length > 0 &&
    pageProjects.every((project) => selectedIds.includes(project.id));

  function toggleProject(projectId: string) {
    setSelectedIds((current) =>
      current.includes(projectId)
        ? current.filter((id) => id !== projectId)
        : [...current, projectId],
    );
  }

  function togglePageSelection() {
    setSelectedIds((current) =>
      allPageSelected
        ? current.filter(
            (id) => !pageProjects.some((project) => project.id === id),
          )
        : [
            ...new Set([
              ...current,
              ...pageProjects.map((project) => project.id),
            ]),
          ],
    );
  }

  function clearSelection() {
    setSelectedIds([]);
  }

  function removeSelectedIds(ids: string[]) {
    setSelectedIds((current) => current.filter((id) => !ids.includes(id)));
  }

  function changePageSize(value: number) {
    setPageSize(Math.max(1, value || 1));
    setPage(1);
  }

  return {
    selectedIds,
    setSelectedIds,
    page,
    setPage,
    pageSize,
    changePageSize,
    filteredProjects,
    pageProjects,
    totalPages,
    currentPage,
    allPageSelected,
    toggleProject,
    togglePageSelection,
    clearSelection,
    removeSelectedIds,
  };
}
