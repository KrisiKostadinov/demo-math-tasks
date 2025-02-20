import PageWrapper from "@/app/_components/page-wrapper";
import { prisma } from "@/db/prisma";
import { auth } from "@/lib/auth";
import DisplaySubscription from "@/app/users/account/_components/display-subscription";

export default async function Account() {
  const session = await auth();

  const [activeSubscription, expiredSubscriptions] = await Promise.all([
    prisma.userSubscription.findFirst({
      where: {
        currentPeriodStart: { lte: new Date() },
        currentPeriodEnd: { gte: new Date() },
        userId: session?.user.id,
      },
      include: {
        user: true,
        subscription: true,
      },
    }),
    prisma.userSubscription.findMany({
      where: {
        currentPeriodEnd: { lte: new Date() },
        userId: session?.user.id,
      },
      include: {
        user: true,
        subscription: true,
      },
    }),
  ]);

  return (
    <PageWrapper>
      <div className="p-10">
        <h1 className="text-3xl font-semibold">Моят профил</h1>
      </div>
      {activeSubscription && (
        <div className="mx-10 mb-10 rounded-md text-lg shadow text-white bg-green-600 p-5">
          Абонаментът ви е активен!
        </div>
      )}
      {activeSubscription ? (
        <DisplaySubscription
          userSubscription={activeSubscription}
          isActive={true}
        />
      ) : (
        <div className="mx-10 p-5 text-lg border rounded bg-gray-100">
          Нямате активен абонамент
        </div>
      )}
      {expiredSubscriptions.length && (
        <div className="mb-10">
          <div className="p-10">
            <h2 className="text-3xl font-semibold">Изтекли абонаменти</h2>
          </div>
          <div className="flex flex-col gap-5">
            {expiredSubscriptions.map((subscription, index) => (
              <DisplaySubscription
                userSubscription={subscription}
                isActive={false}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
