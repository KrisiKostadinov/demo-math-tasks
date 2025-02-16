import { ReactNode } from "react";

import Sidebar from "@/app/dashboard/_components/sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 pr-5">
        {children}
      </main>
    </div>
  );
}
