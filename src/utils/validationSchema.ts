import { API } from "@editorjs/editorjs";
import { z } from "zod";

// Validate blocks where the "text" field cannot be empty
export const TextEditorBlockSchema = z.object({
  type: z.string(),
  data: z.object({
    text: z.string().min(1, "Text cannot be empty"), 
  }),
});

// Validate the editor schema
export const TextEditorSchema = z.object({
  time: z.number(),
  blocks: z.array(TextEditorBlockSchema).min(1, "Editor must have at least one block"),
  version: z.string(),
});

// Validation function
export const validateEditorContent = (content:API) => {
  try {
    TextEditorSchema.parse(content);
    console.log("Editor content is valid:", content);
  } catch (error:any) {
    console.error("Validation failed:", error.errors);
  }
};

export const formSchema = z.object({
  task: z.string().min(1, "Task is required"),
  description: TextEditorSchema.optional(),
  // blocks: z.array(TextEditorBlockSchema).min(1, "Editor must have at least one block"),
  deadline: z.string().min(1, "Deadline must be in the future"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isUpdated: z.boolean().optional(),
});
// extract the inferred type
export type User = z.infer<typeof formSchema>;
