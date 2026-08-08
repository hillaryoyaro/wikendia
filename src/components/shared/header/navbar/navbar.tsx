import Link from "next/link";
import { House } from "lucide-react";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function Navbar() {
  const user = await getCurrentUser();

  const hasHostedListings = user
    ? (await prisma.listing.count({
        where: {
          userId: user.id,
        },
      })) > 0
    : false;

  const hostCtaLabel = hasHostedListings
    ? "Manage hosting"
    : "Start hosting";

  return (
    <header className="w-full border-b border-ink-200 bg-surface">
      <nav
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            flex
            items-center
            gap-2
            text-lg
            font-bold
            tracking-tight
            text-brand-500
          "
        >
          <House className="h-5 w-5" />
          <span>Wikendia</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Link
            href="/host"
            className="
              hidden
              rounded-full
              px-3
              py-2
              text-sm
              font-semibold
              text-ink-700
              transition
              hover:bg-ink-100
              md:inline-flex
            "
          >
            {hostCtaLabel}
          </Link>
        </div>
      </nav>
    </header>
  );
}