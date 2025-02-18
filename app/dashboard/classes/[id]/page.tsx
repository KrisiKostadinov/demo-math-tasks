import { Metadata } from "next";

import SaveForm from "@/app/dashboard/classes/[id]/_components/save-form";
import { Separator } from "@/components/ui/separator";
import { getClassAction } from "@/app/dashboard/classes/_actions";

export const metadata: Metadata = {
  title: "Управление на класове",
};

type SaveClassProps = {
  params: Promise<{ id: string }>;
};

export default async function SaveClass({ params }: SaveClassProps) {
  const awaitedParams = await params;
  const isCreate = awaitedParams.id === "create";
  let schoolClass = null;

  if (!isCreate) {
    schoolClass = await getClassAction(awaitedParams.id);
  }

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-semibold">
        {isCreate ? "Добавяне на нов клас" : "Промяна на клас"}
      </h1>
      {isCreate && (
        <p className="text-lg text-muted-foreground">
          От тази страница можете да добавите нов учебен клас в платформата,
          който след създаването си ще бъде видим в списъка с класове в раздела
          за потребители. Това позволява лесно управление и организиране на
          класовете, като всеки нов клас ще може да бъде асоцииран със задачи и
          да използва функционалностите на платформата за решаване на задачи по
          математика.
        </p>
      )}
      <Separator />
      <SaveForm schoolClass={schoolClass} />
    </div>
  );
}
