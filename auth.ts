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
  pages: {
    error: "/auth/error",
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(), // Skip email verification for linked accounts
        },
      });
    },
  },
  callbacks: {
    jwt: async ({ token }) => {
      if (!token.sub) {
        return token;
      }

      const dbUser = await getUserById(token.sub);
      if (!dbUser) {
        return token;
      }

      token.role = dbUser.role;
      return token;
    },
    session: async ({ session, token }) => {
      if (token.sub) {
        session.user.id = token.sub;
      }
      session.user.role = (token.role as UserRole) ?? UserRole.USER;
      return session;
    },
    signIn: async ({ user, account }) => {
      if (!user.id) {
        return false;
      }

      if (account?.provider !== "credentials") {
        return true;
      }

      const dbUser = await getUserById(user.id);

      if (dbUser && dbUser.email && dbUser.emailVerified) {
        return true;
      }

      return false;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
