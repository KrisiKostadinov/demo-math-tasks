"use client";

import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import useSidebarStore from "@/zustand/sidebar";

export default function Navbar() {
  const { isOpen, toggleSidebar } = useSidebarStore();

  const [mounded, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, [mounded]);

  if (!mounded) {
    return null;
  }

  return (
    <div className="bg-white p-5 border-b border-gray-100">
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => toggleSidebar(!isOpen)}
        asChild
        className="w-12 h-12 p-2 cursor-pointer"
      >
        <MenuIcon />
      </Button>
    </div>
  );
}
