import { z } from "zod";

export const updateTaskNameSchema = z.object({
  name: z.string().min(1, { message: "Името на задачата е задължително." }),
});

export type UpdateTaskNameSchema = z.infer<typeof updateTaskNameSchema>;