import { useMemo, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useSearchParams } from "react-router";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Track } from "~/components/shared/track";
import { ProjectStatusBadge, type ProjectStatus } from "~/components/shared/project-status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { toast } from "~/components/ui/toast";

type Project = {
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

const projects: Project[] = [
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

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function ProjectsTable() {
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const search = (searchParams.get("search") ?? "").toLowerCase();
  const status = searchParams.get("status");
  const filtered = useMemo(() => projects.filter((project) => {
    const matchesSearch = `${project.name} ${project.description} ${project.owner}`.toLowerCase().includes(search);
    const matchesStatus = !status || status === "all" || project.status.toLowerCase().replace(" ", "-") === status;
    return matchesSearch && matchesStatus;
  }), [search, status]);
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const allSelected = pageRows.length > 0 && pageRows.every((project) => selected.includes(project.id));

  function toggleAll() {
    setSelected(allSelected ? selected.filter((id) => !pageRows.some((project) => project.id === id)) : [...new Set([...selected, ...pageRows.map((project) => project.id)])]);
  }

  function handleArchive() {
    const archivedProjects = projects.filter((project) => selected.includes(project.id));
    if (archivedProjects.length === 0) return;

    const description = archivedProjects.length === 1
      ? `${archivedProjects[0].name} moved to the archive.`
      : `${archivedProjects.length} projects moved to the archive.`;
    const previousSelection = selected;

    toast.add({
      title: "Project archived",
      description,
      type: "archive",
      timeout: 5000,
      actionProps: {
        children: "UNDO",
        onClick: () => setSelected(previousSelection),
      },
    });
    setSelected([]);
  }

  function handleBulkAction(action: "assign" | "export" | "delete") {
    const selectedCount = selected.length;
    if (selectedCount === 0) return;

    const messages = {
      assign: {
        title: "Projects assigned",
        description: `${selectedCount} ${selectedCount === 1 ? "project" : "projects"} assigned to someone.`,
      },
      export: {
        title: "Export complete",
        description: `${selectedCount} ${selectedCount === 1 ? "project" : "projects"} exported.`,
      },
      delete: {
        title: "Projects deleted",
        description: `${selectedCount} ${selectedCount === 1 ? "project" : "projects"} deleted.`,
      },
    };

    toast.add({
      ...messages[action],
      type: action,
      timeout: 5000,
      actionProps: {
        children: action === "export" ? "EXPORT" : "UNDO",
      },
    });

    if (action !== "assign") setSelected([]);
  }

  return (
    <>
    {selected.length > 0 ? (
      <div className="border-ink mt-4 flex min-h-10 flex-wrap items-center justify-between gap-2 border-2 bg-ink px-2.5 py-1.5 text-paper shadow-hard-sm">
        <span className="font-mono text-[10px] font-bold">{selected.length} selected</span>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="xs" onClick={() => handleBulkAction("assign")} className="border-paper bg-ink text-paper h-6 rounded-sm border px-2 font-mono text-[9px] hover:bg-paper hover:text-ink">Assign</Button>
          <Button variant="outline" size="xs" onClick={handleArchive} className="border-paper bg-ink text-paper h-6 rounded-sm border px-2 font-mono text-[9px] hover:bg-paper hover:text-ink">Archive</Button>
          <Button variant="outline" size="xs" onClick={() => handleBulkAction("export")} className="border-paper bg-ink text-paper h-6 rounded-sm border px-2 font-mono text-[9px] hover:bg-paper hover:text-ink">Export</Button>
          <Button variant="outline" size="xs" onClick={() => handleBulkAction("delete")} className="border-ink bg-accent text-paper h-6 rounded-sm border px-2 font-mono text-[9px] hover:bg-accent/90 hover:text-paper">
            Delete
          </Button>
          <button type="button" onClick={() => setSelected([])} className="text-paper px-1 font-mono text-[9px] hover:underline">
            Clear ×
          </button>
        </div>
      </div>
    ) : null}
    <section className="window mt-3 min-w-0" aria-label="Projects table">
      <div className="window-bar relative justify-center">
        <span className="absolute left-2.5 flex gap-1.5" aria-hidden="true"><i className="border-ink size-1.5 rounded-full border" /><i className="border-ink size-1.5 rounded-full border" /></span>
        <span>projects.db</span>
      </div>
      <Table className="min-w-[850px] border-collapse">
        <TableHeader>
          <TableRow className="border-ink bg-gray-200 hover:bg-gray-200">
            <TableHead className="w-9 px-2"><input type="checkbox" aria-label="Select all projects" checked={allSelected} onChange={toggleAll} className="accent-ink size-3.5" /></TableHead>
            <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">Project <span className="text-accent">↑</span></TableHead>
            <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">Owner</TableHead>
            <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">Status</TableHead>
            <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">Progress</TableHead>
            <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">Budget <span className="text-accent">↕</span></TableHead>
            <TableHead className="px-2 font-mono text-[8px] font-bold uppercase">Due <span className="text-accent">•</span></TableHead>
            <TableHead className="w-10 px-2" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageRows.map((project) => (
            <TableRow key={project.id} className="border-ink border-b bg-paper hover:bg-gray-100">
              <TableCell className="px-2 py-2"><input type="checkbox" aria-label={`Select ${project.name}`} checked={selected.includes(project.id)} onChange={() => setSelected((current) => current.includes(project.id) ? current.filter((id) => id !== project.id) : [...current, project.id])} className="accent-ink size-3.5" /></TableCell>
              <TableCell className="px-2 py-2">
                <div className="flex items-center gap-2">
                  <Avatar className="border-ink size-6 rounded-sm border"><AvatarFallback className="rounded-sm font-mono text-[8px] font-bold">{project.initials}</AvatarFallback></Avatar>
                  <div><p className="text-[10px] leading-tight font-bold">{project.name}</p><p className="text-[8px] leading-tight text-gray-500">{project.description}</p></div>
                </div>
              </TableCell>
              <TableCell className="px-2 py-2"><div className="flex items-center gap-1.5"><Avatar className="border-ink size-5 border"><AvatarFallback className="font-mono text-[7px]">{project.ownerInitials}</AvatarFallback></Avatar><span className="text-[9px]">{project.owner}</span></div></TableCell>
              <TableCell className="px-2 py-2"><ProjectStatusBadge status={project.status} /></TableCell>
              <TableCell className="px-2 py-2"><div className="flex min-w-24 items-center gap-1.5"><Track value={project.progress} className="h-2 flex-1" /><span className="font-mono text-[8px]">{project.progress}%</span></div></TableCell>
              <TableCell className="px-2 py-2 font-mono text-[9px] font-bold">{money.format(project.budget)}</TableCell>
              <TableCell className="px-2 py-2 font-mono text-[8px]">{project.due}</TableCell>
              <TableCell className="px-2 py-2"><DropdownMenu><DropdownMenuTrigger render={<Button variant="outline" size="icon-xs" aria-label={`Actions for ${project.name}`} className="border-ink bg-paper size-6 rounded-sm border" />}><MoreHorizontal className="size-3.5" /></DropdownMenuTrigger><DropdownMenuContent align="end" className="window min-w-28 rounded-sm p-1 shadow-hard-sm"><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem>Duplicate</DropdownMenuItem><DropdownMenuItem>Archive</DropdownMenuItem><DropdownMenuItem className="text-accent">Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-ink flex items-center justify-between gap-3 border-t bg-gray-100 px-3 py-1.5 font-mono text-[8px]">
        <div className="flex items-center gap-2"><label htmlFor="projects-page-size" className="uppercase">Rows per page</label><input id="projects-page-size" type="number" min={1} value={pageSize} onChange={(event) => { setPageSize(Math.max(1, Number(event.target.value) || 1)); setPage(1); }} className="border-ink w-10 rounded-sm border bg-paper px-1 py-0.5 text-center" /><span>1–{pageRows.length} of {filtered.length}</span></div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-xs" aria-label="Previous page" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="border-ink size-5 rounded-sm border bg-paper">‹</Button>
          <span className="bg-ink text-paper rounded-sm px-2 py-1">{page} / {totalPages}</span>
          <Button variant="outline" size="icon-xs" aria-label="Next page" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="border-ink size-5 rounded-sm border bg-paper">›</Button>
        </div>
      </div>
    </section>
    </>
  );
}
