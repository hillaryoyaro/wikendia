"use server";

import { redirect } from "next/navigation";

import { registerSchema } from "../schemas/auth.schema";

import {
  createUser,
  findUserByEmail,
} from "../services/auth.service";

import type { RegisterState } from "../types";

export async function registerUser(
  _previousState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  // 1. Read and normalize form data
  const rawData = {
    name: String(formData.get("name") ?? "").trim(),

    email: String(formData.get("email") ?? "")
      .trim()
      .toLowerCase(),

    password: String(formData.get("password") ?? ""),

    confirmPassword: String(
      formData.get("confirmPassword") ?? ""
    ),
  };

  // 2. Validate submitted data
  const parsed = registerSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;

  try {
    // 3. Check for an existing account
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return {
        success: false,
        errors: {
          email: [
            "An account with this email already exists.",
          ],
        },
      };
    }

    // 4. Create account
    // Password hashing happens inside createUser()
    await createUser({
      name,
      email,
      password,
    });
  } catch (error) {
    // 5. Handle duplicate email race conditions
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        errors: {
          email: [
            "An account with this email already exists.",
          ],
        },
      };
    }

    // 6. Handle unexpected errors
    console.error("Registration error:", error);

    return {
      success: false,
      errors: {},
      message:
        "Unable to create your account right now. Please try again.",
    };
  }

  // 7. Redirect after successful registration
  // Keep outside try/catch because redirect throws internally.
  redirect("/login");
}