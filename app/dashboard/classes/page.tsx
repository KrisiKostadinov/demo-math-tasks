import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { prisma } from "@/db/prisma";
import { Button } from "@/components/ui/button";
import { columns } from "@/app/dashboard/classes/_components/columns";
import { DataTable } from "@/app/dashboard/classes/_components/data-table";

export const metadata: Metadata = {
  title: "Класове",
};

export default async function Classes() {
  const classes = await prisma.schoolClass.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold p-5">Класове</h1>
        <Button asChild>
          <Link href={"/dashboard/classes/create"}>
            <PlusIcon />
            <span>Добавяне</span>
          </Link>
        </Button>
      </section>
      <section className="px-5">
        <DataTable columns={columns} data={classes} />
      </section>
    </>
  );
}
