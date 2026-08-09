import Link from "next/link";
import { UserCircle } from "lucide-react";

export function UserMenu() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="
          hidden
          rounded-full
          px-4
          py-2
          text-sm
          font-semibold
          text-ink-700
          transition
          hover:bg-ink-100
          md:inline-flex
        "
      >
        Log in
      </Link>

      <Link
        href="/register"
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-ink-200
          px-4
          py-2
          text-sm
          font-semibold
          text-ink-900
          transition
          hover:bg-ink-100
        "
      >
        <UserCircle className="h-4 w-4" />

        <span>Sign up</span>
      </Link>
    </div>
  );
}