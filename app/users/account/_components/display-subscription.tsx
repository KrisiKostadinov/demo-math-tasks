import { formatDistanceToNow } from "date-fns";
import { bg } from "date-fns/locale";

import { formatDate, formatPrice, mapStatus } from "@/lib/utils";
import { Subscription, UserSubscription } from "@prisma/client";

type DisplaySubscriptionProps = {
  userSubscription: UserSubscription & { subscription: Subscription };
};

export default function DisplaySubscription({
  userSubscription,
}: DisplaySubscriptionProps) {
  return (
    <div className="mx-10 border rounded-md p-5 bg-gray-100 space-y-5">
      <h2 className="text-2xl font-semibold">Информация за абонамента</h2>
      <ul className="flex flex-col items-center gap-2">
        <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
          <span>Статус</span>
          <span>{mapStatus(userSubscription.status)}</span>
        </li>
        <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
          <span>Текущ план</span>
          <span>{userSubscription.subscription.name}</span>
        </li>
        <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
          <span>Заплатена сума</span>
          <span>{formatPrice(userSubscription.price)}</span>
        </li>
        <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
          <span>Стартова дата</span>
          <span>{formatDate(userSubscription.currentPeriodStart)}</span>
        </li>
        <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
          <span>Крайна дата</span>
          <span>{formatDate(userSubscription.currentPeriodEnd)}</span>
        </li>
        {userSubscription.status === "ACTIVE" && (
          <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
            <span>Изтича след</span>
            <span>
              {formatDistanceToNow(
                new Date(userSubscription.currentPeriodEnd),
                {
                  locale: bg,
                }
              )}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}