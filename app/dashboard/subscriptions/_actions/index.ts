"use server";

import { prisma } from "@/db/prisma";

export const deleteSubscriptionAction = async (id: string) => {
  const subscription = await prisma.subscription.findUnique({
    where: { id },
  });

  if (!subscription) {
    throw new Error("Този абонамент не съществува в платформата.");
  }

  const deletedSubscription = await prisma.subscription.delete({
    where: { id },
  });

  return { deletedSubscription };
};

export const deleteMultipleSubscriptionsAction = async (ids: string[]) => {
  const deletedSubscriptions = await prisma.subscription.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return { deletedSubscriptions };
};
