import { Subscription } from "@prisma/client";
import DisplaySubscription from "@/app/subscriptions/_components/display-subscription";

type DisplaySubscriptionsProps = {
    subscriptions: Subscription[];
}

export default function DisplaySubscriptions({ subscriptions }: DisplaySubscriptionsProps) {
  return (
    <ul className="grid xl:grid-cols-2 2xl:grid-cols-4 gap-5 text-center">
      {subscriptions.map((subscription, index) => (
        <DisplaySubscription
          subscription={subscription}
          key={index}
          className="p-5 border rounded space-y-5"
        />
      ))}
    </ul>
  );
}