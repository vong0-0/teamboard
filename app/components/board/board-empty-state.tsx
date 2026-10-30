import { BoardProjectSelector } from "~/components/board/project-selector";
import { Link } from "react-router";

type BoardEmptyStateProps = {
  selectedProjectId: string;
  onProjectSelect: (projectId: string) => void;
};

export function BoardEmptyState({
  selectedProjectId,
  onProjectSelect,
}: BoardEmptyStateProps) {
  return (
    <section className="window mx-auto w-full max-w-xl">
      <div className="window-bar relative h-6 justify-center py-0 text-[9px]">
        <div aria-hidden="true" className="absolute left-2.5 flex gap-1.5">
          <span className="size-2 rounded-full border border-ink bg-gray-100" />
          <span className="size-2 rounded-full border border-ink bg-gray-100" />
        </div>
        <span>no-project.board</span>
      </div>
      <div className="flex min-h-70 flex-col items-center justify-center bg-paper px-4 py-8 text-center">
        <div className="border-ink bg-gray-100 text-ink shadow-hard-sm mb-4 flex size-16 items-center justify-center rounded-full border-2 border-dashed">
          <span aria-hidden="true" className="font-display text-4xl font-bold">
            ?
          </span>
        </div>
        <h2 className="font-display text-2xl leading-tight font-bold">
          Pick a project to see its board
        </h2>
        <p className="mt-3 text-xs text-gray-500 sm:text-sm">
          Tasks only appear after you choose a project and a sprint.
        </p>
        <div className="mt-5">
          <BoardProjectSelector
            selectedProjectId={selectedProjectId}
            onProjectSelect={onProjectSelect}
            variant="empty-state"
          />
        </div>
        <Link
          to="/projects"
          className="text-ink mt-3 font-mono text-[10px] font-bold underline decoration-1 underline-offset-2"
        >
          + CREATE A NEW PROJECT
        </Link>
      </div>
    </section>
  );
}
