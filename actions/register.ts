"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/queries";
import { RegisterSchema } from "@/lib/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const result = RegisterSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.errors.map((e) => e.message).join(", "),
    };
  }

  const { name, email, password } = result.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      error: "Email already exists",
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // @todo Send verification email
  return {
    success: "User registered successfully",
  };
};
