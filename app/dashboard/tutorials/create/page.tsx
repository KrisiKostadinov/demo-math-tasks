import { getAllClassesAction } from "@/app/dashboard/classes/_actions";
import CreateForm from "@/app/dashboard/tutorials/create/_components/create-form";
import { Separator } from "@/components/ui/separator";

export default async function CreateTutorial() {
  const schoolClasses = await getAllClassesAction();

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-semibold">Създаване на нов урок</h1>
      <div className="text-lg text-muted-foreground html-content">
        <p>На тази страница можете да създавате уроци в платформата.</p>
        <p>При създаване на нов урок можете да въведете следните данни:</p>
        <ul>
          <li>Име на урока</li>
          <li>
            Статус на урока (дали да бъде видим в потребителската част на сайта)
          </li>
          <li>Клас на урока</li>
        </ul>
        <p>
          След създаването урокът може да се редактира по всяко време. Ако е{" "}
          <strong>активен</strong>, той ще бъде видим в посочения клас в
          потребителската част на платформата.
        </p>
      </div>
      <Separator />
      <CreateForm schoolClasses={schoolClasses} />
    </div>
  );
}
