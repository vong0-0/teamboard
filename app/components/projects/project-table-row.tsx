import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ProjectStatusBadge } from "~/components/shared/project-status-badge";
import { Track } from "~/components/shared/track";
import { formatUSD } from "~/lib/format-currency";
import {
  TableCell,
  TableRow,
} from "~/components/ui/table";
import type { Project } from "./project-data";

type ProjectTableRowProps = {
  project: Project;
  selected: boolean;
  onToggleSelected: () => void;
  onDuplicate: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

export function ProjectTableRow({
  project,
  selected,
  onToggleSelected,
  onDuplicate,
  onArchive,
  onDelete,
}: ProjectTableRowProps) {
  return (
    <TableRow className="border-ink bg-paper border-b hover:bg-gray-100">
      <TableCell className="px-2 py-2">
        <input
          type="checkbox"
          aria-label={`Select ${project.name}`}
          checked={selected}
          onChange={onToggleSelected}
          className="accent-ink size-3.5"
        />
      </TableCell>
      <TableCell className="px-2 py-2">
        <div className="flex items-center gap-2">
          <Avatar className="border-ink size-6 rounded-sm border">
            <AvatarFallback className="rounded-sm font-mono text-[8px] font-bold">
              {project.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[10px] leading-tight font-bold">{project.name}</p>
            <p className="text-[8px] leading-tight text-gray-500">
              {project.description}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-2 py-2">
        <div className="flex items-center gap-1.5">
          <Avatar className="border-ink size-5 border">
            <AvatarFallback className="font-mono text-[7px]">
              {project.ownerInitials}
            </AvatarFallback>
          </Avatar>
          <span className="text-[9px]">{project.owner}</span>
        </div>
      </TableCell>
      <TableCell className="px-2 py-2">
        <ProjectStatusBadge status={project.status} />
      </TableCell>
      <TableCell className="px-2 py-2">
        <div className="flex min-w-24 items-center gap-1.5">
          <Track value={project.progress} className="h-2 flex-1" />
          <span className="font-mono text-[8px]">{project.progress}%</span>
        </div>
      </TableCell>
      <TableCell className="px-2 py-2 font-mono text-[9px] font-bold">
        {formatUSD(project.budget)}
      </TableCell>
      <TableCell className="px-2 py-2 font-mono text-[8px]">
        {project.due}
      </TableCell>
      <TableCell className="px-2 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="icon-xs"
                aria-label={`Actions for ${project.name}`}
                className="border-ink bg-paper size-6 rounded-sm border"
              />
            }
          >
            <MoreHorizontal className="size-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="window shadow-hard-sm min-w-28 rounded-sm p-1"
          >
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={onDuplicate}>Duplicate</DropdownMenuItem>
            <DropdownMenuItem onClick={onArchive}>Archive</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-accent">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
