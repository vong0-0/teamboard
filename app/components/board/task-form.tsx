import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { FormField } from "~/components/shared/form-field";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { mockBoardColumns } from "~/mock-data/board";
import { mockProjects } from "~/mock-data/projects";
import type { Task } from "~/type";
import { taskFormSchema, type TaskFormValues } from "./task-form-schema";
import { getTaskFormValues } from "./task-form-utils";
import {
  TaskAssigneeField,
  TaskLabelField,
  TaskSubtasksField,
} from "./task-form-fields";

type TaskFormProps = {
  open: boolean;
  task: Task | null;
  projectId: string;
  initialColumnId?: number;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TaskFormValues) => void | Promise<void>;
};

const priorityOptions = [
  { value: "low", label: "Low", className: "bg-ok" },
  { value: "med", label: "Medium", className: "bg-warn" },
  { value: "high", label: "High", className: "bg-accent" },
] as const;

export function TaskForm({
  open,
  task,
  projectId,
  initialColumnId,
  onOpenChange,
  onSubmit,
}: TaskFormProps) {
  const editing = task !== null;
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    mode: "onSubmit",
    defaultValues: getTaskFormValues(task, projectId, initialColumnId),
  });
  const values = form.watch();
  const selectedProject = mockProjects.find(
    (project) => project.id === values.projectId,
  );

  useEffect(() => {
    if (open) {
      form.reset(getTaskFormValues(task, projectId, initialColumnId));
    }
  }, [form, initialColumnId, open, projectId, task]);

  async function submitTask(values: TaskFormValues) {
    const action = editing ? "updated" : "created";
    const actionLabel = editing ? "update" : "create";

    try {
      await onSubmit(values);
      toast.add({
        title: editing ? "Task updated" : "Task created",
        description: `“${values.title.trim()}” has been ${action}.`,
        type: "success",
        timeout: 5000,
      });
      onOpenChange(false);
    } catch {
      toast.add({
        title: `Task ${actionLabel} failed`,
        description: `Could not ${actionLabel} “${values.title.trim()}”. Please try again.`,
        type: "failed",
        timeout: 5000,
      });
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-ink/45 fixed inset-0 z-50 backdrop-blur-[2px] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="window shadow-hard-lg fixed top-1/2 left-1/2 z-50 flex max-h-[min(92dvh,760px)] w-[min(calc(100vw-1.5rem),560px)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-sm outline-none data-[ending-style]:scale-95 data-[starting-style]:scale-95">
          <div className="window-bar relative justify-center">
            <span className="absolute left-2.5 flex gap-1.5" aria-hidden="true">
              <i className="border-ink size-1.5 rounded-full border" />
              <i className="border-ink size-1.5 rounded-full border" />
            </span>
            <span>{editing ? "edit-task.form" : "new-task.form"}</span>
            <button
              type="button"
              aria-label="Close task form"
              onClick={() => onOpenChange(false)}
              className="absolute right-2 inline-flex size-5 items-center justify-center rounded-sm hover:bg-gray-100"
            >
              <X className="size-3" />
            </button>
          </div>

          <form
            noValidate
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                (event.metaKey || event.ctrlKey) &&
                event.target instanceof HTMLElement &&
                event.target.tagName !== "TEXTAREA"
              ) {
                event.preventDefault();
                event.currentTarget.requestSubmit();
              }
            }}
            onSubmit={form.handleSubmit(submitTask)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 sm:space-y-3.5 sm:p-4">
              <div>
                <Dialog.Title className="font-display text-xl leading-none font-bold">
                  {editing ? "Edit task" : "New task"}
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-[9px] text-gray-500">
                  {selectedProject?.name ?? "Choose a project"} · Sprint 14
                </Dialog.Description>
              </div>

              <FormField
                label="Title"
                htmlFor="task-title"
                required
                count={values.title?.length ?? 0}
                max={120}
                error={form.formState.errors.title?.message}
              >
                <Input
                  id="task-title"
                  autoFocus
                  maxLength={120}
                  aria-invalid={Boolean(form.formState.errors.title)}
                  placeholder="Build table sorting + filters"
                  className="border-ink bg-paper focus-visible:border-ink h-8 rounded-sm border-2 px-2 text-[10px] shadow-none focus-visible:ring-0"
                  {...form.register("title")}
                />
              </FormField>

              <FormField
                label="Description"
                htmlFor="task-description"
                error={form.formState.errors.description?.message}
              >
                <Textarea
                  id="task-description"
                  maxLength={1000}
                  placeholder="Add more detail..."
                  className="border-ink bg-paper focus-visible:border-ink min-h-10 resize-y rounded-sm border-2 px-2 py-1.5 text-[10px] shadow-none focus-visible:ring-0"
                  {...form.register("description")}
                />
              </FormField>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <FormField label="Project" htmlFor="task-project" required>
                  <Controller
                    control={form.control}
                    name="projectId"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="task-project"
                          className="border-ink bg-paper focus-visible:border-ink h-8 w-full rounded-sm border-2 px-2 text-[10px] shadow-none focus-visible:ring-0"
                        >
                          <SelectValue placeholder="Choose project" />
                        </SelectTrigger>
                        <SelectContent className="window shadow-hard-sm rounded-sm p-1">
                          {mockProjects.map((project) => (
                            <SelectItem
                              key={project.id}
                              value={project.id}
                              className="focus:bg-ink focus:text-paper data-highlighted:bg-ink data-highlighted:text-paper rounded-sm text-xs"
                            >
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormField>

                <FormField label="Due date" htmlFor="task-due-date">
                  <Input
                    id="task-due-date"
                    type="date"
                    className="border-ink bg-paper focus-visible:border-ink h-8 rounded-sm border-2 px-2 text-[10px] shadow-none focus-visible:ring-0"
                    {...form.register("dueDate")}
                  />
                </FormField>
              </div>

              <FormField label="Status" htmlFor="task-status-backlog">
                <Controller
                  control={form.control}
                  name="columnId"
                  render={({ field }) => (
                    <div className="border-ink grid grid-cols-5 overflow-hidden rounded-sm border-2">
                      {mockBoardColumns.map((column) => {
                        const selected = field.value === column.id;
                        return (
                          <button
                            key={column.id}
                            id={
                              column.id === 101
                                ? "task-status-backlog"
                                : undefined
                            }
                            type="button"
                            aria-pressed={selected}
                            onClick={() => field.onChange(column.id)}
                            className={`border-ink min-w-0 border-r px-1 py-1.5 text-[9px] last:border-r-0 sm:text-[10px] ${selected ? "bg-ink text-paper" : "bg-paper hover:bg-gray-100"}`}
                          >
                            {column.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
              </FormField>

              <FormField label="Priority" htmlFor="task-priority-low">
                <Controller
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <div className="border-ink grid grid-cols-3 overflow-hidden rounded-sm border-2">
                      {priorityOptions.map((option) => {
                        const selected = field.value === option.value;
                        return (
                          <button
                            key={option.value}
                            id={
                              option.value === "low"
                                ? "task-priority-low"
                                : undefined
                            }
                            type="button"
                            aria-pressed={selected}
                            onClick={() => field.onChange(option.value)}
                            className={`border-ink border-r py-1.5 text-[10px] last:border-r-0 ${selected ? option.className + " font-bold" : "bg-paper hover:bg-gray-100"}`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
              </FormField>

              <TaskAssigneeField control={form.control} />
              <TaskLabelField control={form.control} />
              <TaskSubtasksField
                control={form.control}
                register={form.register}
                setValue={form.setValue}
              />
            </div>

            <footer className="border-ink flex shrink-0 items-center justify-between gap-2 border-t-2 bg-gray-100 px-3 py-2 sm:px-4">
              <span className="hidden font-mono text-[8px] text-gray-500 sm:inline">
                ⌘ + ENTER TO SAVE
              </span>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-ink bg-paper h-8 rounded-sm border-2 px-3 text-[10px]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="border-ink bg-ink text-paper h-8 rounded-sm border-2 px-3 text-[10px] hover:bg-gray-700"
                >
                  {editing ? "Save changes" : "Create task"}
                </Button>
              </div>
            </footer>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
