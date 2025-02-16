"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as LucideIcons from "lucide-react";

import { ClientIcon } from "@/components/ui/client-icon";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SchoolClass } from "@prisma/client";
import useSidebarStore from "@/zustand/sidebar";

type DisplaySidebarItemsProps = {
  schoolClasses: SchoolClass[];
};

export default function DisplaySidebarItems({
  schoolClasses,
}: DisplaySidebarItemsProps) {
  return (
    <ScrollArea className="h-screen">
      <div className="text-2xl font-semibold py-5 text-center border-b-2 border-gray-100">
        {process.env.NEXT_PUBLIC_WEBSITE_TITLE}
      </div>
      <ul>
        <DisplayItem heading="Начало" link="/" icon="HomeIcon" isExact />
        <DisplayItem
          heading="Абонаменти"
          link="/subscriptions"
          icon="PlayIcon"
        />
        <Separator />
        {schoolClasses.map((x, index) => (
          <DisplayItem heading={x.name} link={`/${x.slug}`} key={index} />
        ))}
        <Separator />
        <DisplayItem heading="Вход" link="/users/sign-in" icon="UserIcon" />
        <Separator />
        <DisplayItem heading="Контакти" link="/contacts" icon="ContactIcon" />
        <DisplayItem heading="За нас" link="/about-us" icon="UsersIcon" />
        <DisplayItem
          heading="Често задавани въпроси (ЧЗВ)"
          link="/faq"
          icon="MessageCircleQuestion"
        />
        <Separator />
        <DisplayItem
          heading="Лични данни"
          link="/privacy-policy"
          icon="GlobeLock"
        />
        <DisplayItem heading="Общи условия" link="/terms" icon="EarthLock" />
      </ul>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

type DisplayItemProps = {
  heading: string;
  link: string;
  icon?: keyof typeof LucideIcons;
  isExact?: boolean;
};

const DisplayItem = ({
  heading,
  link,
  icon,
  isExact = false,
}: DisplayItemProps) => {
  const { toggleSidebar } = useSidebarStore();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (isExact) {
      return pathname === path;
    }

    return pathname.includes(path);
  };

  return (
    <li>
      <Link
        href={link}
        className={cn(
          "text-lg flex items-center gap-2 hover:text-white hover:bg-blue-500 py-3 px-5",
          isActive(link) && "text-white bg-blue-500"
        )}
        onClick={() => toggleSidebar(false)}
      >
        {icon ? <ClientIcon name={icon} /> : <ChevronRightIcon />}
        <span>{heading}</span>
      </Link>
    </li>
  );
};