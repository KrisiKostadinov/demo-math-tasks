import { Metadata } from "next";

import PageWrapper from "@/app/_components/page-wrapper";
import LoginForm from "@/app/users/sign-in/_components/login-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: `Влезте в профила си ${process.env.SEPARATOR} ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
  description: "Платформа за решаване на задачи по математика.",
  keywords:
    "решаване на задачи, математика, обучение по математика, задачи по математика, упражнения по математика",
  openGraph: {
    title: `Влезте в профила си ${process.env.SEPARATOR} ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`,
    description: "Платформа за решаване на задачи по математика.",
  },
};

export default function LoginPage() {
  return (
    <PageWrapper>
      <div className="p-5 md:p-10 space-y-5">
        <h1 className="text-2xl font-semibold">Влезте в профила си</h1>
        <Image
          src={"/images/login-background-school.png"}
          alt={`Влезте в профила си ${process.env.SEPARATOR} ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`}
          width={600}
          height={400}
          priority
          className="object-cover"
        />
        <LoginForm />
      </div>
    </PageWrapper>
  );
}
