import { NextResponse } from "next/server";
import isRouteMatched from "./lib/routes/checkRoutes";
import { protectedRoutes } from "./lib/routes/routes";
import jwt from "jsonwebtoken";

export const authConfig = {
  pages: {
    signIn: "/login",
    // error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id || user._id?.toString();
        token.name = user.name;
        token.email = user.email;
        token.accessToken = jwt.sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          process.env.AUTH_SECRET,
          { expiresIn: "2h" }
        );
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const { pathname } = request.nextUrl;

      const isOnLoginPage = pathname.startsWith("/login");

      // Redirect logged-in users away from the login page
      if (isOnLoginPage && user) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Block access to protected routes if user is not logged in
      if (isRouteMatched(pathname, protectedRoutes) && !user) {
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(redirectUrl);
      }

      return true;
    },
  },
};
