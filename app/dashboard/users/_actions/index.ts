"use server";

import { prisma } from "@/db/prisma";
import { addDays } from "date-fns";

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
};

export const addUserToSubscription = async (
  userId: string,
  subscriptionId: string
) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionId: subscriptionId,
      subscriptionPeriodStart: new Date(),
      subscriptionPeriodEnd: addDays(new Date(), 30),
    },
  });
};

export const deleteUserFromSubscription = async (
  userId: string,
) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionId: null,
      subscriptionPeriodStart: null,
      subscriptionPeriodEnd: null,
    },
  });
};