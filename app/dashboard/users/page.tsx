import { Metadata } from "next";
import { Suspense } from "react";

import { columns } from "@/app/dashboard/users/_components/columns";
import { DataTable } from "@/app/dashboard/users/_components/data-table";
import ChooseSubscriptionsDialog from "@/app/dashboard/users/_components/choose-subscriptions-dialog";
import { prisma } from "@/db/prisma";

export const metadata: Metadata = {
  title: "Потребители",
};

export default async function Users() {
  const [users, subscriptions] = await Promise.all([
    await prisma.user.findMany({
      include: {
        subscription: true,
      }
    }),
    await prisma.subscription.findMany(),
  ]);

  return (
    <>
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold p-5">Потребители</h1>
      </section>
      <section className="px-5">
        <Suspense>
          <DataTable columns={columns} data={users} />
        </Suspense>
      </section>
      <ChooseSubscriptionsDialog subscriptions={subscriptions} />
    </>
  );
}
