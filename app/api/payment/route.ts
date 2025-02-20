import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { subscriptionId } = await request.json();

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Това абонамент не е намерен." },
        { status: 400 }
      );
    }

    const referer = request.headers.get("referer");
    const url = new URL(
      referer || (process.env.NEXT_PUBLIC_WEBSITE_URL as string)
    );
    const returnUrl = `${url.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&subscription_id=${subscriptionId}`;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            unit_amount: subscription.originalPrice
              ? subscription.originalPrice * 100
              : 0,
            currency: "BGN",
            product_data: {
              name: subscription.name || "Неопределен продукт",
              description: subscription.description || "Без описание",
            },
          },
          quantity: 1,
        },
      ],
      payment_method_types: ["card"],
      mode: "payment",
      automatic_tax: { enabled: true },
      return_url: returnUrl,
    });

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Това абонамент не е намерен." },
      { status: 400 }
    );
  }
}
