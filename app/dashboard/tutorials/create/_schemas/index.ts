import * as z from "zod";

import { TutorialStatus } from "@prisma/client";

export const createFormSchema = z.object({
  name: z.string().min(1, { message: "Това поле е задължително." }),
  status: z.nativeEnum(TutorialStatus),
  schoolClassId: z.string().min(1, { message: "Това поле е задължително." }),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>;
