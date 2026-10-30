import { useState } from "react";
import {
  Controller,
  useFieldArray,
  useWatch,
  type Control,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { X } from "lucide-react";
import { FormField } from "~/components/shared/form-field";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { mockBoardAssignees, mockBoardLabels } from "~/mock-data/board";
import type { TaskFormValues } from "~/components/board/task-form-schema";

type TaskFormFieldProps = {
  control: Control<TaskFormValues>;
};

export function TaskAssigneeField({ control }: TaskFormFieldProps) {
  return (
    <FormField label="Assignees" htmlFor="task-assignees-trigger">
      <Controller
        control={control}
        name="assigneeIds"
        render={({ field }) => (
          <div className="flex min-h-7 flex-wrap items-center gap-1.5">
            {mockBoardAssignees
              .filter((assignee) => field.value.includes(assignee.id))
              .map((assignee) => (
                <span
                  key={assignee.id}
                  className="border-ink inline-flex items-center gap-1 rounded-full border bg-gray-100 px-1.5 py-0.5 font-mono text-[8px]"
                >
                  <Avatar className="border-ink size-4 border">
                    <AvatarFallback className="font-mono text-[6px] font-bold">
                      {assignee.initials}
                    </AvatarFallback>
                  </Avatar>
                  {assignee.name}
                  <button
                    type="button"
                    aria-label={`Remove ${assignee.name}`}
                    onClick={() =>
                      field.onChange(
                        field.value.filter((id) => id !== assignee.id),
                      )
                    }
                    className="hover:text-accent ml-0.5 rounded-full"
                  >
                    <X className="size-2.5" />
                  </button>
                </span>
              ))}
            <DropdownMenu>
              <DropdownMenuTrigger
                id="task-assignees-trigger"
                className="border-ink flex h-6 items-center rounded-full border border-dashed px-2 font-mono text-[8px] text-gray-500 hover:bg-gray-100"
              >
                + Add
              </DropdownMenuTrigger>
              <DropdownMenuContent className="window shadow-hard-sm rounded-sm p-1">
                {mockBoardAssignees.map((assignee) => (
                  <DropdownMenuCheckboxItem
                    key={assignee.id}
                    checked={field.value.includes(assignee.id)}
                    onCheckedChange={(checked) =>
                      field.onChange(
                        checked
                          ? [...field.value, assignee.id]
                          : field.value.filter((id) => id !== assignee.id),
                      )
                    }
                    className="focus:bg-ink focus:text-paper rounded-sm text-xs"
                  >
                    <Avatar className="border-ink size-5 border">
                      <AvatarFallback className="font-mono text-[7px]">
                        {assignee.initials}
                      </AvatarFallback>
                    </Avatar>
                    {assignee.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      />
    </FormField>
  );
}

export function TaskLabelField({ control }: TaskFormFieldProps) {
  return (
    <FormField label="Labels" htmlFor="task-labels-trigger">
      <Controller
        control={control}
        name="labelIds"
        render={({ field }) => (
          <div className="border-ink bg-paper flex min-h-8 flex-wrap items-center gap-1 rounded-sm border-2 px-1.5 py-1">
            {field.value.map((labelId) => {
              const label =
                mockBoardLabels[labelId as keyof typeof mockBoardLabels];
              if (!label) return null;
              return (
                <span
                  key={labelId}
                  className="border-ink inline-flex items-center gap-1 rounded-full border bg-gray-100 px-2 py-0.5 font-mono text-[8px]"
                >
                  {label.name}
                  <button
                    type="button"
                    aria-label={`Remove ${label.name} label`}
                    onClick={() =>
                      field.onChange(field.value.filter((id) => id !== labelId))
                    }
                    className="hover:text-accent"
                  >
                    <X className="size-2.5" />
                  </button>
                </span>
              );
            })}
            <DropdownMenu>
              <DropdownMenuTrigger
                id="task-labels-trigger"
                className="hover:text-ink px-1 text-left text-[9px] text-gray-500"
              >
                Add label...
              </DropdownMenuTrigger>
              <DropdownMenuContent className="window shadow-hard-sm rounded-sm p-1">
                {Object.entries(mockBoardLabels).map(([id, label]) => {
                  const labelId = Number(id);
                  return (
                    <DropdownMenuCheckboxItem
                      key={id}
                      checked={field.value.includes(labelId)}
                      onCheckedChange={(checked) =>
                        field.onChange(
                          checked
                            ? [...field.value, labelId]
                            : field.value.filter(
                                (selectedId) => selectedId !== labelId,
                              ),
                        )
                      }
                      className="focus:bg-ink focus:text-paper rounded-sm text-xs"
                    >
                      {label.name}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      />
    </FormField>
  );
}

type TaskSubtasksFieldProps = TaskFormFieldProps & {
  register: UseFormRegister<TaskFormValues>;
  setValue: UseFormSetValue<TaskFormValues>;
};

export function TaskSubtasksField({
  control,
  register,
  setValue,
}: TaskSubtasksFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });
  const subtasks = useWatch({ control, name: "subtasks" }) ?? [];
  const [newSubtask, setNewSubtask] = useState("");

  function addSubtask() {
    const title = newSubtask.trim();
    if (!title) return;
    append({ id: Date.now(), title, done: false, order: fields.length });
    setNewSubtask("");
  }

  return (
    <FormField
      label="Subtasks"
      htmlFor="task-new-subtask"
      count={subtasks.filter((subtask) => subtask.done).length}
      max={subtasks.length}
    >
      <div className="space-y-1">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border-ink bg-paper flex min-h-7 items-center gap-2 rounded-sm border px-1.5 py-1"
          >
            <input
              type="checkbox"
              checked={subtasks[index]?.done ?? false}
              aria-label={`Mark ${field.title} complete`}
              onChange={(event) =>
                setValue(`subtasks.${index}.done`, event.currentTarget.checked)
              }
              className="size-3 shrink-0 accent-black"
            />
            <input
              aria-label={`Subtask ${index + 1} title`}
              className={`min-w-0 flex-1 bg-transparent text-[9px] outline-none ${subtasks[index]?.done ? "text-gray-500 line-through" : ""}`}
              {...register(`subtasks.${index}.title`)}
            />
            <button
              type="button"
              aria-label={`Remove subtask ${field.title}`}
              onClick={() => remove(index)}
              className="hover:text-accent text-gray-500"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}
        <div className="flex gap-1.5">
          <Input
            id="task-new-subtask"
            value={newSubtask}
            onChange={(event) => setNewSubtask(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addSubtask();
              }
            }}
            placeholder="Add a subtask..."
            className="border-ink bg-paper focus-visible:border-ink h-7 rounded-sm border px-2 text-[9px] shadow-none focus-visible:ring-0"
          />
          <Button
            type="button"
            variant="outline"
            onClick={addSubtask}
            disabled={!newSubtask.trim()}
            className="border-ink bg-paper h-7 rounded-sm border-2 px-2 text-[9px]"
          >
            Add
          </Button>
        </div>
      </div>
    </FormField>
  );
}
