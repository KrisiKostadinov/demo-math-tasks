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

  const userSubscription = await prisma.userSubscription.findFirst({
    where: {
      currentPeriodStart: { lte: new Date() },
      currentPeriodEnd: { gte: new Date() },
      userId: authSession?.user.id,
    },
  });

  if (userSubscription) {
    return redirect("/users/account");
  }

  if (!subscription || !subscription.stripePriceId || !authSession?.user.id) {
    return redirect("/users/account");
  }

  await prisma.userSubscription.create({
    data: {
      userId: authSession.user.id,
      subscriptionId: awaitedParams.subscription_id,
      priceId: subscription.stripePriceId,
      price: subscription.originalPrice,
      currentPeriodStart: new Date(),
      currentPeriodEnd: addDays(
        new Date(),
        subscription.durationInDays as number
      ),
    },
  });

  return redirect("/users/account");
}
