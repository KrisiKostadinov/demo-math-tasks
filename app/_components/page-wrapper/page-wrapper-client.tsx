"use client";

import { ReactNode, useEffect, useState } from "react";
import { useMedia } from "react-use";

import useSidebarStore from "@/zustand/sidebar";
import { cn } from "@/lib/utils";

type PageWrapperProps = {
  children: ReactNode;
};

export default function PageWrapperClient({ children }: PageWrapperProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const isMobile = useMedia("(max-width: 768px)", false);
  const { isOpen } = useSidebarStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main
      className={cn(
        "absolute top-0 right-0 min-h-screen duration-500",
        isOpen && !isMobile ? "left-[24rem]" : "left-0"
      )}
    >
      {children}
    </main>
  );
}
