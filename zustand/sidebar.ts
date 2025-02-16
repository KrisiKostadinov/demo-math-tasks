"use client";

import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: (isOpen: boolean) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  toggleSidebar: (isOpen: boolean) => set((state) => ({ isOpen })),
}));

export default useSidebarStore;
