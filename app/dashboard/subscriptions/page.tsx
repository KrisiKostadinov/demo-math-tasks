import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { prisma } from "@/db/prisma";
import { Button } from "@/components/ui/button";
import { columns } from "@/app/dashboard/subscriptions/_components/columns";
import { DataTable } from "@/app/dashboard/subscriptions/_components/data-table";

export const metadata: Metadata = {
  title: "Абонаменти",
};

export default async function Subscriptions() {
  const subscriptions = await prisma.subscription.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold p-5">Абонаменти</h1>
        <Button asChild>
          <Link href={"/dashboard/subscriptions/create"}>
            <PlusIcon />
            <span>Добавяне</span>
          </Link>
        </Button>
      </section>
      <section className="px-5">
        <Suspense>
          <DataTable columns={columns} data={subscriptions} />
        </Suspense>
      </section>
    </>
  );
}
