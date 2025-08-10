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
