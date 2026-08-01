import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { RegisterInput } from "../schemas/auth.schema";

const SALT_ROUNDS = 12;

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });
}

export async function createUser(
  data: Omit<RegisterInput, "confirmPassword">
) {
  const hashedPassword = await bcrypt.hash(
    data.password,
    SALT_ROUNDS
  );

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      hashedPassword,
    },
  });
}