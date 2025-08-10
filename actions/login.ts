"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/lib/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod";

type LoginResponse = { success?: string; error?: string };

export const login = async (
  data: z.infer<typeof LoginSchema>,
): Promise<LoginResponse> => {
  const result = LoginSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.errors.map((e) => e.message).join(", "),
    };
  }

  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Logged in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid crendials" };
        default:
          return { error: "Something went worng!" };
      }
    }

    throw error;
  }
};
