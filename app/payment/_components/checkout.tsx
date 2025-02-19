"use client";

import { useCallback } from "react";
import axios from "axios";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

type CheckoutProps = {
  subscriptionId: string;
};

export default function Checkout({ subscriptionId }: CheckoutProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await axios.post("/api/payment", { subscriptionId });
      return response.data.client_secret;
    } catch (error) {
      console.log(error);
    }
  }, [subscriptionId]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
