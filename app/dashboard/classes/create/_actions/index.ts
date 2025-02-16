"use server";

import { prisma } from "@/db/prisma";
import { createSlug } from "@/lib/utils";
import {
  CreateFormSchema,
  createFormSchema,
} from "@/app/dashboard/classes/create/_schema";

export const createSchoolClassAction = async (data: CreateFormSchema) => {
  const validation = createFormSchema.safeParse(data);

  if (validation.error) {
    throw new Error(validation.error.message);
  }

  const slug = createSlug(data.name);
  
  const schoolClass = await prisma.schoolClass.findUnique({
    where: { slug },
  });

  if (schoolClass) {
    throw new Error("Този клас вече е добавен.");
  }

  const createdSchoolClass = await prisma.schoolClass.create({
    data: {
      name: data.name,
      slug: slug,
      status: "DRAFT",
    },
  });

  return { createdSchoolClass };
};
