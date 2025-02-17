"use server";

import { prisma } from "@/db/prisma";
import { createSlug } from "@/lib/utils";
import {
  CreateFormSchema,
  createFormSchema,
} from "@/app/dashboard/tutorials/create/_schemas";

export const createTutorialAction = async (data: CreateFormSchema) => {
  const validation = createFormSchema.safeParse(data);

  if (validation.error) {
    throw new Error(validation.error.message);
  }

  const slug = createSlug(data.name);
  
  const schoolClass = await prisma.schoolTutorial.findFirst({
    where: { slug, schoolClassId: data.schoolClassId },
  });

  if (schoolClass) {
    throw new Error("Този урок вече е добавен в класа.");
  }

  const createdTutorial = await prisma.schoolTutorial.create({
    data: {
      name: data.name,
      slug: slug,
      status: data.status,
      schoolClassId: data.schoolClassId,
    },
  });

  return { createdTutorial };
};