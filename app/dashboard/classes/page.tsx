import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import SchoolClassesList from "@/app/dashboard/classes/_components/school-classes-list";

export const metadata: Metadata = {
  title: "Класове",
};

export default function Classes() {
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
        <SchoolClassesList />
      </section>
    </>
  );
}
