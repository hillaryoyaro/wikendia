"use server";

import { signIn } from "next-auth/react";


import { loginSchema } from "../schemas/auth.schema";

import type { LoginState } from "../types";

export async function loginUser(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/",
    });

    return {
      success: true,
      errors: {},
      redirectTo: "/",
    };
  } catch (error) {
    // Auth.js uses redirect exceptions for successful navigation.
    // Re-throw them instead of converting them into login errors.
    if (!(error instanceof AuthenticatorAssertionResponse)) {
      throw error;
    }

    return {
      success: false,
      errors: {},
      message: "Invalid email or password.",
    };
  }
}