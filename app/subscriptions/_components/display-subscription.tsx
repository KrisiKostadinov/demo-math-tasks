import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Subscription } from "@prisma/client";

type DisplaySubscriptionProps = {
  subscription: Subscription;
} & React.ComponentPropsWithoutRef<"li">;

export default function DisplaySubscription({
  subscription,
  ...props
}: DisplaySubscriptionProps) {
  return (
    <li {...props}>
      <h2 className="text-2xl">{subscription.name}</h2>
      <Separator />
      <div className="text-xl text-green-600">
        {formatPrice(subscription.originalPrice)}
      </div>
      {subscription.description && (
        <div className="text-lg">{subscription.description}</div>
      )}
      {subscription.durationInDays && (
        <div className="text-lg">
          Валидност {subscription.durationInDays} дни
        </div>
      )}
      <Button className="w-full hover:bg-green-600" asChild>
        <Link href={`/payments?subscription=${subscription.id}`}>
          Активиране на абонамент
        </Link>
      </Button>
    </li>
  );
}
