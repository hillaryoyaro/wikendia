"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";

import { registerUser } from "../actions/register-user";
import type { RegisterState } from "../types";


const initialState: RegisterState = {
  success: false,
  errors: {},
};



function RegisterSubmitButton() {

  const { pending } = useFormStatus();


  return (
    <button
      disabled={pending}
      type="submit"
      className="
        w-full rounded-xl
        bg-brand-500
        px-4 py-2.5
        font-semibold
        text-white
        hover:bg-brand-600
        disabled:opacity-70
      "
    >
      {
        pending
          ? "Creating your account..."
          : "Create account"
      }

    </button>
  );
}



export default function RegisterForm() {


  const [
    state,
    formAction
  ] = useActionState(
    registerUser,
    initialState
  );


  const [
    googleLoading,
    setGoogleLoading
  ] = useState(false);



  return (
    <>

      <form
        action={formAction}
        className="mt-5 space-y-3"
      >


        {/* Name */}

        <div>

          <input
            name="name"
            required
            placeholder="Full name"
            className="
              w-full rounded-xl
              border border-ink-300
              px-3.5 py-2.5
              text-ink-800
              outline-none
              ring-brand-300
              focus:ring-2
            "
          />


          {
            state.errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.name[0]}
              </p>
            )
          }

        </div>




        {/* Email */}

        <div>

          <input
            name="email"
            type="email"
            required
            placeholder="Work or personal email"
            className="
              w-full rounded-xl
              border border-ink-300
              px-3.5 py-2.5
              text-ink-800
              outline-none
              ring-brand-300
              focus:ring-2
            "
          />


          {
            state.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.email[0]}
              </p>
            )
          }

        </div>




        {/* Password */}

        <div>

          <input
            name="password"
            type="password"
            minLength={8}
            required
            placeholder="Password (minimum 8 characters)"
            className="
              w-full rounded-xl
              border border-ink-300
              px-3.5 py-2.5
              text-ink-800
              outline-none
              ring-brand-300
              focus:ring-2
            "
          />


          {
            state.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.password[0]}
              </p>
            )
          }

        </div>




        {/* Confirm Password */}

        <div>

          <input
            name="confirmPassword"
            type="password"
            required
            placeholder="Confirm password"
            className="
              w-full rounded-xl
              border border-ink-300
              px-3.5 py-2.5
              text-ink-800
              outline-none
              ring-brand-300
              focus:ring-2
            "
          />


          {
            state.errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.confirmPassword[0]}
              </p>
            )
          }

        </div>



        {
          state.message && (
            <p className="text-sm text-red-500">
              {state.message}
            </p>
          )
        }



        <RegisterSubmitButton />


      </form>





      {/* Divider */}

      <div className="my-4 flex items-center gap-3">

        <div className="h-px flex-1 bg-ink-200" />

        <span className="text-sm text-ink-500">
          OR
        </span>

        <div className="h-px flex-1 bg-ink-200" />

      </div>





      {/* Google OAuth */}

      <button
        type="button"
        disabled={googleLoading}
        className="
          w-full rounded-xl
          border border-ink-300
          px-4 py-2.5
          font-semibold
          text-ink-700
          hover:bg-ink-100
          disabled:opacity-70
        "
        onClick={async()=>{

          setGoogleLoading(true);

          await signIn(
            "google",
            {
              callbackUrl:"/"
            }
          );

        }}
      >

        {
          googleLoading
            ? "Redirecting to Google..."
            : "Continue with Google"
        }


      </button>


    </>
  );
}