"use server";

import { prisma } from "@/db/prisma";
import { createSlug } from "@/lib/utils";
import {
  CreateFormSchema,
  createFormSchema,
} from "@/app/dashboard/subscriptions/[id]/_schemas";

export const updateSubscription = async (data: CreateFormSchema, id: string | null) => {
  const validation = createFormSchema.safeParse(data);

  if (validation.error) {
    throw new Error(validation.error.message);
  }

  const slug = createSlug(data.name);
  
  if (!id) {
    const schoolClass = await prisma.schoolClass.findFirst({
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
  }

  let subscription = await prisma.subscription.findUnique({
    where: { id },
  });

  if (!subscription) {
    throw new Error("Невалиден идентификатор на абонамент.");
  }

  subscription = await prisma.subscription.findFirst({
    where: { id },
  });

  if (subscription && subscription.id !== id) {
    throw new Error("Това име вече е заето от друг абонамент.");
  }

  subscription = await prisma.subscription.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      originalPrice: data.originalPrice,
      status: data.status,
    }
  });
  
  return { subscription };
};