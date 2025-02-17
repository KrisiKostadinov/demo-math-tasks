"use client";

import { useMedia } from "react-use";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

import { SchoolClass } from "@prisma/client";
import { cn } from "@/lib/utils";
import DisplaySidebarItems from "@/app/_components/sidebar/display-sidebar-items";
import useSidebarStore from "@/zustand/sidebar";

type SidebarClientComponentProps = {
  schoolClasses: SchoolClass[];
  session: Session | null;
};

export default function SidebarClientComponent({
  schoolClasses,
  session,
}: SidebarClientComponentProps) {
  const [mounded, setMounted] = useState<boolean>(false);
  const isMobile = useMedia("(max-width: 768px)", false);
  const { isOpen, toggleSidebar } = useSidebarStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounded) {
    return null;
  }

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-screen bg-black/70 z-30 duration-500",
          isMobile && isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => toggleSidebar(false)}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 w-full max-w-sm z-40 min-h-screen overflow-auto border-r-2 bg-white border-gray-100 transition-transform duration-500",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <DisplaySidebarItems schoolClasses={schoolClasses} session={session} />
      </aside>
    </>
  );
}