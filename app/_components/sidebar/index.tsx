import DesktopSidebar from "@/app/_components/sidebar/desktop-sidebar";
import { prisma } from "@/db/prisma";

export default async function Sidebar() {
  const schoolClasses = await prisma.schoolClass.findMany();

  return (
    <>
      <DesktopSidebar schoolClasses={schoolClasses} />
    </>
  );
}