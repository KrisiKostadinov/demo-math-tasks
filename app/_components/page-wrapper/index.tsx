import { ReactNode } from "react";

import Sidebar from "@/app/_components/sidebar";
import Navbar from "@/app/_components/navbar";
import PageWrapperClient from "@/app/_components/page-wrapper/page-wrapper-client";

type PageWrapperProps = {
  children: ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="relative">
      <Sidebar />
      <PageWrapperClient>
        <Navbar />
        {children}
      </PageWrapperClient>
    </div>
  );
}
