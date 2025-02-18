"use server";

import { prisma } from "@/db/prisma";
import { SchoolClassStatus } from "@prisma/client";

export const deleteSchoolClassAction = async (id: string) => {
  const schoolClass = await prisma.schoolClass.findUnique({
    where: { id },
  });

  if (!schoolClass) {
    throw new Error("Този клас не съществува в платформата.");
  }

  const deleteSchoolClass = await prisma.schoolClass.delete({
    where: { id },
  });

  return { deleteSchoolClass };
};

export const deleteMultipleSchoolClassesAction = async (ids: string[]) => {
  const deleteSchoolClass = await prisma.schoolClass.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return { deleteSchoolClass };
};

export const getAllClassesAction = async () => {
  const schoolClasses = await prisma.schoolClass.findMany();
  return schoolClasses;
};

export const getClassAction = async (id: string) => {
  const schoolClass = await prisma.schoolClass.findUnique({
    where: { id },
  });
  return schoolClass;
};

export const updateSchoolClassStatusAction = async (
  status: SchoolClassStatus,
  ids: string[],
) => {
  const updatedSchoolClass = await prisma.schoolClass.updateMany({
    where: {
      id: {
        in: ids,
      }
    },
    data: {
      status,
    },
  });

  return { updatedSchoolClass };
};