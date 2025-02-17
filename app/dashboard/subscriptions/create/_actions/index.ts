"use server";

import { prisma } from "@/db/prisma";
import { createSlug } from "@/lib/utils";
import {
  CreateFormSchema,
  createFormSchema,
} from "@/app/dashboard/subscriptions/create/_schema";

export const createSubscriptionAction = async (data: CreateFormSchema) => {
  const validation = createFormSchema.safeParse(data);

  if (validation.error) {
    throw new Error(validation.error.message);
  }

  const slug = createSlug(data.name);
  
  const schoolClass = await prisma.schoolClass.findUnique({
    where: { slug },
  });

  if (schoolClass) {
    throw new Error("Този абонамент вече е добавен.");
  }

  const createdSubscription = await prisma.subscription.create({
    data: {
      name: data.name,
      description: data.description,
      originalPrice: data.originalPrice || 0,
      status: data.status,
    },
  });

  return { createdSubscription };
};