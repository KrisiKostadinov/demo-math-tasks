"use server";

import { prisma } from "@/db/prisma";
import { createSlug } from "@/lib/utils";
import {
  CreateFormSchema,
  createFormSchema,
} from "@/app/dashboard/classes/[id]/_schemas";

export const updateSchoolClass = async (data: CreateFormSchema, id: string | null) => {
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
      throw new Error("Този клас вече е добавен.");
    }
  
    const createdSchoolClass = await prisma.schoolClass.create({
      data: {
        name: data.name,
        description: data.description,
        slug: slug,
        status: "DRAFT",
      },
    });

    return { createdSchoolClass };
  }

  let schoolClass = await prisma.schoolClass.findUnique({
    where: { id },
  });

  if (!schoolClass) {
    throw new Error("Невалиден идентификатор на клас.");
  }

  schoolClass = await prisma.schoolClass.findFirst({
    where: { slug },
  });

  if (schoolClass && schoolClass.id !== id) {
    throw new Error("Това име вече е заето от друг клас.");
  }

  schoolClass = await prisma.schoolClass.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
    }
  });
  
  return { schoolClass };
};
