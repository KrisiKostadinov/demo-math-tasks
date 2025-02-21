import { Metadata } from "next";

import { prisma } from "@/db/prisma";
import PageHeader from "@/app/dashboard/tasks/[id]/_components/page-header";
import UpdatedTaskName from "@/app/dashboard/tasks/[id]/_components/update-task-name";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Управление на задачи",
};

type CreateTaskProps = {
  params: Promise<{ id: string }>;
};

export default async function CreateOrUpdateTask({ params }: CreateTaskProps) {
  const awaitedParams = await params;
  const isCreate = awaitedParams.id === "create";

  const task = !isCreate
    ? await prisma.schoolTask.findUnique({
        where: { id: awaitedParams.id },
        include: { schoolClass: true, schoolTutorial: true, variants: true },
      })
    : null;

  const schoolClasses = await prisma.schoolClass.findMany();
  const schoolTutorials = await prisma.schoolTutorial.findMany({
    where: { schoolClassId: task?.schoolClassId },
  });

  return (
    <div className="p-5 space-y-5">
      <PageHeader isCreate={isCreate} />
      <Separator />
      <UpdatedTaskName
        task={task}
        schoolClasses={schoolClasses}
        schoolTutorials={schoolTutorials}
      />
    </div>
  );
}
