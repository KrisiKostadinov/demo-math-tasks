import * as z from "zod";

export const registerFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Въведете валиден имейл адрес." }),
  password: z.string().min(6, { message: "Паролата трябва да бъде по-малко или на 6 синвола." }),
    cpassword: z.string({ message: "Това поле е задължително." }),
  }).superRefine((data, ctx) => {
    if (data.password !== data.cpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Паролите не съвпадат.",
        path: ["cpassword"]
      });
    }
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
