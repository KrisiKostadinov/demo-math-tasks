import { Metadata } from "next";

import { getAllClassesAction } from "@/app/dashboard/classes/_actions";
import SaveForm from "@/app/dashboard/tutorials/[id]/_components/save-form";
import { Separator } from "@/components/ui/separator";
import { getTutorialAction } from "@/app/dashboard/tutorials/_actions";

export const metadata: Metadata = {
  title: "Управление на уроци",
};

type CreateTutorialProps = {
  params: Promise<{ id: string }>;
};

export default async function CreateTutorial({ params }: CreateTutorialProps) {
  const awaitedParams = await params;
  const isCreate = awaitedParams.id === "create";

  let tutorial = null;

  if (!isCreate) {
    tutorial = await getTutorialAction(awaitedParams.id);
  }

  const schoolClasses = await getAllClassesAction();

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-semibold">
        {isCreate ? "Създаване на нов урок" : "Промяна на урок"}
      </h1>
      {isCreate && (
        <div className="text-lg text-muted-foreground html-content">
          <p>На тази страница можете да създавате уроци в платформата.</p>
          <p>При създаване на нов урок можете да въведете следните данни:</p>
          <ul>
            <li>Име на урока</li>
            <li>
              Статус на урока (дали да бъде видим в потребителската част на
              сайта)
            </li>
            <li>Клас на урока</li>
          </ul>
          <p>
            След създаването урокът може да се редактира по всяко време. Ако е{" "}
            <strong>активен</strong>, той ще бъде видим в посочения клас в
            потребителската част на платформата.
          </p>
        </div>
      )}
      <Separator />
      <SaveForm tutorial={tutorial} schoolClasses={schoolClasses} />
    </div>
  );
}