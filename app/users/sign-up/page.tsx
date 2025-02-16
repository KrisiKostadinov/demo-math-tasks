import { Metadata } from "next";

import PageWrapper from "@/app/_components/page-wrapper";
import Sidebar from "@/app/_components/sidebar";
import RegisterForm from "@/app/users/sign-up/_components/register-form";

export const metadata: Metadata = {
  title: `Създаване на профил ${process.env.SEPARATOR} ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
  description: "Платформа за решаване на задачи по математика.",
  keywords: "решаване на задачи, математика, обучение по математика, задачи по математика, упражнения по математика",
  openGraph: {
    title: `Създаване на профил ${process.env.SEPARATOR} ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
    description: "Платформа за решаване на задачи по математика.",
  },
};

export default function RegisterPage() {
  return (
    <PageWrapper sidebar={<Sidebar />}>
      <div className="p-5 md:p-10 space-y-5">
        <h1 className="text-2xl font-semibold">
          Създаване на профил в платформата
        </h1>
        <RegisterForm />
      </div>
    </PageWrapper>
  );
}
