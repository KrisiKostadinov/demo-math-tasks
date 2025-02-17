"use server";

import bcrypt from "bcryptjs";

import {
  registerFormSchema,
  RegisterFormSchema,
} from "@/app/users/sign-up/_schemas";
import { prisma } from "@/db/prisma";

export const registerAction = async (values: RegisterFormSchema) => {
  const validation = registerFormSchema.safeParse(values);

  if (validation.error) {
    throw new Error(validation.error.message);
  }

  const user = await prisma.user.findUnique({
    where: { email: values.email },
  });

  if (user) {
    throw new Error("Този потребител вече съществува.");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(values.password, salt);

  const numberOfUsers = await prisma.user.count();

  const createdUser = await prisma.user.create({
    data: {
      email: values.email,
      password: passwordHash,
      role: numberOfUsers === 0 ? "ADMIN" : "USER",
    },
  });

  return { createdUser };
};