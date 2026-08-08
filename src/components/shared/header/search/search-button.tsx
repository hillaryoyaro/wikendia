"use client";

import { Search } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SearchButtonProps {
  mobile?: boolean;
}

export function SearchButton({
  mobile = false,
}: SearchButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        bg-brand-500
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-brand-600
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${mobile ? "w-full" : "w-auto"}
      `}
    >
      <Search className="h-4 w-4" />

      <span>
        {pending ? "Searching..." : "Search"}
      </span>
    </button>
  );
}