import type { ReactNode } from "react";
import { Button } from "~/components/ui/button";

type ProjectsBulkActionsProps = {
  selectedCount: number;
  onAssign: () => void;
  onArchive: () => void;
  onExport: () => void;
  onDelete: () => void;
  onClear: () => void;
};

export function ProjectsBulkActions({
  selectedCount,
  onAssign,
  onArchive,
  onExport,
  onDelete,
  onClear,
}: ProjectsBulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="border-ink bg-ink text-paper shadow-hard-sm mt-4 flex min-h-10 flex-wrap items-center justify-between gap-2 border-2 px-2.5 py-1.5">
      <span className="font-mono text-[10px] font-bold">
        {selectedCount} selected
      </span>
      <div className="flex items-center gap-1.5">
        <ActionButton onClick={onAssign}>Assign</ActionButton>
        <ActionButton onClick={onArchive}>Archive</ActionButton>
        <ActionButton onClick={onExport}>Export</ActionButton>
        <Button
          variant="outline"
          size="xs"
          onClick={onDelete}
          className="border-ink bg-accent text-paper hover:bg-accent/90 hover:text-paper h-6 rounded-sm border px-2 font-mono text-[9px]"
        >
          Delete
        </Button>
        <button
          type="button"
          onClick={onClear}
          className="text-paper px-1 font-mono text-[9px] hover:underline"
        >
          Clear ×
        </button>
      </div>
    </div>
  );
}

function ActionButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      variant="outline"
      size="xs"
      onClick={onClick}
      className="border-paper bg-ink text-paper hover:bg-paper hover:text-ink h-6 rounded-sm border px-2 font-mono text-[9px]"
    >
      {children}
    </Button>
  );
}
