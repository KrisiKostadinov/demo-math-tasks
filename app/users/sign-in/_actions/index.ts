"use server";

import bcrypt from "bcryptjs";

import { loginFormSchema, LoginFormSchema } from "@/app/users/sign-in/_schemas";
import { prisma } from "@/db/prisma";

export const signInAction = async (values: LoginFormSchema) => {
  const validation = loginFormSchema.safeParse(values);

  if (validation.error) {
    throw new Error(validation.error.message);
  }

  const user = await prisma.user.findUnique({
    where: { email: values.email },
  });

  if (!user) {
    throw new Error("Имейл адресът или паролата са невалидни.");
  }

  if (!bcrypt.compareSync(values.password, user.password as string)) {
    throw new Error("Имейл адресът или паролата са невалидни.");
  }
};
