import * as z from "zod";

export const projectFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Project name is required.")
      .max(60, "Project name must be 60 characters or fewer."),
    description: z
      .string()
      .max(280, "Description must be 280 characters or fewer."),
    owner: z.string().min(1, "Choose an owner."),
    status: z.enum(["ACTIVE", "ON HOLD", "DONE"]),
    progress: z.number().min(0).max(100),
    budget: z
      .string()
      .refine(
        (value) =>
          value === "" || (Number.isFinite(Number(value)) && Number(value) > 0),
        "Budget must be greater than 0.",
      ),
    sprint: z.string().min(1, "Choose a sprint."),
    startDate: z.string(),
    dueDate: z.string().min(1, "Due date is required."),
  })
  .superRefine((values, context) => {
    if (
      values.startDate &&
      values.dueDate &&
      values.dueDate <= values.startDate
    ) {
      context.addIssue({
        code: "custom",
        path: ["dueDate"],
        message: "Due date must be after the start date.",
      });
    }
  });

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
