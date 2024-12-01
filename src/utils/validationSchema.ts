import { z } from "zod";

export const formSchema = z.object({
  task: z.string().min(1, "Task is required").max(150,"Task is too long."),
  description: z.string().min(1, "Description is required"),
  deadline: z
    .string()
    .refine(
      (value) => new Date(value) > new Date(),
      "Deadline must be in the future"
    ),
  priority: z.enum(["low", "medium", "high"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isUpdated: z.boolean().optional(),
  status: z.enum(["todo", "inprogress", "completed","overdue"]).optional(),
});

export type form = z.infer<typeof formSchema>;
