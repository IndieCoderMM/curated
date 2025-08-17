import { v4 as uuid } from "uuid";
import { db } from "./db";

export const getUserById = async (id: string) => {
  return db.user.findUnique({
    where: { id },
  });
};

export const getUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: { email },
  });
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration

  return await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};
