"use server";

import { prisma } from "@/db/prisma";
import { FormSchema } from "@/app/dashboard/tasks/[id]/_schemas/save-task-info";
import { createSlug } from "@/lib/utils";
import { TaskStatus } from "@prisma/client";
import { SaveTaskVariantSchema } from "../[id]/_schemas/save-task-variant";

export async function createOrUpdateTask(
  id: string | undefined,
  values: FormSchema
) {
  const slug = createSlug(values.name);

  if (!id) {
    const createdTask = await prisma.schoolTask.create({
      data: {
        name: values.name,
        slug: slug,
        status: "DRAFT",
        schoolTutorialId: values.schoolTutorialId,
        schoolClassId: values.schoolClassId,
      },
    });

    return { createdTask, message: "Задачата е създадена успешно." };
  }

  const task = await prisma.schoolTask.findFirst({
    where: { slug: slug, schoolTutorialId: values.schoolTutorialId },
  });

  if (task && task.id !== id) {
    return { error: "Задачата вече съществува." };
  }

  const updatedTask = await prisma.schoolTask.update({
    where: { id: id },
    data: {
      name: values.name,
      slug: slug,
      schoolClassId: values.schoolClassId,
      schoolTutorialId: values.schoolTutorialId,
    },
  });

  return { updatedTask, message: "Задачата е обновена успешно." };
}

export async function deleteTask(ids: string[]) {
  const task = await prisma.schoolTask.deleteMany({
    where: { id: { in: ids } },
  });

  if (!task) {
    return { error: "Задачата не е намерена." };
  }

  return {
    message: ids.length === 1 ? "Задачата е изтрита." : "Задачите са изтрити.",
  };
}

export async function updateTaskStatus(ids: string[], status: TaskStatus) {
  await prisma.schoolTask.updateMany({
    where: { id: { in: ids } },
    data: { status: status },
  });

  return {
    message: `Статусът на ${
      ids.length === 1 ? "задачата" : "задачите"
    } е обновен успешно.`,
  };
}

export async function createOrUpdateTaskVariant(taskId: string, values: SaveTaskVariantSchema) {
  const task = await prisma.schoolTask.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return { error: "Задачата не е намерена." };
  }

  const options = values.options.map(option => ({
    option: option.text,
    isCorrect: option.isCorrect,
  }));

  const schoolTaskVariant = await prisma.schoolTaskVariant.create({
    data: {
      question: values.question,
      status: values.status,
      explanation: values.explanation,
      solution: values.solution,
      schoolTaskId: taskId,

      options: {
        createMany: { data: options },
      }
    },
  });

  return { schoolTaskVariant, message: "Задачата е добавена." }
}
