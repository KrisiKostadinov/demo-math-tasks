import Image from "next/image";

import CreateForm from "@/app/dashboard/classes/create/_components/create-form";
import { Separator } from "@/components/ui/separator";

export default function CreateClass() {
  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-semibold">Добавяне на нов клас</h1>
      <Image
        src={"/images/school.png"}
        alt="Добавяне на нов клас"
        width={600}
        height={400}
        priority
      />
      <p className="text-lg text-muted-foreground">
        От тази страница можете да добавите нов учебен клас в платформата, който
        след създаването си ще бъде видим в списъка с класове в раздела за
        потребители. Това позволява лесно управление и организиране на
        класовете, като всеки нов клас ще може да бъде асоцииран със задачи и да
        използва функционалностите на платформата за решаване на задачи по
        математика.
      </p>
      <Separator />
      <CreateForm />
    </div>
  );
}
