import * as z from "zod";

import { SubscriptionStatus } from "@prisma/client";

export const createFormSchema = z.object({
  name: z.string().min(1, { message: "Това поле е задължително." }),
  status: z.nativeEnum(SubscriptionStatus),
  originalPrice: z.coerce.number().min(0, "Това поле е задължително."),
  description: z.string(),
  durationInDays: z.coerce.number(),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>;
