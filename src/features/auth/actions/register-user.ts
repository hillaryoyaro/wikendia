"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import {
  createUser,
  findUserByEmail,
} from "../services/auth.service";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export async function registerUser(
  formData: FormData
) {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await findUserByEmail(parsed.data.email);

  if (existing) {
    return {
      success: false,
      errors: {
        email: ["Email already exists."],
      },
    };
  }

  await createUser(parsed.data);

  redirect("/login");
}