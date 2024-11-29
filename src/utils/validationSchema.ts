import { z } from "zod";

const EditorBlockSchema = z.object({
  type: z.string(),
  data: z.object({
    paragraph: z.string(),
  }),
});

export const formSchema = z.object({
  task: z.string().min(1, "Task is required"),
  description: z.string().min(1, "Description is required"),
  deadline: z
    .string()
    .refine(
      (value) => new Date(value) > new Date(),
      "Deadline must be in the future"
    ),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isUpdated: z.boolean().optional(),
});

export type form = z.infer<typeof formSchema>;
