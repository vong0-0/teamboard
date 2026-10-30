import * as z from "zod";

export const taskFormSchema = z.object({
  title: z.string().trim().min(1, "Task title is required.").max(120),
  description: z.string().max(1000),
  projectId: z.string().min(1, "Choose a project."),
  columnId: z.number(),
  priority: z.enum(["low", "med", "high"]),
  dueDate: z.string(),
  assigneeIds: z.array(z.number()),
  labelIds: z.array(z.number()),
  subtasks: z.array(
    z.object({
      id: z.number(),
      title: z.string().trim().min(1),
      done: z.boolean(),
      order: z.number(),
    }),
  ),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
