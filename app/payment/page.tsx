import PageWrapper from "@/app/_components/page-wrapper";
import Checkout from "@/app/payment/_components/checkout";
import { getSubscription } from "../dashboard/subscriptions/_actions";
import { redirect } from "next/navigation";

type PaymentProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Payment({ searchParams }: PaymentProps) {
  const awaitedParams = await searchParams;
  const subscription = await getSubscription(awaitedParams.subscription);

  if (!subscription) {
    return redirect("/subscriptions");
  }

  return (
    <PageWrapper>
      <Checkout subscriptionId={subscription.id} />
    </PageWrapper>
  );
}
