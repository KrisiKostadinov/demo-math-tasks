import { auth } from "@/lib/auth";
import { getSubscriptions } from "@/app/dashboard/subscriptions/_actions";
import PageWrapper from "@/app/_components/page-wrapper";
import DisplaySubscriptions from "@/app/subscriptions/_components/display-subscriptions";
import { prisma } from "@/db/prisma";
import { formatDistanceToNow } from "date-fns";
import { bg } from "date-fns/locale";

export default async function Subscriptions() {
  const session = await auth();
  const subscriptions = await getSubscriptions("ACTIVE");

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });

  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return (
    <PageWrapper>
      <div className="p-10 space-y-5">
        <h1 className="text-3xl font-semibold">Абонаменти</h1>
        <p className="max-w-2xl text-lg">
          Моля, изберете периода от време, през който искате вашият абонамент да
          бъде активен, за да се възползвате от неограничено решаване на задачи
          по математика.
        </p>
        {user.subscription && (
          <div className="rounded-md text-lg shadow text-white bg-green-600 p-5">
            <div>
              Към настоящи момент, имате активен абонамент до{" "}
              {new Date(
                user.subscriptionPeriodEnd as Date
              ).toLocaleDateString()}
            </div>
            <div>
              Изтича след:{" "}
              {formatDistanceToNow(
                new Date(user.subscriptionPeriodEnd as Date),
                {
                  locale: bg,
                }
              )}
            </div>
          </div>
        )}

        <DisplaySubscriptions
          session={session}
          subscriptions={subscriptions}
          isDisabledButton={!!user.subscription}
        />
      </div>
    </PageWrapper>
  );
}
