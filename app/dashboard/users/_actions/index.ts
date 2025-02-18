import { prisma } from "@/db/prisma";

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
}

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
}