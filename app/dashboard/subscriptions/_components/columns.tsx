"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Subscription, SubscriptionStatus } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFormattedStatus } from "@/app/dashboard/subscriptions/_utils";
import { formatDate, formatPrice } from "@/lib/utils";
import {
  deleteSubscriptionsAction,
  updateSubscriptionStatusAction,
} from "@/app/dashboard/subscriptions/_actions";

export const columns: ColumnDef<Subscription>[] = [
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
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "originalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Цена
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{formatPrice(row.getValue("originalPrice"))}</div>,
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Цена на промоция
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        {row.getValue("sellingPrice") ? (
          <div>{formatPrice(row.getValue("sellingPrice"))}</div>
        ) : (
          <div className="text-muted-foreground">Няма промоция</div>
        )}
      </>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div>Описание</div>,
    cell: ({ row }) => (
      <>
        {row.getValue("description") ? (
          <div className="text-wrap">{row.getValue("description")}</div>
        ) : (
          <div className="text-muted-foreground">Няма описание</div>
        )}
      </>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Дата на добавяне
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => (
      <>
        {(row.getValue("status") as SubscriptionStatus) === "ACTIVE" ? (
          <Badge variant={"default"}>
            {getFormattedStatus(row.getValue("status"))}
          </Badge>
        ) : (
          <Badge variant={"outline"}>
            {getFormattedStatus(row.getValue("status"))}
          </Badge>
        )}
      </>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Опции",
    cell: ({ row }) => {
      return (
        <DisplayActions id={row.original.id} status={row.original.status} />
      );
    },
  },
];

type DisplayActionsProps = {
  id: string;
  status: SubscriptionStatus;
};

const DisplayActions = ({ id, status }: DisplayActionsProps) => {
  const router = useRouter();

  const onUpdate = (id: string) => {
    router.push(`/dashboard/subscriptions/${id}`);
    return null;
  };

  const onDelete = async (id: string) => {
    try {
      await deleteSubscriptionsAction([id]);
      toast.success("Премахването на класа беше успешно.");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Нещо се обърка.");
      }
    }
  };

  const onUpdateStatus = async (status: SubscriptionStatus) => {
    try {
      await updateSubscriptionStatusAction(status, [id]);
      toast.success("Статусът беше променен.");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Нещо се обърка.");
      }
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
        <DropdownMenuItem onClick={() => onUpdate(id)}>
          Промяна
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Статус</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              onClick={() => onUpdateStatus("ACTIVE")}
              disabled={status === "ACTIVE"}
            >
              Активиране
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onUpdateStatus("DRAFT")}
              disabled={status === "DRAFT"}
            >
              Деактивиране
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={() => onDelete(id)}>
          Премахване
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};