import Link from "next/link";
import { House } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Wikendia home"
      className="
        flex
        shrink-0
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
  );
}