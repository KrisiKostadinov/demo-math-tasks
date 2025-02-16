import { SchoolClassStatus } from "@prisma/client";

export const getFormattedStatus = (status: SchoolClassStatus) => {
  const statuses: { [key in SchoolClassStatus]: string } = {
      ACTIVE: "Активен",
      DRAFT: "Чернова"
  };
  
  return statuses[status];
}