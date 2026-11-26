"use client";

import { useActionState, useState } from "react";
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
      type="submit"
      disabled={pending}
      className="
        w-full
        rounded-xl
        bg-brand-500
        px-4
        py-2.5
        font-semibold
        text-white
        transition
        hover:bg-brand-600
        focus:outline-none
        focus:ring-2
        focus:ring-brand-500/30
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {pending
        ? "Creating your account..."
        : "Create account"}
    </button>
  );
}

export default function RegisterForm() {
  const [state, formAction] = useActionState(
    registerUser,
    initialState
  );

  const [googleLoading, setGoogleLoading] =
    useState(false);

  async function handleGoogleSignIn() {
    setGoogleLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch {
      setGoogleLoading(false);
    }
  }

  return (
    <div>
      {/* =====================================================
          CREDENTIAL REGISTRATION
          ===================================================== */}

      <form
        action={formAction}
        className="mt-5 space-y-4"
      >
        {/* =================================================
            NAME
            ================================================= */}

        <div>
          <label
            htmlFor="register-name"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-ink-800
            "
          >
            Full name
          </label>

          <input
            id="register-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className="
              w-full
              rounded-xl
              border
              border-ink-300
              bg-surface
              px-3.5
              py-2.5
              text-ink-800
              outline-none
              ring-brand-300
              placeholder:text-ink-400
              focus:ring-2
            "
          />

          {state.errors?.name?.[0] && (
            <p
              role="alert"
              className="mt-1 text-sm text-red-500"
            >
              {state.errors.name[0]}
            </p>
          )}
        </div>

        {/* =================================================
            EMAIL
            ================================================= */}

        <div>
          <label
            htmlFor="register-email"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-ink-800
            "
          >
            Email
          </label>

          <input
            id="register-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="
              w-full
              rounded-xl
              border
              border-ink-300
              bg-surface
              px-3.5
              py-2.5
              text-ink-800
              outline-none
              ring-brand-300
              placeholder:text-ink-400
              focus:ring-2
            "
          />

          {state.errors?.email?.[0] && (
            <p
              role="alert"
              className="mt-1 text-sm text-red-500"
            >
              {state.errors.email[0]}
            </p>
          )}
        </div>

        {/* =================================================
            PASSWORD
            ================================================= */}

        <div>
          <label
            htmlFor="register-password"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-ink-800
            "
          >
            Password
          </label>

          <input
            id="register-password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Minimum 8 characters"
            className="
              w-full
              rounded-xl
              border
              border-ink-300
              bg-surface
              px-3.5
              py-2.5
              text-ink-800
              outline-none
              ring-brand-300
              placeholder:text-ink-400
              focus:ring-2
            "
          />

          {state.errors?.password?.[0] && (
            <p
              role="alert"
              className="mt-1 text-sm text-red-500"
            >
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {/* =================================================
            CONFIRM PASSWORD
            ================================================= */}

        <div>
          <label
            htmlFor="register-confirm-password"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-ink-800
            "
          >
            Confirm password
          </label>

          <input
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            placeholder="Repeat your password"
            className="
              w-full
              rounded-xl
              border
              border-ink-300
              bg-surface
              px-3.5
              py-2.5
              text-ink-800
              outline-none
              ring-brand-300
              placeholder:text-ink-400
              focus:ring-2
            "
          />

          {state.errors?.confirmPassword?.[0] && (
            <p
              role="alert"
              className="mt-1 text-sm text-red-500"
            >
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

        {/* =================================================
            GENERAL ERROR
            ================================================= */}

        {state.message && (
          <p
            role="alert"
            className="
              rounded-xl
              bg-red-50
              px-3
              py-2.5
              text-sm
              text-red-600
            "
          >
            {state.message}
          </p>
        )}

        {/* =================================================
            SUBMIT
            ================================================= */}

        <RegisterSubmitButton />
      </form>

      {/* =====================================================
          DIVIDER
          ===================================================== */}

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-ink-200" />

        <span className="text-xs font-medium text-ink-500">
          OR
        </span>

        <div className="h-px flex-1 bg-ink-200" />
      </div>

      {/* =====================================================
          GOOGLE
          ===================================================== */}

      <button
        type="button"
        disabled={googleLoading}
        onClick={handleGoogleSignIn}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-ink-300
          bg-surface
          px-4
          py-2.5
          font-semibold
          text-ink-700
          transition
          hover:bg-ink-100
          focus:outline-none
          focus:ring-2
          focus:ring-brand-500/30
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      >
        {googleLoading
          ? "Redirecting to Google..."
          : "Continue with Google"}
      </button>
    </div>
  );
}