import { redirect } from "next/navigation";

import { stripe } from "@/lib/stripe";
import { prisma } from "@/db/prisma";
import { auth } from "@/lib/auth";
import { addDays } from "@/lib/utils";

type PaymentSuccessProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function PaymentSuccess({
  searchParams,
}: PaymentSuccessProps) {
  const awaitedParams = await searchParams;
  const authSession = await auth();

  if (!awaitedParams.session_id) {
    return redirect("/subscriptions");
  }

  const session = await stripe.checkout.sessions.retrieve(
    awaitedParams.session_id
  );

  if (!session) {
    return redirect("/users/account");
  }

  const subscription = await prisma.subscription.findFirst({
    where: { id: awaitedParams.subscription_id },
  });

  if (!subscription || !subscription.stripePriceId || !authSession?.user.id) {
    return redirect("/users/account");
  }

  await prisma.user.update({
    where: { id: authSession.user.id },
    data: {
      subscriptionId: awaitedParams.subscription_id,
      subscriptionPeriodStart: new Date(),
      subscriptionPeriodEnd: addDays(new Date(), 30),
    },
  });
  
  return redirect("/users/account");
}
