import { CalendarDays, Check, MessageSquare, Paperclip } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { PriorityBadge } from "~/components/shared/priority-badge";
import { TaskLabelBadge } from "~/components/shared/task-label-badge";
import { formatShortDate } from "~/lib/format-date";
import { getBoardAssignees, getBoardLabels } from "~/lib/board-utils";
import type { BoardColumn, Task } from "~/type";

type BoardTaskCardProps = {
  task: Task;
  column: BoardColumn;
  index: number;
  onSelect: (task: Task) => void;
};

export function BoardTaskCard({
  task,
  column,
  index,
  onSelect,
}: BoardTaskCardProps) {
  const { ref, isDragging } = useSortable({
    id: task.id,
    index,
    group: String(column.id),
    type: "task",
    accept: "task",
  });
  const isDone = column.isDone;
  const assignees = getBoardAssignees(task.assigneeIds);
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
          {getBoardLabels(task.labelIds).map(({ id, ...label }) => (
            <TaskLabelBadge key={id} label={label} className="px-1.5 py-0.5" />
          ))}
          {!isDone ? (
            <PriorityBadge
              priority={task.priority}
              className="px-1.5 py-0.5 text-[8px]"
            />
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
            {formatShortDate(task.dueDate)}
          </span>
        ) : null}
      </footer>
    </article>
  );
}
