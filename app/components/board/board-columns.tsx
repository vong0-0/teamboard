import { useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { MoreHorizontal, Plus } from "lucide-react";
import { BoardTaskCard } from "~/components/board/board-task-card";
import { mockBoardColumns } from "~/mock-data/board";
import type {
  BoardColumn as BoardColumnData,
  BoardTasksByColumn,
  Task,
} from "~/type";

export type { BoardTasksByColumn } from "~/type";

type BoardColumnsProps = {
  tasksByColumn: BoardTasksByColumn;
  onTasksChange: Dispatch<SetStateAction<BoardTasksByColumn>>;
  onTaskSelect: (task: Task) => void;
  onTaskCreate: (columnId: number) => void;
};

export function BoardColumns({
  tasksByColumn,
  onTasksChange,
  onTaskSelect,
  onTaskCreate,
}: BoardColumnsProps) {
  const previousTasksByColumn = useRef(tasksByColumn);
  const columns = [...mockBoardColumns].sort(
    (left, right) => left.order - right.order,
  );

  return (
    <DragDropProvider
      onDragStart={() => {
        previousTasksByColumn.current = tasksByColumn;
      }}
      onDragOver={(event) => {
        if (event.operation.source?.type !== "task") return;

        onTasksChange((current) => {
          const moved = move(current, event);
          if (moved === current) return current;

          return Object.fromEntries(
            Object.entries(moved).map(([columnId, tasks]) => [
              columnId,
              tasks.map((task, order) => ({
                ...task,
                columnId: Number(columnId),
                order,
              })),
            ]),
          );
        });
      }}
      onDragEnd={(event) => {
        if (event.canceled) {
          onTasksChange(previousTasksByColumn.current);
        }
      }}
    >
      <section
        aria-label="Project board columns"
        className="board-scrollbar flex min-w-0 gap-4 overflow-x-auto pb-6"
      >
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={tasksByColumn[String(column.id)] ?? []}
            onTaskSelect={onTaskSelect}
            onTaskCreate={onTaskCreate}
          />
        ))}
      </section>
    </DragDropProvider>
  );
}

function BoardColumn({
  column,
  tasks,
  onTaskSelect,
  onTaskCreate,
}: {
  column: BoardColumnData;
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  onTaskCreate: (columnId: number) => void;
}) {
  const { ref, isDropTarget } = useDroppable({
    id: String(column.id),
    type: "column",
    accept: "task",
    collisionPriority: CollisionPriority.Low,
  });
  const orderedTasks = [...tasks].sort(
    (left, right) => left.order - right.order,
  );

  return (
    <section className="border-ink flex min-h-72 w-72 min-w-72 flex-col gap-2 border-2 bg-gray-100 p-2">
      <header className="flex items-center gap-1.5 px-0.5">
        <h2 className="font-mono text-[10px] font-bold uppercase">
          {column.label}
        </h2>
        <span className="border-ink bg-paper rounded-sm border px-1.5 py-0.5 font-mono text-[9px] leading-none font-bold">
          {orderedTasks.length}
        </span>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            aria-label={`Add task to ${column.label}`}
            onClick={() => onTaskCreate(column.id)}
            className="border-ink bg-paper text-ink flex size-5 items-center justify-center rounded-sm border"
          >
            <Plus aria-hidden="true" className="size-3" />
          </button>
          <button
            type="button"
            aria-label={`More options for ${column.label}`}
            className="border-ink bg-paper text-ink flex size-5 items-center justify-center rounded-sm border"
          >
            <MoreHorizontal aria-hidden="true" className="size-3" />
          </button>
        </div>
      </header>

      <div
        ref={ref}
        className={`flex min-h-10 flex-1 flex-col gap-2 rounded-sm transition-colors ${isDropTarget ? "bg-gray-200" : ""}`}
      >
        {orderedTasks.map((task, index) => (
          <BoardTaskCard
            key={task.id}
            task={task}
            column={column}
            index={index}
            onSelect={onTaskSelect}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label={`Add card to ${column.label}`}
        onClick={() => onTaskCreate(column.id)}
        className="border-ink hover:bg-paper mt-auto flex min-h-6 items-center justify-center gap-1 rounded-sm border border-dashed px-2 font-mono text-[9px] text-gray-500"
      >
        <Plus aria-hidden="true" className="size-3" />
        Add card
      </button>
    </section>
  );
}
