import { redirect } from "next/navigation";

import { stripe } from "@/lib/stripe";

const getSession = async (id: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    return session;
  } catch (error) {
    return null;
  }
}

type PaymentSuccessProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function PaymentSuccess({
  searchParams,
}: PaymentSuccessProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return redirect("/subscriptions");
  }

  const session = await getSession(session_id);

  if (!session) {
    return <div>Невалидна сесия.</div>
  }

  if (session.status === "expired") {
    return <div>Изтекла сесия.</div>
  }

  if (session.status === "open") {
    return <div>Вашата сесия е в процес.</div>
  }

  return redirect("/users/account");
}