import PageWrapper from "@/app/_components/page-wrapper";
import { prisma } from "@/db/prisma";
import { auth } from "@/lib/auth";
import DisplaySubscription from "@/app/users/account/_components/display-subscription";

export default async function Account() {
  const session = await auth();

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });

  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return (
    <PageWrapper>
      <div className="p-10">
        <h1 className="text-3xl font-semibold">Моят профил</h1>
      </div>
      {user.subscription && (
        <div className="mx-10 mb-10 rounded-md text-lg shadow text-white bg-green-600 p-5">
          Абонаментът ви е активен!
        </div>
      )}
      {user.subscription ? (
        <DisplaySubscription subscription={user.subscription} user={user} />
      ) : (
        <div className="mx-10 p-5 text-lg border rounded bg-gray-100">
          Нямате активен абонамент
        </div>
      )}
    </PageWrapper>
  );
}
