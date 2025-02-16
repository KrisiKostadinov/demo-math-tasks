"use server";

import { prisma } from "@/db/prisma";

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

export const deleteMoltipleSchoolClassesAction = async (ids: string[]) => {
  const deleteSchoolClass = await prisma.schoolClass.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return { deleteSchoolClass };
};
