import { useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  CalendarDays,
  Check,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  mockBoardAssignees,
  mockBoardColumns,
  mockBoardLabels,
} from "~/mock-data/board";
import type { BoardColumn as BoardColumnData, Task } from "~/type";

export type BoardTasksByColumn = Record<string, Task[]>;

type BoardColumnsProps = {
  tasksByColumn: BoardTasksByColumn;
  onTasksChange: Dispatch<SetStateAction<BoardTasksByColumn>>;
  onTaskSelect: (task: Task) => void;
};

const priorityClasses = {
  low: "bg-ok",
  med: "bg-warn",
  high: "bg-accent",
} as const;

export function BoardColumns({
  tasksByColumn,
  onTasksChange,
  onTaskSelect,
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
}: {
  column: BoardColumnData;
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
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
        className="border-ink hover:bg-paper mt-auto flex min-h-6 items-center justify-center gap-1 rounded-sm border border-dashed px-2 font-mono text-[9px] text-gray-500"
      >
        <Plus aria-hidden="true" className="size-3" />
        Add card
      </button>
    </section>
  );
}

function BoardTaskCard({
  task,
  column,
  index,
  onSelect,
}: {
  task: Task;
  column: BoardColumnData;
  index: number;
  onSelect: (task: Task) => void;
}) {
  const { ref, isDragging } = useSortable({
    id: task.id,
    index,
    group: String(column.id),
    type: "task",
    accept: "task",
  });
  const isDone = column.isDone;
  const assignees = mockBoardAssignees.filter((assignee) =>
    task.assigneeIds.includes(assignee.id),
  );
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.done,
  ).length;

  return (
    <article
      ref={ref}
      className={`border-ink shadow-hard-sm cursor-grab touch-pan-y rounded-sm border-2 p-2 active:cursor-grabbing ${isDone ? "bg-gray-100" : "bg-paper"} ${isDragging ? "opacity-40" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-1">
          {task.labelIds.map((labelId) => {
            const label =
              mockBoardLabels[labelId as keyof typeof mockBoardLabels];
            return label ? (
              <span
                key={labelId}
                className={`border-ink rounded-sm border px-1.5 py-0.5 font-mono text-[8px] leading-none font-bold ${label.tone === "feature" ? "bg-ok" : "bg-gray-100"}`}
              >
                {label.name}
              </span>
            ) : null;
          })}
          {!isDone ? (
            <span
              className={`border-ink rounded-sm border px-1.5 py-0.5 font-mono text-[8px] leading-none font-bold ${priorityClasses[task.priority]}`}
            >
              {task.priority.toUpperCase()}
            </span>
          ) : null}
        </div>
        {isDone ? (
          <span className="border-ink bg-ok text-ink flex size-5 shrink-0 items-center justify-center rounded-full border-2">
            <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
          </span>
        ) : null}
      </div>

      <button
        type="button"
        aria-label={`Open task ${task.key}: ${task.title}`}
        onClick={() => onSelect(task)}
        className={`mt-1.5 block w-fit cursor-pointer text-left text-[11px] leading-snug font-bold hover:underline ${isDone ? "text-gray-500 line-through" : "text-ink"}`}
      >
        {task.title}
      </button>

      {task.subtasks.length > 0 ? (
        <p className="mt-1 font-mono text-[8px] text-gray-500">
          SUBTASKS {completedSubtasks}/{task.subtasks.length}
        </p>
      ) : null}

      <footer className="mt-2 flex items-center gap-1.5">
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          {assignees.map((assignee) => (
            <Avatar
              key={assignee.id}
              className="border-ink size-5 border"
              aria-label={assignee.initials}
            >
              <AvatarFallback className="font-mono text-[7px] font-bold">
                {assignee.initials}
              </AvatarFallback>
            </Avatar>
          ))}
          <span className="flex items-center gap-1 font-mono text-[8px] text-gray-500">
            <MessageSquare aria-hidden="true" className="size-2.5" />
            {task.commentCount}
          </span>
          {task.attachmentCount > 0 ? (
            <span className="flex items-center gap-1 font-mono text-[8px] text-gray-500">
              <Paperclip aria-hidden="true" className="size-2.5" />
              {task.attachmentCount}
            </span>
          ) : null}
        </div>

        {task.dueDate ? (
          <span className="border-ink bg-paper flex items-center gap-1 rounded-sm border px-1.5 py-1 font-mono text-[8px] leading-none font-bold">
            <CalendarDays aria-hidden="true" className="size-2.5" />
            {formatDueDate(task.dueDate)}
          </span>
        ) : null}
      </footer>
    </article>
  );
}

function formatDueDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  })
    .format(new Date(`${date}T12:00:00`))
    .toUpperCase();
}
