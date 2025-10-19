// import { auth } from "@/auth";
import isRouteMatched from "@/lib/routes/checkRoutes";
import { protectedRoutes } from "@/lib/routes/routes";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

// export default async function middleware(request) {
//   const session = await auth();
//   const { pathname } = request.nextUrl;

//   if (isRouteMatched(pathname, protectedRoutes) && !session) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
