import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { getUserById } from "./lib/queries";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  callbacks: {
    jwt: async ({ token }) => {
      if (!token.sub) {
        return token;
      }

      const role = await getUserById(token.sub);
      token.role = role;
      return token;
    },
    session: async ({ session, token }) => {
      session.user.role = (token.role as UserRole) ?? UserRole.USER;
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
