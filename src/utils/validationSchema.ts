import { z } from "zod";

export const formSchema = z.object({
  task: z.string().min(1, "Task is required"),
  description: z
    .string().min(1,"Description is required"),
    // .refine((data) => data && data.blocks && data.blocks.length > 0, {
    //   message: "Content is required",
    // }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isUpdated: z.boolean().optional(),
});
// extract the inferred type
export type User = z.infer<typeof formSchema>;
