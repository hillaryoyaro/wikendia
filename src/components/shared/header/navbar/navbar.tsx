import Link from "next/link";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { UserMenu } from "./user-menu";

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

  const hostCtaHref = hasHostedListings
    ? "/hosting/dashboard"
    : "/hosting/listings/create";

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-ink-200
        bg-surface/95
        backdrop-blur
      "
    >
      <nav
        aria-label="Primary navigation"
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          gap-6
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =====================================
            LEFT
            ===================================== */}

        <div className="flex items-center gap-8">
          <Logo />

          <NavLinks />
        </div>

        {/* =====================================
            RIGHT
            ===================================== */}

        <div className="flex items-center gap-2">
          <Link
            href={hostCtaHref}
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
            {hostCtaLabel}
          </Link>

          <UserMenu />
        </div>
      </nav>
    </header>
  );
}