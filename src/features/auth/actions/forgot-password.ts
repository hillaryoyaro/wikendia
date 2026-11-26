
"use server";

import { forgotPasswordSchema } from "../schemas/auth.schema";
import { findUserByEmail } from "../services/auth.service";
import { createPasswordResetToken } from "../services/password.service";
import { sendPasswordResetEmail } from "../services/verification.service";

import type { ForgotPasswordState } from "../types";

export async function forgotPassword(
  _previousState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await findUserByEmail(parsed.data.email);

    // Only send a reset email when the account has an email address.
    if (user?.email) {
      const token = await createPasswordResetToken(user.id);

      await sendPasswordResetEmail(user.email, token);
    }

    // Do not reveal whether the account exists.
    return {
      success: true,
      errors: {},
      message:
        "If an account exists with that email, password reset instructions will be sent shortly.",
    };
  } catch (error) {
    console.error("Forgot password error:", error);

    return {
      success: false,
      errors: {},
      message:
        "We could not process your request. Please try again later.",
    };
  }
}
