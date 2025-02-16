import { Metadata } from "next";

import PageWrapper from "@/app/_components/page-wrapper";
import Sidebar from "@/app/_components/sidebar";

export const metadata: Metadata = {
  title: `Влезте в профила си ${process.env.SEPARATOR} ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
  description: "Платформа за решаване на задачи по математика.",
  keywords: "решаване на задачи, математика, обучение по математика, задачи по математика, упражнения по математика",
  openGraph: {
    title: `Влезте в профила си ${process.env.SEPARATOR} ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
    description: "Платформа за решаване на задачи по математика.",
  },
};

export default function LoginPage() {
  return (
    <PageWrapper sidebar={<Sidebar />}>
      <div>
        <h1 className="text-2xl font-semibold">Влезте в профила си</h1>
      </div>
    </PageWrapper>
  );
}