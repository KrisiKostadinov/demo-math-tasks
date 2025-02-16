"use client";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import useSidebarStore from "@/zustand/sidebar";

export default function Navbar() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <div className="bg-white p-5 border-b border-gray-100">
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={toggleSidebar}
        asChild
        className="w-12 h-12 p-2 cursor-pointer"
      >
        <MenuIcon />
      </Button>
    </div>
  );
}