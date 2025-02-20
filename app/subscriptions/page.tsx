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

  const userSubscription = await prisma.userSubscription.findFirst({
    where: {
      currentPeriodStart: { lte: new Date() },
      currentPeriodEnd: { gte: new Date() },
      userId: session ? session.user.id : "",
    },
  });

  return (
    <PageWrapper>
      <div className="p-10 space-y-5">
        <h1 className="text-3xl font-semibold">Абонаменти</h1>
        <p className="max-w-2xl text-lg">
          Моля, изберете периода от време, през който искате вашият абонамент да
          бъде активен, за да се възползвате от неограничено решаване на задачи
          по математика.
        </p>
        {userSubscription && (
          <div className="rounded-md text-lg shadow text-white bg-green-600 p-5">
            <div>
              Към настоящи момент, имате активен абонамент до{" "}
              {new Date(userSubscription.currentPeriodEnd).toLocaleDateString()}
            </div>
            <div>
              Изтича след:{" "}
              {formatDistanceToNow(
                new Date(userSubscription.currentPeriodEnd),
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
          isDisabledButton={!!userSubscription}
        />
      </div>
    </PageWrapper>
  );
}