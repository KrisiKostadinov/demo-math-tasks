"use client";

import { useMedia } from "react-use";

import { SchoolClass } from "@prisma/client";
import { cn } from "@/lib/utils";
import DisplaySidebarItems from "@/app/_components/sidebar/display-sidebar-items";
import useSidebarStore from "@/zustand/sidebar";

type DesktopSidebarProps = {
  schoolClasses: SchoolClass[];
};

export default function DesktopSidebar({ schoolClasses }: DesktopSidebarProps) {
  const isMobile = useMedia("(max-width: 768px)");
  const { isOpen } = useSidebarStore();

  console.log(isMobile);
  

  if (isMobile) {
    return null;
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 w-full max-w-sm z-40 min-h-screen overflow-auto border-r-2 bg-white border-gray-100 duration-200",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <DisplaySidebarItems schoolClasses={schoolClasses} />
    </aside>
  );
}