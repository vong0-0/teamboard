import { Avatar, AvatarFallback, AvatarGroup } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { PageHeader } from "~/components/shared/page-header";
import { BoardProjectSelector } from "~/components/board/project-selector";
import {
  BoardViewTabs,
  type BoardView,
} from "~/components/board/board-view-tabs";
import { mockOnlineBoardMembers } from "~/mock-data/board";

type BoardHeaderProps = {
  selectedProjectId: string;
  onProjectSelect: (projectId: string) => void;
  view: BoardView;
  onViewChange: (view: BoardView) => void;
};

export function BoardHeader({
  selectedProjectId,
  onProjectSelect,
  view,
  onViewChange,
}: BoardHeaderProps) {
  const hasSelectedProject = Boolean(selectedProjectId);

  return (
    <>
      <PageHeader
        eyebrow={
          <BoardProjectSelector
            selectedProjectId={selectedProjectId}
            onProjectSelect={onProjectSelect}
          />
        }
        title="Board"
        actions={
          <div className="flex w-full items-center justify-between gap-3 sm:justify-end sm:gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <AvatarGroup className="-space-x-1.5">
                {mockOnlineBoardMembers.map((member) => (
                  <Avatar
                    key={member}
                    className="border-ink bg-paper size-7 border ring-0"
                  >
                    <AvatarFallback className="bg-paper text-ink font-mono text-[9px] font-bold">
                      {member}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <span className="border-ink bg-ok text-ink rounded-sm border px-1.5 py-1 font-mono text-[8px] leading-none font-bold whitespace-nowrap">
                {mockOnlineBoardMembers.length} ONLINE
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={!hasSelectedProject}
                className="border-ink bg-paper text-ink shadow-hard-sm button-press-sm rounded-sm border-2 px-4 py-2 text-xs disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-100 disabled:shadow-none sm:px-5 sm:text-sm"
              >
                Share
              </Button>
              <Button
                type="button"
                disabled={!hasSelectedProject}
                className="border-ink bg-ink text-paper shadow-hard-sm button-press-sm hover:text-ink rounded-sm border-2 px-4 py-2 text-xs hover:bg-gray-200 disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-100 disabled:shadow-none sm:px-5 sm:text-sm"
              >
                + New task
              </Button>
            </div>
          </div>
        }
      />
      {hasSelectedProject ? (
        <div className="mt-8">
          <BoardViewTabs value={view} onValueChange={onViewChange} />
        </div>
      ) : null}
    </>
  );
}
