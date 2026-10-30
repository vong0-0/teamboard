import { ArrowDown, Check, ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { mockProjects } from "~/mock-data/projects";

type BoardProjectSelectorProps = {
  selectedProjectId: string;
  onProjectSelect: (projectId: string) => void;
  variant?: "compact" | "empty-state";
};

export function BoardProjectSelector({
  selectedProjectId,
  onProjectSelect,
  variant = "compact",
}: BoardProjectSelectorProps) {
  const selectedProject = mockProjects.find(
    (project) => project.id === selectedProjectId,
  );
  const isEmptyState = variant === "empty-state";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant={isEmptyState ? "default" : "outline"}
            aria-label={selectedProject ? selectedProject.name : "Select a project"}
            className={
              isEmptyState
                ? "border-ink bg-ink text-paper shadow-hard-sm button-press-sm h-9 min-h-9 rounded-sm border-2 px-4 text-sm font-medium"
                : `border-ink text-ink shadow-hard-sm button-press-sm h-[30px] min-h-[30px] w-[181px] justify-between rounded-sm border-2 px-2 py-0 font-mono text-[10px] font-bold ${selectedProject ? "bg-paper" : "border-dashed bg-warn"}`
            }
          >
            {isEmptyState ? (
              <>
                Choose a project
                <ArrowDown aria-hidden="true" className="size-4" />
              </>
            ) : (
              <>
                <span className="min-w-0 flex-1 truncate text-left">
                  {selectedProject
                    ? `${selectedProject.name} - Sprint 14`
                    : "Select a project"}
                </span>
                {selectedProject ? (
                  <ChevronDown aria-hidden="true" className="size-3" />
                ) : (
                  <ArrowDown aria-hidden="true" className="size-3" />
                )}
              </>
            )}
          </Button>
        }
      />
      <DropdownMenuContent
        align="start"
        className="border-ink bg-paper text-ink max-h-80 w-64 rounded-sm border-2 shadow-hard-sm"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-mono text-[10px] font-bold tracking-wide text-gray-500 uppercase">
            Select project
          </DropdownMenuLabel>
          {mockProjects.map((project) => (
            <DropdownMenuItem
              key={project.id}
              onClick={() => onProjectSelect(project.id)}
            >
              <span className="truncate">{project.name}</span>
              {project.id === selectedProjectId ? (
                <Check aria-hidden="true" className="ml-auto" />
              ) : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
