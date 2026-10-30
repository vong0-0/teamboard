import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { toast } from "~/components/ui/toast";
import { mockProjects } from "./project-data";
import { ProjectTableRow } from "./project-table-row";
import { ProjectsBulkActions } from "./projects-bulk-actions";
import { useProjectsTable } from "~/hooks/use-projects-table";

export function ProjectsTable() {
  const table = useProjectsTable();

  function handleArchive(projectIds: string[] = table.selectedIds) {
    const archived = mockProjects.filter((project) => projectIds.includes(project.id));
    if (archived.length === 0) return;

    toast.add({
      title: "Project archived",
      description:
        archived.length === 1
          ? `${archived[0].name} moved to the archive.`
          : `${archived.length} projects moved to the archive.`,
      type: "archive",
      timeout: 5000,
      actionProps: {
        children: "UNDO",
        onClick: () => table.setSelectedIds((current) => [...new Set([...current, ...projectIds])]),
      },
    });
    table.removeSelectedIds(projectIds);
  }

  function handleDelete(projectIds: string[] = table.selectedIds) {
    const deleted = mockProjects.filter((project) => projectIds.includes(project.id));
    if (deleted.length === 0) return;

    toast.add({
      title: "Projects deleted",
      description: `${deleted.length} ${deleted.length === 1 ? "project" : "projects"} deleted.`,
      type: "delete",
      timeout: 5000,
      actionProps: {
        children: "UNDO",
        onClick: () => table.setSelectedIds((current) => [...new Set([...current, ...projectIds])]),
      },
    });
    table.removeSelectedIds(projectIds);
  }

  function handleBulkAction(action: "assign" | "export") {
    const count = table.selectedIds.length;
    if (!count) return;

    toast.add({
      title: action === "assign" ? "Projects assigned" : "Export complete",
      description:
        action === "assign"
          ? `${count} ${count === 1 ? "project" : "projects"} assigned to someone.`
          : `${count} ${count === 1 ? "project" : "projects"} exported.`,
      type: action,
      timeout: 5000,
      actionProps: { children: action === "assign" ? "UNDO" : "EXPORT" },
    });

    if (action === "export") table.clearSelection();
  }

  function handleDuplicate(projectId: string) {
    const project = mockProjects.find((item) => item.id === projectId);
    if (!project) return;

    toast.add({
      title: "Project duplicated",
      description: `${project.name} was duplicated.`,
      type: "duplicate",
      timeout: 5000,
      actionProps: { children: "UNDO" },
    });
  }

  return (
    <>
      <ProjectsBulkActions
        selectedCount={table.selectedIds.length}
        onAssign={() => handleBulkAction("assign")}
        onArchive={() => handleArchive()}
        onExport={() => handleBulkAction("export")}
        onDelete={() => handleDelete()}
        onClear={table.clearSelection}
      />

      <section className="window mt-3 min-w-0" aria-label="Projects table">
        <div className="window-bar relative justify-center">
          <span className="absolute left-2.5 flex gap-1.5" aria-hidden="true">
            <i className="border-ink size-1.5 rounded-full border" />
            <i className="border-ink size-1.5 rounded-full border" />
          </span>
          <span>projects.db</span>
        </div>

        <Table className="min-w-[850px] border-collapse">
          <TableHeader>
            <TableRow className="border-ink bg-gray-200 hover:bg-gray-200">
              <TableHead className="w-9 px-2">
                <input
                  type="checkbox"
                  aria-label="Select all projects"
                  checked={table.allPageSelected}
                  onChange={table.togglePageSelection}
                  className="accent-ink size-3.5"
                />
              </TableHead>
              <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">
                Project <span className="text-accent">↑</span>
              </TableHead>
              <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">Owner</TableHead>
              <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">Status</TableHead>
              <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">Progress</TableHead>
              <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">
                Budget <span className="text-accent">↕</span>
              </TableHead>
              <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">
                Due <span className="text-accent">•</span>
              </TableHead>
              <TableHead className="w-10 px-2" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.pageProjects.map((project) => (
              <ProjectTableRow
                key={project.id}
                project={project}
                selected={table.selectedIds.includes(project.id)}
                onToggleSelected={() => table.toggleProject(project.id)}
                onDuplicate={() => handleDuplicate(project.id)}
                onArchive={() => handleArchive([project.id])}
                onDelete={() => handleDelete([project.id])}
              />
            ))}
          </TableBody>
        </Table>

        <div className="border-ink flex items-center justify-between gap-3 border-t bg-gray-100 px-3 py-1.5 font-mono text-[8px]">
          <div className="flex items-center gap-2">
            <label htmlFor="projects-page-size" className="uppercase">Rows per page</label>
            <input
              id="projects-page-size"
              type="number"
              min={1}
              value={table.pageSize}
              onChange={(event) => table.changePageSize(Number(event.target.value))}
              className="border-ink bg-paper w-10 rounded-sm border px-1 py-0.5 text-center"
            />
            <span>
              {table.pageProjects.length ? (table.currentPage - 1) * table.pageSize + 1 : 0}–{(table.currentPage - 1) * table.pageSize + table.pageProjects.length} of {table.filteredProjects.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-xs"
              aria-label="Previous page"
              disabled={table.currentPage <= 1}
              onClick={() => table.setPage((current) => Math.max(1, current - 1))}
              className="border-ink bg-paper size-5 rounded-sm border"
            >‹</Button>
            <span className="bg-ink text-paper rounded-sm px-2 py-1">
              {table.currentPage} / {table.totalPages}
            </span>
            <Button
              variant="outline"
              size="icon-xs"
              aria-label="Next page"
              disabled={table.currentPage >= table.totalPages}
              onClick={() => table.setPage((current) => Math.min(table.totalPages, current + 1))}
              className="border-ink bg-paper size-5 rounded-sm border"
            >›</Button>
          </div>
        </div>
      </section>
    </>
  );
}
