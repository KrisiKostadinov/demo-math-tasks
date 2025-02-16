"use client";

import { ReactNode } from "react";

import useSidebarStore from "@/zustand/sidebar";
import { cn } from "@/lib/utils";
import PageHeader from "@/app/_components/page-header";

type PageWrapperProps = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function PageWrapper({ children, sidebar }: PageWrapperProps) {
  const { isOpen } = useSidebarStore();

  return (
    <>
      <div className="flex">
        {sidebar}
        <main
          className={cn(
            "absolute top-0 right-0 min-h-screen duration-200",
            isOpen ? "left-[24rem]" : "left-0"
          )}
        >
          <PageHeader />
          {children}
        </main>
      </div>
    </>
  );
}
