"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { SchoolClass } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFormattedStatus } from "@/app/dashboard/classes/_utils";
import { deleteSchoolClassAction } from "@/app/dashboard/classes/_actions";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<SchoolClass>[] = [
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
    accessorKey: "slug",
    header: () => <div>URL Адрес</div>,
    cell: ({ row }) => <div>{row.getValue("slug")}</div>,
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
        {row.getValue("status") ? (
          <Badge variant={"outline"}>
            {getFormattedStatus(row.getValue("status"))}
          </Badge>
        ) : (
          <Badge>{getFormattedStatus(row.getValue("status"))}</Badge>
        )}
      </>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <DisplayActions id={row.original.id} />;
    },
  },
];

const DisplayActions = ({ id }: { id: string }) => {
  const router = useRouter();

  const onUpdate = (id: string) => {
    router.push(`/dashboard/classes/${id}`);
    return null;
  };

  const onDelete = async (id: string) => {
    try {
      await deleteSchoolClassAction(id);
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
        <DropdownMenuItem onClick={() => onDelete(id)}>
          Премахване
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};