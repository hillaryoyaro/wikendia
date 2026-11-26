"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { resetPassword } from "../actions/reset-password";

import type { ResetPasswordState } from "../types";

const initialState: ResetPasswordState = {
  success: false,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-brand-500 px-4 py-3 font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
    >
      {pending ? "Updating password..." : "Reset password"}
    </button>
  );
}

export default function ResetPasswordForm({
  token,
}: {
  token: string;
}) {
  const [state, formAction] = useActionState(
    resetPassword,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">
          New password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={72}
          placeholder="Enter your new password"
          className="w-full rounded-xl border border-ink-200 px-4 py-3 outline-none focus:border-brand-500"
        />

        {state.errors.password?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1 block text-sm font-medium"
        >
          Confirm new password
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Confirm your new password"
          className="w-full rounded-xl border border-ink-200 px-4 py-3 outline-none focus:border-brand-500"
        />

        {state.errors.confirmPassword?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      {state.errors.token?.map((error) => (
        <p key={error} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ))}

      {state.message && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}