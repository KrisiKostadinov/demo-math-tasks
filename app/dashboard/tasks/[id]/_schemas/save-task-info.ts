import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string({ message: "Името на задачата е задължително." })
    .min(1, { message: "Името на задачата е задължително." }),
  schoolClassId: z
    .string({ message: "Името на задачата е задължително." })
    .min(1, { message: "Изберете клас." }),
  schoolTutorialId: z
    .string({ message: "Името на задачата е задължително." })
    .min(1, { message: "Изберете урок." }),
});

export type FormSchema = z.infer<typeof formSchema>;
