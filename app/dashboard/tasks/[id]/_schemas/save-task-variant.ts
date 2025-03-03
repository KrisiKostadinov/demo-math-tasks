import { z } from "zod";

export const taskOptionSchema = z.object({
  id: z.string().uuid(),
  text: z.string().min(1, { message: "Това поле не може да бъде празно." }),
  isCorrect: z.boolean(),
});

export const saveTaskVariantSchema = z.object({
  question: z.string().min(1, { message: "Въпросът е задължителен." }),
  options: z.array(taskOptionSchema).min(2, { message: "Трябва да има поне две опции." }),
  status: z.enum(["ACTIVE", "DRAFT"]),
  explanation: z.string().nullable(),
  solution: z.string().nullable(),
});

export type SaveTaskVariantSchema = z.infer<typeof saveTaskVariantSchema>;