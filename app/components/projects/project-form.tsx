import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Dialog } from "@base-ui/react/dialog";
import { AlertTriangle, X } from "lucide-react";
import { FormField } from "~/components/shared/form-field";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Slider } from "~/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Project } from "./project-types";
import {
  mockProjectOwners,
  mockProjectSprints,
} from "~/mock-data/projects";
import {
  projectFormSchema,
  type ProjectFormValues,
} from "./project-form-schema";
import { getProjectFormValues } from "./project-form-utils";

type ProjectFormProps = {
  open: boolean;
  project: Project | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProjectFormValues) => void;
  onDelete?: (project: Project) => void;
};

export function ProjectForm({
  open,
  project,
  onOpenChange,
  onSubmit,
  onDelete,
}: ProjectFormProps) {
  const editing = project !== null;
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: "onSubmit",
    defaultValues: getProjectFormValues(project),
  });
  const { errors } = form.formState;
  const errorCount = Object.keys(errors).length;

  useEffect(() => {
    if (open) form.reset(getProjectFormValues(project));
  }, [form, open, project]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-ink/45 fixed inset-0 z-50 backdrop-blur-[2px] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="window shadow-hard-lg fixed top-1/2 left-1/2 z-50 flex max-h-[min(90dvh,760px)] w-[min(calc(100vw-2rem),640px)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-sm outline-none data-[ending-style]:scale-95 data-[starting-style]:scale-95">
          <div className="window-bar relative justify-center">
            <span className="absolute left-2.5 flex gap-1.5" aria-hidden="true">
              <i className="border-ink size-1.5 rounded-full border" />
              <i className="border-ink size-1.5 rounded-full border" />
            </span>
            <span>{editing ? "edit-project.form" : "new-project.form"}</span>
            <button
              type="button"
              aria-label="Close project form"
              onClick={() => onOpenChange(false)}
              className="absolute right-2 inline-flex size-5 items-center justify-center rounded-sm hover:bg-gray-100"
            >
              <X className="size-3" />
            </button>
          </div>

          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 sm:space-y-4 sm:p-5">
              <div>
                <Dialog.Title className="font-display text-2xl leading-none font-bold">
                  {editing ? "Edit project" : "New project"}
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-[11px] text-gray-500">
                  {editing
                    ? `${project.name} · Update project details.`
                    : "Fill in the details. You can change them later."}
                </Dialog.Description>
              </div>

              {errorCount > 0 ? (
                <div
                  role="alert"
                  className="border-ink bg-accent/10 flex items-center gap-2 rounded-sm border px-3 py-2 text-[11px] font-medium"
                >
                  <AlertTriangle className="text-accent size-4 shrink-0" />
                  <span>
                    Please fix {errorCount}{" "}
                    {errorCount === 1 ? "error" : "errors"} before saving.
                  </span>
                </div>
              ) : null}

              <FormField
                label="Project name"
                htmlFor="project-name"
                required
                count={form.watch("name").length}
                max={60}
                error={errors.name?.message}
              >
                <Input
                  id="project-name"
                  placeholder="e.g. Retro Kit"
                  maxLength={60}
                  aria-invalid={Boolean(errors.name)}
                  className="border-ink bg-paper focus-visible:border-ink h-9 rounded-sm border-2 px-2.5 text-xs shadow-none focus-visible:ring-0"
                  {...form.register("name")}
                />
              </FormField>

              <FormField
                label="Description"
                htmlFor="project-description"
                count={form.watch("description").length}
                max={280}
                error={errors.description?.message}
              >
                <Textarea
                  id="project-description"
                  placeholder="What is this project about?"
                  maxLength={280}
                  rows={3}
                  aria-invalid={Boolean(errors.description)}
                  className="border-ink bg-paper focus-visible:border-ink min-h-14 resize-y rounded-sm border-2 px-2.5 py-2 text-xs shadow-none focus-visible:ring-0"
                  {...form.register("description")}
                />
              </FormField>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <FormField
                  label="Owner"
                  htmlFor="project-owner"
                  required
                  error={errors.owner?.message}
                >
                  <Controller
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="project-owner"
                          aria-invalid={Boolean(errors.owner)}
                          className="border-ink bg-paper focus-visible:border-ink h-9 w-full rounded-sm border-2 px-2 text-xs shadow-none focus-visible:ring-0"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="window shadow-hard-sm rounded-sm p-1">
                          {mockProjectOwners.map((owner) => (
                            <SelectItem
                              key={owner.value}
                              value={owner.value}
                              className="focus:bg-ink focus:text-paper data-highlighted:bg-ink data-highlighted:text-paper rounded-sm px-2 py-1.5 text-xs"
                            >
                              <Avatar className="border-ink size-5 border">
                                <AvatarFallback className="font-mono text-[7px]">
                                  {owner.initials}
                                </AvatarFallback>
                              </Avatar>
                              {owner.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormField>

                <FormField
                  label="Status"
                  htmlFor="project-status"
                  error={errors.status?.message}
                >
                  <Controller
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="project-status"
                          aria-invalid={Boolean(errors.status)}
                          className="border-ink bg-paper focus-visible:border-ink h-9 w-full rounded-sm border-2 px-2 text-xs shadow-none focus-visible:ring-0"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="window shadow-hard-sm rounded-sm p-1">
                          <SelectItem
                            value="ACTIVE"
                            className="focus:bg-ink focus:text-paper data-highlighted:bg-ink data-highlighted:text-paper rounded-sm text-xs"
                          >
                            Active
                          </SelectItem>
                          <SelectItem
                            value="ON HOLD"
                            className="focus:bg-ink focus:text-paper data-highlighted:bg-ink data-highlighted:text-paper rounded-sm text-xs"
                          >
                            On hold
                          </SelectItem>
                          <SelectItem
                            value="DONE"
                            className="focus:bg-ink focus:text-paper data-highlighted:bg-ink data-highlighted:text-paper rounded-sm text-xs"
                          >
                            Done
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormField>
              </div>

              <FormField label="Progress" htmlFor="project-progress">
                <Controller
                  control={form.control}
                  name="progress"
                  render={({ field }) => (
                    <div className="flex items-center gap-3">
                      <Slider
                        aria-label="Project progress"
                        name={field.name}
                        min={0}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) =>
                          field.onChange(
                            Array.isArray(value) ? (value[0] ?? 0) : value,
                          )
                        }
                        className="flex-1"
                      />
                      <span className="w-9 text-right font-mono text-xs font-bold tabular-nums">
                        {field.value}%
                      </span>
                    </div>
                  )}
                />
              </FormField>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <FormField
                  label="Budget"
                  htmlFor="project-budget"
                  error={errors.budget?.message}
                >
                  <div
                    className={`border-ink bg-paper flex h-9 items-center rounded-sm border-2 px-2 text-xs ${errors.budget ? "border-accent" : ""}`}
                  >
                    <span className="mr-2 font-mono text-gray-500">$</span>
                    <Input
                      id="project-budget"
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                      aria-invalid={Boolean(errors.budget)}
                      className="h-full border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
                      {...form.register("budget")}
                    />
                  </div>
                  <p className="font-mono text-[9px] text-gray-500">
                    Optional · USD
                  </p>
                </FormField>

                <FormField
                  label="Sprint"
                  htmlFor="project-sprint"
                  error={errors.sprint?.message}
                >
                  <Controller
                    control={form.control}
                    name="sprint"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="project-sprint"
                          aria-invalid={Boolean(errors.sprint)}
                          className="border-ink bg-paper focus-visible:border-ink h-9 w-full rounded-sm border-2 px-2 text-xs shadow-none focus-visible:ring-0"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="window shadow-hard-sm rounded-sm p-1">
                          {mockProjectSprints.map((sprint) => (
                            <SelectItem
                              key={sprint}
                              value={sprint}
                              className="focus:bg-ink focus:text-paper data-highlighted:bg-ink data-highlighted:text-paper rounded-sm text-xs"
                            >
                              {sprint}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <FormField
                  label="Start date"
                  htmlFor="project-start-date"
                  error={errors.startDate?.message}
                >
                  <Input
                    id="project-start-date"
                    type="date"
                    aria-invalid={Boolean(errors.startDate)}
                    className="border-ink bg-paper focus-visible:border-ink h-9 rounded-sm border-2 px-2 text-xs shadow-none focus-visible:ring-0"
                    {...form.register("startDate")}
                  />
                </FormField>
                <FormField
                  label="Due date"
                  htmlFor="project-due-date"
                  required
                  error={errors.dueDate?.message}
                >
                  <Input
                    id="project-due-date"
                    type="date"
                    aria-invalid={Boolean(errors.dueDate)}
                    className="border-ink bg-paper focus-visible:border-ink h-9 rounded-sm border-2 px-2 text-xs shadow-none focus-visible:ring-0"
                    {...form.register("dueDate")}
                  />
                </FormField>
              </div>
            </div>

            <footer className="border-ink flex flex-wrap items-center justify-between gap-2 border-t-2 bg-gray-100 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-2">
                {editing && onDelete ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onDelete(project)}
                    className="border-ink bg-accent text-paper hover:bg-accent/90 hover:text-paper h-8 rounded-sm border-2 px-2.5 text-[11px]"
                  >
                    Delete project
                  </Button>
                ) : null}
                {editing && form.formState.isDirty ? (
                  <span className="border-ink bg-warn rounded-sm border px-1.5 py-1 font-mono text-[8px] font-bold uppercase">
                    Unsaved changes
                  </span>
                ) : null}
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-ink bg-paper h-8 rounded-sm border-2 px-3 text-[11px]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="border-ink bg-ink text-paper h-8 rounded-sm border-2 px-3 text-[11px] hover:bg-gray-700"
                >
                  {editing ? "Save changes" : "Create project"}
                </Button>
              </div>
            </footer>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
