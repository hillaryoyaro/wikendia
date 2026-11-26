import "server-only";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

const SALT_ROUNDS = 12;
const TOKEN_EXPIRY_MINUTES = 30;

function hashToken(token: string) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function createPasswordResetToken(
  userId: string
) {
  const token = crypto.randomBytes(32).toString("hex");

  const tokenHash = hashToken(token);

  const expiresAt = new Date(
    Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000
  );

  await prisma.$transaction(async (tx) => {
    await tx.passwordResetToken.deleteMany({
      where: { userId },
    });

    await tx.passwordResetToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  });

  return token;
}

export async function resetUserPassword(
  token: string,
  newPassword: string
) {
  const tokenHash = hashToken(token);

  const hashedPassword = await bcrypt.hash(
    newPassword,
    SALT_ROUNDS
  );

  return prisma.$transaction(async (tx) => {
    const resetToken =
      await tx.passwordResetToken.findUnique({
        where: { tokenHash },
      });

    if (
      !resetToken ||
      resetToken.expiresAt.getTime() <= Date.now()
    ) {
      return false;
    }

    const deleted = await tx.passwordResetToken.deleteMany({
      where: {
        id: resetToken.id,
        tokenHash,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (deleted.count !== 1) {
      return false;
    }

    await tx.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        hashedPassword,
      },
    });

    return true;
  });
}