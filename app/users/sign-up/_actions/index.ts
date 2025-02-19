"use server";

import bcrypt from "bcryptjs";

import {
  registerFormSchema,
  RegisterFormSchema,
} from "@/app/users/sign-up/_schemas";
import { prisma } from "@/db/prisma";
import { stripe } from "@/lib/stripe";

export const registerAction = async (values: RegisterFormSchema) => {
  const validation = registerFormSchema.safeParse(values);

  if (validation.error) {
    throw new Error(validation.error.message);
  }

  const isExistingUser = await prisma.user.findUnique({
    where: { email: values.email },
  });

  if (isExistingUser) {
    throw new Error("Този потребител вече съществува.");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(values.password, salt);

  const numberOfUsers = await prisma.user.count();

  const user = await prisma.user.create({
    data: {
      email: values.email,
      password: passwordHash,
      role: numberOfUsers === 0 ? "ADMIN" : "USER",
      name: values.name,
    },
  });

  if (!user.stripeCustomerId) {
    const data = await stripe.customers.create({
      email: user.email as string,
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeCustomerId: data.id,
      }
    });
  }

  return { user };
};