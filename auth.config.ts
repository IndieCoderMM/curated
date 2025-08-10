import bcrypt from "bcryptjs";
import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/db";
import { LoginSchema } from "./lib/schemas";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validateFields = LoginSchema.safeParse(credentials);
        if (!validateFields.success) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = validateFields.data;
        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
} as NextAuthConfig;
