"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Subscription, User } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSubscriptionStore from "@/app/dashboard/users/zustand/use-subscription";
import Link from "next/link";
import { deleteUserFromSubscription } from "@/app/dashboard/users/_actions";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Избиране на всички"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Избиране на ред"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Име
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) =>
      row.getValue("name") ? (
        <div>{row.getValue("name")}</div>
      ) : (
        <div className="text-muted-foreground">Няма име</div>
      ),
  },
  {
    accessorKey: "subscription.name",
    header: () => <div>Абонамент</div>,
    cell: ({ row }) => {
      const user = row.original as User & {
        subscription: Subscription | null;
      };

      return user.subscription ? (
        <Button variant={"link"} asChild className="p-0">
          <Link
            href={`/dashboard/subscriptions/${user.subscription.id}`}
            passHref
          >
            {user.subscription.name}
          </Link>
        </Button>
      ) : (
        <div className="text-muted-foreground">Няма абонамент</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Дата на регистрация
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Имейл
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Опции",
    cell: ({ row }) => {
      return (
        <DisplayActions
          id={row.original.id}
          subscriptionId={row.original.subscriptionId as string}
        />
      );
    },
  },
];

type DisplayActionsProps = {
  id: string;
  subscriptionId?: string;
};

const DisplayActions = ({ id, subscriptionId }: DisplayActionsProps) => {
  const router = useRouter();
  const subscriptionStore = useSubscriptionStore();

  const onSubscription = async () => {
    subscriptionStore.toggleSubscription(true);
    subscriptionStore.setUserId(id);
  };

  const onDeleteSubscription = async () => {
    try {
      await deleteUserFromSubscription(id);
      subscriptionStore.toggleSubscription(false);
      toast.success("Потребителят беше премахнат успешно от абонамента.");
    } catch (error) {
      console.log(error);
      toast.error(
        "Възникна грешка при премахването на потребителя от абонамента."
      );
    } finally {
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Опции</DropdownMenuLabel>
        <DropdownMenuItem onClick={onSubscription} disabled={!!subscriptionId}>
          Добавяне на абонамент
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDeleteSubscription}
          disabled={!!!subscriptionId}
        >
          Премахване на абонамент
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};