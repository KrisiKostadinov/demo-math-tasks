"use server";

import { prisma } from "@/db/prisma";

export const deleteTutorialAction = async (id: string) => {
  const subscription = await prisma.schoolTutorial.findUnique({
    where: { id },
  });

  if (!subscription) {
    throw new Error("Този урок не съществува в платформата.");
  }

  const deletedTutorial = await prisma.schoolTutorial.delete({
    where: { id },
  });

  return { deletedTutorial };
};

export const deleteMultipleTutorialsAction = async (ids: string[]) => {
  const deletedTutorials = await prisma.schoolTutorial.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return { deletedTutorials };
};

export const getTutorials = async (schoolClassId: string | null, includeSchoolClass: boolean) => {
  const tutorials = await prisma.schoolTutorial.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      schoolClassId: schoolClassId ?? undefined,
    },
    include: {
      schoolClass: includeSchoolClass,
    },
  });
  
  return tutorials;
};
