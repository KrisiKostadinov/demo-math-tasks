"use client";

import { create } from "zustand";

interface SubscriptionState {
  isOpen: boolean;
  userId: string;
  toggleSubscription: (isOpen: boolean) => void;
  setUserId: (userId: string) => void;
}

const useSubscriptionStore = create<SubscriptionState>((set) => ({
  isOpen: false,
  userId: "",
  toggleSubscription: (isOpen: boolean) => set(() => ({ isOpen })),
  setUserId: (userId: string) => set(() => ({ userId })),
}));

export default useSubscriptionStore;
