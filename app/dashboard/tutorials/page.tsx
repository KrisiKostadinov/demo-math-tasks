import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { columns } from "@/app/dashboard/tutorials/_components/columns";
import { DataTable } from "@/app/dashboard/tutorials/_components/data-table";
import { getTutorials } from "@/app/dashboard/tutorials/_actions";

export const metadata: Metadata = {
  title: "Уроци",
};

type TutorialsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Tutorials({ searchParams }: TutorialsProps) {
  const params = await searchParams;
  const schoolClassId = params.class ? params.class as string : null;
  const tutorials = await getTutorials(schoolClassId, true);
  
  return (
    <>
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold p-5">Уроци</h1>
        <Button asChild>
          <Link href={"/dashboard/tutorials/create"}>
            <PlusIcon />
            <span>Добавяне</span>
          </Link>
        </Button>
      </section>
      <section className="px-5">
        <DataTable columns={columns} data={tutorials} />
      </section>
    </>
  );
}
