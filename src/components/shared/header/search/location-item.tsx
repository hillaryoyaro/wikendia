"use client";

import { Check, MapPin } from "lucide-react";

import type { LocationOption } from "./locations";

interface LocationItemProps {
  location: LocationOption;
  selected: boolean;
  onSelect: () => void;
}

export function LocationItem({
  location,
  selected,
  onSelect,
}: LocationItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="
        flex
        w-full
        items-center
        gap-3
        rounded-2xl
        px-3
        py-3
        text-left
        transition
        hover:bg-ink-100
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-ink-100
        "
      >
        <MapPin className="h-5 w-5 text-ink-700" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink-900">
          {location.name}
        </p>

        {location.description && (
          <p className="truncate text-xs text-ink-500">
            {location.description}
          </p>
        )}
      </div>

      {selected && (
        <Check className="h-5 w-5 shrink-0 text-brand-500" />
      )}
    </button>
  );
}