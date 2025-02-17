import { SubscriptionStatus } from "@prisma/client";

export const getFormattedStatus = (status: SubscriptionStatus) => {
  const statuses: { [key in SubscriptionStatus]: string } = {
    ACTIVE: "Активен",
    DRAFT: "Чернова",
  };

  return statuses[status];
};