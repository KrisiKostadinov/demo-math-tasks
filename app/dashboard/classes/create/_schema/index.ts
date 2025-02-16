import * as z from "zod";

export const createFormSchema = z.object({
  name: z.string().min(1, { message: "Това поле е задължително." }),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>;