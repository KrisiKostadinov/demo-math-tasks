import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { prisma } from "@/db/prisma";
import { Button } from "@/components/ui/button";
import { columns } from "@/app/dashboard/tasks/_components/columns";
import { DataTable } from "@/app/dashboard/tasks/_components/data-table";

export const metadata: Metadata = {
  title: "Задачи",
};

type SubscriptionsProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Subscriptions({ searchParams }: SubscriptionsProps) {
  const awaitedParams = await searchParams;
  const classId = awaitedParams.class;
  const tutorialId = awaitedParams.tutorial;

  const tasks = await prisma.schoolTask.findMany({
    where: {
      schoolClassId: classId,
      schoolTutorialId: tutorialId,
    },
    orderBy: { createdAt: "desc" },
    include: {
      schoolClass: true,
      schoolTutorial: true,
    },
  });  

  return (
    <>
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold p-5">Задачи</h1>
        <Button asChild>
          <Link href={"/dashboard/tasks/create"}>
            <PlusIcon />
            <span>Добавяне</span>
          </Link>
        </Button>
      </section>
      <section className="px-5">
        <Suspense>
          <DataTable columns={columns} data={tasks} />
        </Suspense>
      </section>
    </>
  );
}
