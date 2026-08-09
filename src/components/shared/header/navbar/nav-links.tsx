import Link from "next/link";

import { mainNavigation } from "@/config/navigation.config";

export function NavLinks() {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-1 md:flex"
    >
      {mainNavigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            text-ink-700
            transition
            hover:bg-ink-100
            hover:text-ink-900
          "
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}