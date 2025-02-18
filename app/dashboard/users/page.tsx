import { Metadata } from "next";

import { columns } from "@/app/dashboard/users/_components/columns";
import { DataTable } from "@/app/dashboard/users/_components/data-table";
import { getUsers } from "@/app/dashboard/users/_actions";

export const metadata: Metadata = {
  title: "Потребители",
};

export default async function Users() {
  const users = await getUsers();

  return (
    <>
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold p-5">Потребители</h1>
      </section>
      <section className="px-5">
        <DataTable columns={columns} data={users} />
      </section>
    </>
  );
}