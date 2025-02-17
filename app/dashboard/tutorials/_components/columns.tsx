"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { SchoolClass, SchoolTutorial, TutorialStatus } from "@prisma/client";
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
import { getFormattedStatus } from "@/app/dashboard/tutorials/_utils";
import { formatDate } from "@/lib/utils";
import { deleteTutorialAction } from "@/app/dashboard/tutorials/_actions";
import Link from "next/link";

export const columns: ColumnDef<SchoolTutorial>[] = [
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
    accessorKey: "schoolClass.name",
    header: () => <div>Клас</div>,
    cell: ({ row }) => {
      const tutorial = row.original as SchoolTutorial & {
        schoolClass?: SchoolClass;
      };
      return (
        <Button variant={"link"} asChild className="p-0">
          <Link href={`/dashboard/tutorials?class=${tutorial.schoolClass?.id}`}>
            {tutorial.schoolClass?.name ?? "Няма клас"}
          </Link>
        </Button>
      );
    },
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
        {(row.getValue("status") as TutorialStatus) === "ACTIVE" ? (
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
    cell: ({ row }) => {
      return <DisplayActions id={row.original.id} />;
    },
  },
];

const DisplayActions = ({ id }: { id: string }) => {
  const router = useRouter();

  const onUpdate = (id: string) => {
    router.push(`/dashboard/tutorials/${id}`);
    return null;
  };

  const onDelete = async (id: string) => {
    try {
      await deleteTutorialAction(id);
      toast.success("Премахването на урока беше успешно.");
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
