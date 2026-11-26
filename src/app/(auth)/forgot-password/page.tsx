import Link from "next/link";
import ForgotPasswordForm from "@/features/auth/components/forgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <Link href="/" className="text-3xl font-bold text-brand-700">
            Wikendia
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-ink-900">
            Forgot your password?
          </h1>

          <p className="mt-2 text-sm text-ink-500">
            Enter your email address and we will send you a reset link.
          </p>
        </div>

        <ForgotPasswordForm />
      </section>
    </main>
  );
}