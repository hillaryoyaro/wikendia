"use client";

import { Search } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SearchSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
      inline-flex
      items-center
      justify-center
      gap-2

      rounded-full

      bg-brand-500

      px-6
      py-3

      font-medium
      text-white

      transition

      hover:bg-brand-600

      disabled:cursor-not-allowed
      disabled:opacity-60
      "
    >
      <Search className="h-4 w-4" />

      {pending ? "Searching..." : "Search"}
    </button>
  );
}