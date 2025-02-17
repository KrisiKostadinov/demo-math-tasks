import { NextResponse, type NextRequest } from "next/server";

import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";

const guestRoutes = ["/users/sign-in", "/users/sign-up"];
const loggedInRoutes = ["/users/account"];
const adminRoutes = ["/dashboard"];

export default async function authMiddleware(request: NextRequest) {
  const session = await auth();
  const currentRoute = request.nextUrl.pathname;

  const isGuestRoute = guestRoutes.includes(currentRoute);
  const isAdminRoute = adminRoutes.includes(currentRoute);
  const isLoggedInRoute = loggedInRoutes.includes(currentRoute);

  if (!session && isLoggedInRoute) {
    return NextResponse.redirect(new URL("/users/sign-in", request.nextUrl));
  }

  if (session && isGuestRoute) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (
    isAdminRoute &&
    (!session || (session.user.role as UserRole) !== "ADMIN")
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
