"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";

import { ClientIcon } from "@/components/ui/client-icon";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  return (
    <aside className="flex-1 max-w-sm min-h-screen border-r-2 border-gray-100">
      <div className="text-2xl font-semibold py-5 text-center border-b-2 border-gray-100">
        Администрация
      </div>
      <ul>
        <DisplayItem heading="Табло" link="/dashboard" icon="LayoutDashboard" />
        <DisplayItem
          heading="Потребители"
          link="/dashboard/users"
          icon="UsersIcon"
        />
        <DisplayItem
          heading="Класове"
          link="/dashboard/classes"
          icon="GraduationCap"
        />
        <DisplayItem
          heading="Уроци"
          link="/dashboard/tutorials"
          icon="School"
        />
        <DisplayItem
          heading="Задачи"
          link="/dashboard/tasks"
          icon="ListChecks"
        />
        <DisplayItem
          heading="Абонаменти"
          link="/dashboard/subscriptions"
          icon="UserCheck"
        />
        <Separator />
        <DisplayItem
          heading="Към сайта"
          link="/"
          icon="Globe"
        />
      </ul>
    </aside>
  );
}

type DisplayItemProps = {
  heading: string;
  link: string;
  icon: keyof typeof LucideIcons;
};

const DisplayItem = ({ heading, link, icon }: DisplayItemProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  return (
    <li>
      <Link
        href={link}
        className={cn(
          "text-lg flex items-center gap-2 hover:text-white hover:bg-blue-500 py-3 px-5",
          isActive(link) && "text-white bg-blue-500"
        )}
      >
        <ClientIcon name={icon} className="w-7 h-7" />
        <span>{heading}</span>
      </Link>
    </li>
  );
};