"use client";

import { MapPin, Search } from "lucide-react";
import { LOCATION_GROUPS } from "./locations";
import { LocationItem } from "./location-item";


interface LocationPanelProps {
  value: string;
  onChange: (location: string) => void;
}

export function LocationPanel({
  value,
  onChange,
}: LocationPanelProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-ink-200
        bg-surface
        shadow-xl
      "
    >
      {/* Search input */}
      <div className="border-b border-ink-200 p-4">
        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-ink-300
            px-4
            py-3
            transition
            focus-within:border-ink-500
            focus-within:ring-2
            focus-within:ring-ink-200
          "
        >
          <Search className="h-5 w-5 shrink-0 text-ink-500" />

          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search destinations"
            className="
              w-full
              bg-transparent
              text-sm
              text-ink-900
              outline-none
              placeholder:text-ink-500
            "
            autoFocus
          />
        </div>
      </div>

      {/* Destinations */}
      <div className="max-h-[420px] overflow-y-auto p-3">
        {LOCATION_GROUPS.map((group) => (
          <div key={group.title} className="mb-5 last:mb-0">
            <div className="px-3 pb-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                {group.title}
              </p>
            </div>

            <div className="space-y-1">
              {group.locations.map((location) => (
                <LocationItem
                  key={location.id}
                  location={location}
                  selected={value === location.name}
                  onSelect={() => onChange(location.name)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Anywhere option */}
      <div className="border-t border-ink-200 p-3">
        <button
          type="button"
          onClick={() => onChange("I'm flexible")}
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

          <div>
            <p className="text-sm font-semibold text-ink-900">
              I&apos;m flexible
            </p>

            <p className="text-xs text-ink-500">
              Find stays anywhere
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}