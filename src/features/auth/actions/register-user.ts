"use server";

import { redirect } from "next/navigation";
import { registerSchema } from "../schemas/auth.schema";
import {
  createUser,
  findUserByEmail,
} from "../services/auth.service";

import type { RegisterState } from "../types";


export async function registerUser(
  previousState: RegisterState,
  formData: FormData
): Promise<RegisterState> {

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });


  if (!parsed.success) {
    return {
      success:false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }


  const existing = await findUserByEmail(
    parsed.data.email
  );


  if(existing){
    return {
      success:false,
      errors:{
        email:[
          "Email already exists."
        ]
      }
    };
  }


  await createUser(parsed.data);


  redirect("/login");
}