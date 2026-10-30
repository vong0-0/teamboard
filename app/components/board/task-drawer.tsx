import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  UserRound,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { mockBoardColumns } from "~/mock-data/board";
import { mockProjects } from "~/mock-data/projects";
import type { Subtask, Task } from "~/type";
import { PriorityBadge } from "~/components/shared/priority-badge";
import { TaskLabelBadge } from "~/components/shared/task-label-badge";
import { formatDate, formatRelativeTime } from "~/lib/format-date";
import { TaskSubtaskList } from "~/components/board/task-subtask-list";
import {
  getBoardAssignee,
  getBoardAssignees,
  getBoardLabels,
} from "~/lib/board-utils";

type TaskDrawerProps = {
  task: Task | null;
  tasks: Task[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskSelect: (task: Task) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (taskId: number) => void;
  onSubtasksChange: (
    taskId: number,
    update: (subtasks: Subtask[]) => Subtask[],
  ) => void;
};

export function TaskDrawer({
  task,
  tasks,
  open,
  onOpenChange,
  onTaskSelect,
  onTaskEdit,
  onTaskDelete,
  onSubtasksChange,
}: TaskDrawerProps) {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const column = task
    ? mockBoardColumns.find((item) => item.id === task.columnId)
    : undefined;
  const assignees = task ? getBoardAssignees(task.assigneeIds) : [];
  const createdBy = getBoardAssignee(task?.createdById);
  const taskIndex = task ? tasks.findIndex((item) => item.id === task.id) : -1;
  const project = task
    ? (mockProjects[task.projectId - 1] ?? mockProjects[0])
    : mockProjects[0];
  const completedSubtasks =
    task?.subtasks.filter((subtask) => subtask.done).length ?? 0;
  const subtaskCount = task?.subtasks.length ?? 0;

  useEffect(() => {
    setNewSubtaskTitle("");
  }, [task?.id]);

  function handleAddSubtask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newSubtaskTitle.trim();
    if (!task || !title) return;

    onSubtasksChange(task.id, (subtasks) => [
      ...subtasks,
      {
        id: Date.now(),
        title,
        done: false,
        order: subtasks.length,
      },
    ]);
    setNewSubtaskTitle("");
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="border-ink bg-paper w-full gap-0 border-l-2 p-0 data-[side=right]:w-full sm:max-w-xl"
      >
        {task ? (
          <>
            <SheetHeader className="border-ink flex-row items-center justify-between gap-2 border-b-2 bg-gray-200 px-3 py-2 text-left sm:px-4">
              <div className="flex min-w-0 items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous task"
                  disabled={taskIndex <= 0}
                  onClick={() => {
                    const previousTask = tasks[taskIndex - 1];
                    if (previousTask) onTaskSelect(previousTask);
                  }}
                  className="border-ink bg-paper flex size-8 shrink-0 items-center justify-center rounded-sm border-2 disabled:opacity-40"
                >
                  <ChevronLeft aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next task"
                  disabled={taskIndex < 0 || taskIndex >= tasks.length - 1}
                  onClick={() => {
                    const nextTask = tasks[taskIndex + 1];
                    if (nextTask) onTaskSelect(nextTask);
                  }}
                  className="border-ink bg-paper flex size-8 shrink-0 items-center justify-center rounded-sm border-2 disabled:opacity-40"
                >
                  <ChevronRight aria-hidden="true" className="size-4" />
                </button>
                <div className="flex min-w-0 items-center gap-2 pl-1">
                  <span className="truncate font-mono text-[11px] font-bold">
                    {task.key}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-gray-500">
                    {taskIndex + 1} / {tasks.length}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Close task details"
                  onClick={() => onOpenChange(false)}
                  className="border-ink bg-paper flex size-8 items-center justify-center rounded-sm border-2"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              <div className="mb-5 flex items-start justify-between gap-3">
                <SheetTitle className="font-display text-ink min-w-0 text-2xl leading-tight font-bold sm:text-3xl">
                  {task.title}
                </SheetTitle>
                <button
                  type="button"
                  onClick={() => onTaskEdit(task)}
                  className="border-ink bg-paper shrink-0 rounded-sm border-2 px-3 py-1.5 text-xs font-medium"
                >
                  Edit
                </button>
                <SheetDescription className="sr-only">
                  Details for task {task.key}.
                </SheetDescription>
              </div>

              <dl className="border-ink overflow-hidden rounded-sm border-2">
                <DetailRow label="Status">
                  <span className="border-ink bg-warn inline-flex items-center gap-2 rounded-sm border-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase">
                    {column?.label ?? "Unknown"}
                    <ChevronRight aria-hidden="true" className="size-3" />
                  </span>
                </DetailRow>
                <DetailRow label="Assignee">
                  {assignees.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {assignees.map((assignee) => (
                        <span
                          key={assignee.id}
                          className="border-ink flex items-center gap-1.5 rounded-full border-2 bg-gray-100 py-0.5 pr-2 pl-0.5 font-mono text-[10px] font-bold"
                        >
                          <span className="border-ink bg-paper flex size-6 items-center justify-center rounded-full border text-[8px]">
                            {assignee.initials}
                          </span>
                          {assignee.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <UserRound aria-hidden="true" className="size-4" />
                      Unassigned
                    </span>
                  )}
                </DetailRow>
                <DetailRow label="Priority">
                  <PriorityBadge
                    priority={task.priority}
                    className="items-center gap-2 px-2.5 py-1 text-[10px]"
                  >
                    <ChevronRight aria-hidden="true" className="size-3" />
                  </PriorityBadge>
                </DetailRow>
                <DetailRow label="Due date">
                  <span className="border-ink inline-flex items-center gap-2 rounded-sm border-2 px-2.5 py-1 font-mono text-[10px]">
                    {task.dueDate
                      ? formatDate(task.dueDate, {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })
                      : "No due date"}
                    {task.dueDate ? (
                      <CalendarDays aria-hidden="true" className="size-3" />
                    ) : null}
                  </span>
                </DetailRow>
                <DetailRow label="Labels">
                  <div className="flex flex-wrap gap-1.5">
                    {task.labelIds.length > 0 ? (
                      getBoardLabels(task.labelIds).map(({ id, ...label }) => (
                        <TaskLabelBadge
                          key={id}
                          label={label}
                          className="border-2 px-2 py-1 text-[9px]"
                        />
                      ))
                    ) : (
                      <span className="text-xs text-gray-500">No labels</span>
                    )}
                    <span className="border-ink flex size-7 items-center justify-center rounded-full border border-dashed font-mono text-xs text-gray-500">
                      +
                    </span>
                  </div>
                </DetailRow>
                <DetailRow label="Project">
                  <span className="text-sm font-medium">
                    {project?.name ?? "Project"} ·{" "}
                    {task.sprintId ? `Sprint ${task.sprintId}` : "Backlog"}
                  </span>
                </DetailRow>
                <DetailRow label="Created" last>
                  <span className="font-mono text-[10px] text-gray-500">
                    {createdBy?.name ?? "Unknown"} ·{" "}
                    {formatDate(task.createdAt, {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </DetailRow>
              </dl>

              <section
                className="mt-5"
                aria-labelledby="task-description-heading"
              >
                <h3 id="task-description-heading" className="label">
                  Description
                </h3>
                <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap text-gray-500">
                  {task.description || "No description added."}
                </p>
              </section>

              <section className="mt-6" aria-labelledby="task-subtasks-heading">
                <div className="flex items-center justify-between gap-3">
                  <h3 id="task-subtasks-heading" className="label">
                    Subtasks
                  </h3>
                  <span className="font-mono text-[10px] font-bold">
                    {completedSubtasks} / {subtaskCount}
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-label="Subtask completion"
                  aria-valuemin={0}
                  aria-valuemax={subtaskCount}
                  aria-valuenow={completedSubtasks}
                  className="border-ink mt-2 h-2 overflow-hidden border-2 bg-gray-200"
                >
                  <div
                    className="bg-ink h-full"
                    style={{
                      width: `${subtaskCount ? (completedSubtasks / subtaskCount) * 100 : 0}%`,
                    }}
                  />
                </div>

                <TaskSubtaskList
                  task={task}
                  onSubtasksChange={onSubtasksChange}
                />

                <form onSubmit={handleAddSubtask} className="mt-2 flex gap-2">
                  <input
                    value={newSubtaskTitle}
                    onChange={(event) => setNewSubtaskTitle(event.target.value)}
                    aria-label="New subtask title"
                    placeholder="Add a subtask..."
                    className="border-ink bg-paper focus-visible:ring-ink min-w-0 flex-1 rounded-sm border-2 px-3 py-2 text-sm outline-none focus-visible:ring-2"
                  />
                  <button
                    type="submit"
                    disabled={!newSubtaskTitle.trim()}
                    className="border-ink bg-paper shadow-hard-sm rounded-sm border-2 px-3 text-xs font-medium disabled:opacity-50"
                  >
                    Add
                  </button>
                </form>
              </section>
            </div>

            <footer className="border-ink flex shrink-0 items-center justify-between gap-3 border-t-2 bg-gray-100 px-4 py-2.5 sm:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onTaskDelete(task.id)}
                  className="border-ink bg-accent shadow-hard-sm button-press-sm rounded-sm border-2 px-3 py-1.5 text-xs font-medium"
                >
                  Delete
                </button>
                <span className="font-mono text-[9px] font-bold text-gray-500">
                  SAVED {formatRelativeTime(task.updatedAt)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="border-ink bg-paper shadow-hard-sm button-press-sm rounded-sm border-2 px-4 py-1.5 text-xs font-medium"
              >
                Close
              </button>
            </footer>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function DetailRow({
  label,
  children,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`grid min-h-11 grid-cols-[92px_minmax(0,1fr)] items-center gap-3 px-3 py-2 sm:grid-cols-[108px_minmax(0,1fr)] sm:px-4 ${last ? "" : "border-ink border-b-2"}`}
    >
      <dt className="label text-[9px] text-gray-500">{label}</dt>
      <dd className="text-ink min-w-0">{children}</dd>
    </div>
  );
}
