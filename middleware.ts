import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { authApiPrefix, authRoutes, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAuthApiRoute = nextUrl.pathname.startsWith(authApiPrefix);

  if (isAuthApiRoute) {
    return null;
  }

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }

    return null;
  }

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
