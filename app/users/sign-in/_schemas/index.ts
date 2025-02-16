import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Въведете валиден имейл адрес." }),
  password: z
    .string()
    .min(6, { message: "Паролата трябва да бъде по-малко или на 6 синвола." }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;