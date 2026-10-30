import { CalendarDays, MessageSquare, Paperclip } from "lucide-react";
import {
  mockBoardAssignees,
  mockBoardColumns,
  mockBoardLabels,
} from "~/mock-data/board";
import type { Task } from "~/type";

type BoardListProps = {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
};

const priorityClasses = {
  low: "bg-ok",
  med: "bg-warn",
  high: "bg-accent",
} as const;

export function BoardList({ tasks, onTaskSelect }: BoardListProps) {
  const columnsById = new Map(
    mockBoardColumns.map((column) => [column.id, column] as const),
  );
  const orderedTasks = [...tasks].sort((left, right) => {
    const columnOrder =
      (columnsById.get(left.columnId)?.order ?? 0) -
      (columnsById.get(right.columnId)?.order ?? 0);
    return columnOrder || left.order - right.order;
  });

  return (
    <section
      aria-label="Project tasks list"
      className="border-ink min-w-0 overflow-hidden rounded-sm border-2 bg-paper"
    >
      <header className="border-ink flex items-center justify-between gap-3 border-b-2 bg-gray-100 px-3 py-2.5">
        <h2 className="label text-[10px]">Tasks</h2>
        <span className="border-ink rounded-sm border bg-paper px-2 py-1 font-mono text-[9px] font-bold">
          {orderedTasks.length} {orderedTasks.length === 1 ? "TASK" : "TASKS"}
        </span>
      </header>

      {orderedTasks.length > 0 ? (
        <ul className="divide-y-2 divide-ink">
          {orderedTasks.map((task) => {
            const column = columnsById.get(task.columnId);
            const assignees = mockBoardAssignees.filter((assignee) =>
              task.assigneeIds.includes(assignee.id),
            );
            const isDone = column?.isDone ?? false;

            return (
              <li key={task.id} className="min-w-0">
                <button
                  type="button"
                  aria-label={`Open task ${task.key}: ${task.title}`}
                  onClick={() => onTaskSelect(task)}
                  className="group flex w-full min-w-0 flex-col gap-3 p-3 text-left transition-colors hover:bg-gray-100 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-5"
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="flex min-w-0 flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[9px] font-bold text-gray-500">
                        {task.key}
                      </span>
                      {task.labelIds.map((labelId) => {
                        const label =
                          mockBoardLabels[
                            labelId as keyof typeof mockBoardLabels
                          ];

                        return label ? (
                          <span
                            key={labelId}
                            className={`border-ink rounded-sm border px-1.5 py-0.5 font-mono text-[8px] leading-none font-bold ${label.tone === "feature" ? "bg-ok" : "bg-gray-100"}`}
                          >
                            {label.name}
                          </span>
                        ) : null;
                      })}
                    </span>
                    <span
                      className={`truncate text-sm font-bold group-hover:underline ${isDone ? "text-gray-500 line-through" : "text-ink"}`}
                    >
                      {task.title}
                    </span>
                    {task.description ? (
                      <span className="line-clamp-1 text-xs text-gray-500">
                        {task.description}
                      </span>
                    ) : null}
                  </span>

                  <span className="flex flex-wrap items-center gap-2 sm:shrink-0">
                    <span className="border-ink rounded-sm border bg-gray-100 px-2 py-1 font-mono text-[9px] font-bold uppercase">
                      {column?.label ?? "Unknown"}
                    </span>
                    <span
                      className={`border-ink rounded-sm border px-2 py-1 font-mono text-[9px] font-bold uppercase ${priorityClasses[task.priority]}`}
                    >
                      {task.priority}
                    </span>

                    <span className="flex items-center gap-1">
                      {assignees.length > 0 ? (
                        assignees.map((assignee) => (
                          <span
                            key={assignee.id}
                            className="border-ink bg-paper flex size-6 items-center justify-center rounded-full border font-mono text-[8px] font-bold"
                            aria-label={assignee.initials}
                          >
                            {assignee.initials}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">Unassigned</span>
                      )}
                    </span>

                    {task.dueDate ? (
                      <span className="flex items-center gap-1 whitespace-nowrap font-mono text-[9px] font-bold text-gray-500">
                        <CalendarDays
                          aria-hidden="true"
                          className="size-3.5"
                        />
                        {formatDueDate(task.dueDate)}
                      </span>
                    ) : null}

                    <span className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <MessageSquare
                          aria-hidden="true"
                          className="size-3"
                        />
                        {task.commentCount}
                      </span>
                      {task.attachmentCount > 0 ? (
                        <span className="flex items-center gap-1">
                          <Paperclip
                            aria-hidden="true"
                            className="size-3"
                          />
                          {task.attachmentCount}
                        </span>
                      ) : null}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="px-4 py-12 text-center text-sm text-gray-500">
          No tasks in this project yet.
        </p>
      )}
    </section>
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
