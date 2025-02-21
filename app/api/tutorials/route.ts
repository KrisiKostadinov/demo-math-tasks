import { prisma } from "@/db/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const classId = request.nextUrl.searchParams.get("classId");

  if (!classId) {
    return new Response("Класът, който сте подали е невалиден.", {
      status: 400,
    });
  }

  const schoolClass = await prisma.schoolClass.findUnique({
    where: { id: classId },
  });

  if (!schoolClass) {
    return new Response("Класът, който сте подали е невалиден.", {
      status: 400,
    });
  }

  const tutorials = await prisma.schoolTutorial.findMany({
    where: { schoolClassId: classId },
    select: { id: true, name: true },
  });

  return Response.json(tutorials);
}
