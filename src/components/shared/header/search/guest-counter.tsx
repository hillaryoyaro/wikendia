"use client";

import { GuestCounterProps } from "./guest-types";


export function GuestCounter({
  title,
  subtitle,
  value,
  min = 0,
  max = 99,
  onChange,
}: GuestCounterProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div>
        <p className="font-medium">{title}</p>

        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="h-8 w-8 rounded-full border disabled:opacity-40"
        >
          −
        </button>

        <span className="w-6 text-center">
          {value}
        </span>

        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="h-8 w-8 rounded-full border disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}