import SidebarClientComponent from "@/app/_components/sidebar/sidebar-client-component";
import { prisma } from "@/db/prisma";
import { auth } from "@/lib/auth";

export default async function Sidebar() {
  const session = await auth();
  const schoolClasses = await prisma.schoolClass.findMany();

  return (
    <>
      <SidebarClientComponent schoolClasses={schoolClasses} session={session} />
    </>
  );
}