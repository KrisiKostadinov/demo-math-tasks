import SidebarClientComponent from "@/app/_components/sidebar/sidebar-client-component";
import { prisma } from "@/db/prisma";

export default async function Sidebar() {
  const schoolClasses = await prisma.schoolClass.findMany();

  return (
    <>
      <SidebarClientComponent schoolClasses={schoolClasses} />
    </>
  );
}