"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSubscriptionStore from "@/app/dashboard/users/zustand/use-subscription";
import { Subscription } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { addUserToSubscription } from "@/app/dashboard/users/_actions";
import { cn } from "@/lib/utils";

type ChooseSubscriptionsDialogProps = {
  subscriptions: Subscription[];
};

export default function ChooseSubscriptionsDialog({
  subscriptions,
}: ChooseSubscriptionsDialogProps) {
  const router = useRouter();
  const subscriptionStore = useSubscriptionStore();
  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [subscriptionId, setSubscriptionId] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const onAddSubscription = async () => {
    setLoading(true);

    try {
      await addUserToSubscription(subscriptionStore.userId, subscriptionId);
      subscriptionStore.toggleSubscription(false);
      toast.success("Потребителят беше добавен успешно към абонамента.");
    } catch (error) {
      console.log(error);
      toast.error("Възникна грешка при добавянето на потребителя към абонамента.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <Dialog
      open={subscriptionStore.isOpen}
      onOpenChange={() => subscriptionStore.toggleSubscription(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Изберете абонамент</DialogTitle>
          <DialogDescription className="text-lg">
            Изберете абонамент, който да бъде добавен към потребителя.
          </DialogDescription>
        </DialogHeader>
        <ul className="flex flex-col gap-1">
          {subscriptions.map((subscription) => (
            <li
              key={subscription.id}
              className={cn(
                "py-2 px-4 border rounded hover:text-white hover:bg-primary cursor-pointer",
                subscriptionId === subscription.id && "bg-primary text-white"
              )}
              onClick={() => setSubscriptionId(subscription.id)}
            >
              {subscription.name}
            </li>
          ))}
        </ul>
        <Button
          type="button"
          disabled={loading}
          onClick={onAddSubscription}
        >
          {loading && (
            <FaSpinner className={cn("repeat-infinite animate-spin", "mr-2")} />
          )}
          {loading ? "Зареждане..." : "Потвържадаване"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
