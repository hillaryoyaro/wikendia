"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  House,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function LoginForm() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /*
   * ---------------------------------------------------------
   * CALLBACK URL
   * ---------------------------------------------------------
   *
   * Only allow internal paths.
   * This prevents an attacker from supplying something like:
   *
   * /login?callbackUrl=https://malicious-site.com
   *
   * ---------------------------------------------------------
   */

  const callbackUrl = useMemo(() => {
    const requested =
      searchParams.get("callbackUrl") ?? "/";

    if (
      !requested.startsWith("/") ||
      requested.startsWith("//")
    ) {
      return "/";
    }

    return requested;
  }, [searchParams]);

  /*
   * ---------------------------------------------------------
   * CREDENTIAL LOGIN
   * ---------------------------------------------------------
   */

  async function onCredentialsLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: true,
        callbackUrl,
      });

      /*
       * With redirect: true, NextAuth normally redirects
       * automatically on success.
       *
       * This is mainly a fallback in case an error is returned.
       */

      if (result?.error) {
        setError("Invalid email or password.");
        setIsLoading(false);
      }
    } catch {
      setError(
        "Something went wrong. Please try again."
      );

      setIsLoading(false);
    }
  }

  /*
   * ---------------------------------------------------------
   * GOOGLE LOGIN
   * ---------------------------------------------------------
   */

  async function onGoogleLogin() {
    setError("");

    await signIn("google", {
      callbackUrl,
    });
  }

  return (
    <div className="grid w-full overflow-hidden rounded-3xl border border-ink-200 bg-surface shadow-sm md:grid-cols-2">

      {/* =====================================================
          LEFT — BRAND / VALUE PROPOSITION
          ===================================================== */}

      <div
        className="
          bg-gradient-to-br
          from-brand-50
          via-white
          to-brand-100
          p-8
          md:p-10
        "
      >
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.16em]
            text-brand-600
          "
        >
          Welcome back
        </p>

        <h1
          className="
            mt-3
            text-3xl
            font-bold
            tracking-tight
            text-ink-900
          "
        >
          Sign in to continue
          your booking plans
        </h1>

        <p
          className="
            mt-3
            text-sm
            leading-relaxed
            text-ink-600
          "
        >
          Access your bookings, manage your
          hosting activity, and continue
          exploring stays with Wikendia.
        </p>

        <div
          className="
            mt-8
            space-y-4
            text-sm
            text-ink-700
          "
        >
          <p className="flex items-center gap-3">
            <House
              className="
                h-4
                w-4
                shrink-0
                text-brand-500
              "
            />

            Personalized stay recommendations
          </p>

          <p className="flex items-center gap-3">
            <ShieldCheck
              className="
                h-4
                w-4
                shrink-0
                text-brand-500
              "
            />

            Secure account access
          </p>

          <p className="flex items-center gap-3">
            <Sparkles
              className="
                h-4
                w-4
                shrink-0
                text-brand-500
              "
            />

            A simpler booking experience
          </p>
        </div>
      </div>

      {/* =====================================================
          RIGHT — LOGIN FORM
          ===================================================== */}

      <div className="p-8 md:p-10">
        <div>
          <h2
            className="
              text-2xl
              font-semibold
              text-ink-900
            "
          >
            Sign in
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-ink-600
            "
          >
            Continue as a guest or host.
          </p>
        </div>

        {/* =================================================
            CREDENTIAL FORM
            ================================================= */}

        <form
          onSubmit={onCredentialsLogin}
          className="mt-6 space-y-4"
        >
          {/* Email */}

          <div>
            <label
              htmlFor="email"
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
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              className="
                w-full
                rounded-xl
                border
                border-ink-300
                bg-white
                px-3.5
                py-2.5
                text-ink-800
                outline-none
                transition
                placeholder:text-ink-400
                focus:border-brand-500
                focus:ring-2
                focus:ring-brand-300
              "
            />
          </div>

          {/* Password */}

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="
                  text-sm
                  font-medium
                  text-ink-800
                "
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="
                  text-xs
                  font-semibold
                  text-brand-600
                  hover:text-brand-700
                "
              >
                Forgot password?
              </Link>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              className="
                w-full
                rounded-xl
                border
                border-ink-300
                bg-white
                px-3.5
                py-2.5
                text-ink-800
                outline-none
                transition
                placeholder:text-ink-400
                focus:border-brand-500
                focus:ring-2
                focus:ring-brand-300
              "
            />
          </div>

          {/* Error */}

          {error ? (
            <div
              role="alert"
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-3.5
                py-2.5
                text-sm
                text-red-700
              "
            >
              {error}
            </div>
          ) : null}

          {/* Submit */}

          <button
            type="submit"
            disabled={isLoading}
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
            {isLoading
              ? "Signing you in..."
              : "Sign in"}
          </button>
        </form>

        {/* =================================================
            DIVIDER
            ================================================= */}

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink-200" />

          <span
            className="
              text-xs
              font-medium
              text-ink-500
            "
          >
            OR
          </span>

          <div className="h-px flex-1 bg-ink-200" />
        </div>

        {/* =================================================
            GOOGLE LOGIN
            ================================================= */}

        <button
          type="button"
          onClick={onGoogleLogin}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-ink-300
            bg-white
            px-4
            py-2.5
            font-semibold
            text-ink-900
            transition
            hover:bg-ink-50
            focus:outline-none
            focus:ring-2
            focus:ring-brand-500/20
          "
        >
          <GoogleIcon />

          <span>
            Continue with Google
          </span>
        </button>

        {/* =================================================
            REGISTER
            ================================================= */}

        <p
          className="
            mt-6
            text-center
            text-sm
            text-ink-600
          "
        >
          New to Wikendia?{" "}
          <Link
            href="/register"
            className="
              font-bold
              text-brand-600
              hover:text-brand-700
            "
          >
            Create an account
          </Link>
        </p>

        {/* =================================================
            TERMS
            ================================================= */}

        <p
          className="
            mt-6
            text-center
            text-xs
            leading-5
            text-ink-500
          "
        >
          By continuing, you agree to Wikendia&apos;s{" "}
          <Link
            href="/terms"
            className="underline hover:text-ink-700"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline hover:text-ink-700"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

/*
 * =========================================================
 * GOOGLE ICON
 * =========================================================
 */

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.22a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.7 2.93-4.2 2.93-7.19Z"
      />
      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.51A9.74 9.74 0 0 0 12 21.5Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.62A5.86 5.86 0 0 1 6.23 12c0-.56.1-1.1.31-1.62V7.87H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.13l3.25-2.51Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.35c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.46 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.37l3.25 2.51c.77-2.31 2.92-4.03 5.46-4.03Z"
      />
    </svg>
  );
}