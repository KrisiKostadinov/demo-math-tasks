import { formatDistanceToNow } from "date-fns";
import { bg } from "date-fns/locale";

import { formatDate, formatPrice } from "@/lib/utils";
import { Subscription, User } from "@prisma/client";

type DisplaySubscriptionProps = {
  subscription: Subscription;
  user: User;
};

export default function DisplaySubscription({
  subscription,
  user,
}: DisplaySubscriptionProps) {
  return (
    <div className="mx-10 border rounded-md p-5 bg-gray-100 space-y-5">
      <h2 className="text-2xl font-semibold">Информация за абонамента</h2>
      <ul className="flex flex-col items-center gap-2">
        <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
          <span>Статус</span>
          <span>Активен</span>
        </li>
        <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
          <span>Текущ план</span>
          <span>{subscription.name}</span>
        </li>
        <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
          <span>Заплатена сума</span>
          <span>{formatPrice(subscription.originalPrice)}</span>
        </li>
        <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
          <span>Стартова дата</span>
          <span>{formatDate(user.subscriptionPeriodStart as Date)}</span>
        </li>
        <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
          <span>Крайна дата</span>
          <span>{formatDate(user.subscriptionPeriodEnd as Date)}</span>
        </li>
          <li className="bg-white text-lg p-2 px-4 border rounded w-full flex justify-between items-center">
            <span>Изтича след</span>
            <span>
              {formatDistanceToNow(
                new Date(user.subscriptionPeriodEnd as Date),
                {
                  locale: bg,
                }
              )}
            </span>
          </li>
      </ul>
    </div>
  );
}