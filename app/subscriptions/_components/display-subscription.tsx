"use client";

import { Session } from "next-auth";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Subscription } from "@prisma/client";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";

type DisplaySubscriptionProps = {
  session: Session | null;
  subscription: Subscription;
  isDisabledButton: boolean;
} & React.ComponentPropsWithoutRef<"li">;

export default function DisplaySubscription({
  session,
  subscription,
  isDisabledButton,
  ...props
}: DisplaySubscriptionProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <li {...props}>
      <h2 className="text-2xl">{subscription.name}</h2>
      <Separator />
      <div className="text-xl text-green-600">
        {formatPrice(subscription.originalPrice)}
      </div>
      {subscription.description && (
        <div className="text-lg">{subscription.description}</div>
      )}
      {subscription.durationInDays && (
        <div className="text-lg">
          Валидност {subscription.durationInDays} дни
        </div>
      )}
      <Button
        className="p-0 w-full hover:bg-green-600"
        disabled={isDisabledButton}
        onClick={() => setLoading(true)}
      >
        <Link
          href={
            session
              ? `/payment?subscription=${subscription.id}`
              : "/users/sign-in"
          }
          className="py-3 flex justify-center items-center gap-2 w-full text-lg"
        >
          {loading && <FaSpinner className="repeat-infinite animate-spin" />}
          <span>Активиране на абонамент</span>
        </Link>
      </Button>
    </li>
  );
}
