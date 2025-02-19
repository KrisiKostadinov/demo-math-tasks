import { auth } from "@/lib/auth";
import { getSubscriptions } from "@/app/dashboard/subscriptions/_actions";
import PageWrapper from "@/app/_components/page-wrapper";
import DisplaySubscriptions from "@/app/subscriptions/_components/display-subscriptions";

export default async function Subscriptions() {
  const session = await auth();
  const subscriptions = await getSubscriptions("ACTIVE");

  return (
    <PageWrapper>
      <div className="p-10 space-y-5">
        <h1 className="text-3xl font-semibold">Абонаменти</h1>
        <p className="max-w-2xl text-lg">
          Моля, изберете периода от време, през който искате вашият абонамент да
          бъде активен, за да се възползвате от неограничено решаване на задачи
          по математика.
        </p>
        <DisplaySubscriptions session={session} subscriptions={subscriptions} />
      </div>
    </PageWrapper>
  );
}
