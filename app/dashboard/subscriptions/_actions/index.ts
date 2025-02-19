"use server";

import { prisma } from "@/db/prisma";
import { SubscriptionStatus } from "@prisma/client";

export const deleteSubscriptionsAction = async (ids: string[]) => {
  const deleteSchoolClass = await prisma.schoolClass.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return { deleteSchoolClass };
};

export const getSubscriptions = async (status: SubscriptionStatus | null) => {
  const subscriptions = await prisma.subscription.findMany({
    where: { status: status || undefined },
  });
  
  return subscriptions;
}

export const getSubscription = async (id: string) => {
  const subscription = await prisma.subscription.findUnique({
    where: { id },
  });

  return subscription;
}

export const updateSubscriptionStatusAction = async (
  status: SubscriptionStatus,
  ids: string[],
) => {
  const updatedSubscription = await prisma.subscription.updateMany({
    where: {
      id: {
        in: ids,
      }
    },
    data: {
      status,
    },
  });

  return { updatedSubscription };
};