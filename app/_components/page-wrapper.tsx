"use client";

import { ReactNode, useEffect, useState } from "react";
import { useMedia } from "react-use";

import useSidebarStore from "@/zustand/sidebar";
import { cn } from "@/lib/utils";
import PageHeader from "@/app/_components/page-header";

type PageWrapperProps = {
  children: ReactNode;
  sidebar: ReactNode | null;
};

export default function PageWrapper({ children, sidebar }: PageWrapperProps) {
  const [mounded, setMounted] = useState<boolean>(false);
  const { isOpen, toggleSidebar } = useSidebarStore();
  const isMobile = useMedia("(max-width: 768px)");

  useEffect(() => {
    if (!sidebar && isOpen) {
      toggleSidebar(false);
    }
    setMounted(true);
  }, [sidebar]);

  if (!mounded) {
    return null;
  }

  return (
    <div className="flex">
      {sidebar}
      <main
        className={cn(
          "absolute top-0 right-0 min-h-screen duration-500",
          isOpen && !isMobile ? "left-[24rem]" : "left-0"
        )}
      >
        <PageHeader />
        {children}
      </main>
    </div>
  );
}
