"use server";

import { redirect } from "next/navigation";

import { resetPasswordSchema } from "../schemas/auth.schema";

import {
  resetUserPassword,
} from "../services/password.service";

import type { ResetPasswordState } from "../types";

export async function resetPassword(
  _previousState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const reset = await resetUserPassword(
      parsed.data.token,
      parsed.data.password
    );

    if (!reset) {
      return {
        success: false,
        errors: {
          token: [
            "This password reset link is invalid or has expired.",
          ],
        },
      };
    }
  } catch (error) {
    console.error("Reset password error:", error);

    return {
      success: false,
      errors: {},
      message: "Unable to reset your password. Please try again.",
    };
  }

  redirect("/login?passwordReset=success");
}