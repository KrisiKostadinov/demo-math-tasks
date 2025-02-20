import { Subscription } from "@prisma/client";
import DisplaySubscription from "@/app/subscriptions/_components/display-subscription";
import { Session } from "next-auth";

type DisplaySubscriptionsProps = {
  session: Session | null;
  subscriptions: Subscription[];
  isDisabledButton: boolean;
};

export default function DisplaySubscriptions({
  session,
  subscriptions,
  isDisabledButton,
}: DisplaySubscriptionsProps) {

  return (
    <ul className="grid xl:grid-cols-2 2xl:grid-cols-4 gap-5 text-center">
      {subscriptions.map((subscription, index) => (
        <DisplaySubscription
          subscription={subscription}
          key={index}
          className="p-5 border rounded space-y-5"
          session={session}
          isDisabledButton={isDisabledButton}
        />
      ))}
    </ul>
  );
}