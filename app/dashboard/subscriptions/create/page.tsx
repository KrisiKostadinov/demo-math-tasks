import CreateForm from "@/app/dashboard/subscriptions/create/_components/create-form";
import { Separator } from "@/components/ui/separator";

export default function CreateSubscription() {
  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-semibold">Управление на абонаменти</h1>
      <div className="text-lg text-muted-foreground html-content">
        <p>
          На тази страница можете да създавате и управлявате абонаменти в
          платформата.
        </p>
        <p>При създаване на абонамент можете да въведете следните данни:</p>
        <ul>
          <li>Име</li>
          <li>Стандартна цена</li>
          <li>Промоционална цена (ако е налична)</li>
          <li>Описание</li>
          <li>Статус (Активен или Неактивен)</li>
        </ul>
        <p>
          След създаването абонаментът може да бъде редактиран по всяко време.
          Ако е <strong>активен</strong>, той ще бъде видим за потребителите в
          интерфейса на платформата.
        </p>
      </div>
      <Separator />
      <CreateForm />
    </div>
  );
}
