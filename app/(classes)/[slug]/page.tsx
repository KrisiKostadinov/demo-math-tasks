import PageWrapper from "@/app/_components/page-wrapper";

type SchoolClassProps = {
  params: Promise<{ slug: string }>;
};

export default async function SchoolClass({ params }: SchoolClassProps) {
  const slug = (await params).slug;

  return (
    <PageWrapper>
      <div>{slug}</div>
    </PageWrapper>
  );
}
