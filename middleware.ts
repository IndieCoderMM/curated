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

  const authPaths = Object.values(authRoutes);

  const isAuthRoute = authPaths.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }

    return null;
  }

  // use Regex to check if the route is public
  const pathToRegex = (pattern: string) => {
    // Escape regex special chars first
    let regexStr = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Support Next-style dynamic segments: [id]
    regexStr = regexStr.replace(/\\\[[^/]+?\\\]/g, "[^/]+");
    // Support param segments like :id
    regexStr = regexStr.replace(/:([A-Za-z0-9_]+)/g, "[^/]+");
    // Support wildcard *
    regexStr = regexStr.replace(/\\\*/g, ".*");
    return new RegExp(`^${regexStr}$`);
  };

  const isPublicRoute = publicRoutes.some((route) =>
    pathToRegex(route).test(nextUrl.pathname),
  );

  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL(authRoutes.login, nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
