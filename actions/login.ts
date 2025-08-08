"use server";

import { db } from "@/lib/db";
import { LoginSchema } from "@/lib/schemas";
import bcrypt from "bcrypt";
import * as z from "zod";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const result = LoginSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.errors.map((e) => e.message).join(", "),
    } as const;
  }

  const { email, password } = result.data;

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return { error: "Invalid email or password" } as const;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { error: "Invalid email or password" } as const;
  }

  return { success: "Logged in successfully" } as const;
};
