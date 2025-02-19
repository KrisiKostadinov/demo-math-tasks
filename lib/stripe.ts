import { Stripe } from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string,
  {
    apiVersion: "2025-01-27.acacia",
    typescript: true,
  }
);

type GetStripeSessionProps = {
  priceId: string;
  domainUrl: string;
  customerId: string;
};

export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
}: GetStripeSessionProps) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [{ price: priceId, quantity: 1 }],
    payment_method_types: ["card"],
    customer_update: {
        address: "auto",
        name: "auto",
    },
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/cancelled`,
  });

  return session.url as string;
};