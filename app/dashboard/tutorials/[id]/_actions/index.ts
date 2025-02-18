"use server";

import { prisma } from "@/db/prisma";
import { createSlug } from "@/lib/utils";
import {
  CreateFormSchema,
  createFormSchema,
} from "@/app/dashboard/tutorials/[id]/_schemas";

export const updateSchoolTutorial = async (data: CreateFormSchema, id: string | null) => {
  const validation = createFormSchema.safeParse(data);

  if (validation.error) {
    throw new Error(validation.error.message);
  }

  const slug = createSlug(data.name);

  if (!id) {
    const schoolTutorial = await prisma.schoolTutorial.findFirst({
      where: { slug },
    });
  
    if (schoolTutorial) {
      throw new Error("Този урок вече е добавен.");
    }
  
    const createdSchoolTutorial = await prisma.schoolClass.create({
      data: {
        name: data.name,
        slug: slug,
        status: "DRAFT",
      },
    });

    return { createdSchoolTutorial };
  }

  let schoolTutorial = await prisma.schoolTutorial.findUnique({
    where: { id },
  });

  if (!schoolTutorial) {
    throw new Error("Невалиден идентификатор на урок.");
  }

  schoolTutorial = await prisma.schoolTutorial.findFirst({
    where: { slug },
  });

  if (schoolTutorial && schoolTutorial.id !== id) {
    throw new Error("Това име вече е заето от друг урок.");
  }

  schoolTutorial = await prisma.schoolTutorial.update({
    where: { id },
    data: {
      name: data.name,
      schoolClassId: data.schoolClassId,
      status: data.status,
    }
  });
  
  return { schoolTutorial };
};
