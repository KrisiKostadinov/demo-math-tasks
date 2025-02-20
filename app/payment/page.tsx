import { redirect } from "next/navigation";

import PageWrapper from "@/app/_components/page-wrapper";
import Checkout from "@/app/payment/_components/checkout";
import { auth } from "@/lib/auth";
import { prisma } from "@/db/prisma";

type PaymentProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Payment({ searchParams }: PaymentProps) {
  const session = await auth();
  const awaitedParams = await searchParams;
  
  const subscription = await prisma.subscription.findFirst({
    where: {
      id: awaitedParams.subscription || "",
    }
  });

  if (!session) {
    return redirect("/users/sign-in");
  }

  if (!subscription) {
    return redirect("/subscriptions");
  }

  return (
    <PageWrapper>
      <Checkout subscriptionId={subscription.id} />
    </PageWrapper>
  );
}
