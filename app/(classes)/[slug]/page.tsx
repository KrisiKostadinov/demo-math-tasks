import PageWrapper from "@/app/_components/page-wrapper";
import Sidebar from "@/app/_components/sidebar";

type SchoolClassProps = {
  params: Promise<{ slug: string }>;
};

export default async function SchoolClass({ params }: SchoolClassProps) {
  const slug = (await params).slug;

  return (
    <PageWrapper sidebar={<Sidebar />}>
      <div>{slug}</div>
    </PageWrapper>
  );
}
