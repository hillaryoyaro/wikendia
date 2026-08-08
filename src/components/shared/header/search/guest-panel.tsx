"use client";

import { GUEST_LIMITS } from "./guest-constants";
import { GuestCounter } from "./guest-counter";
import { GuestState } from "./search-types";

interface GuestPanelProps {
  guests: GuestState;
  onChange: (guests: GuestState) => void;
}

export function GuestPanel({
  guests,
  onChange,
}: GuestPanelProps) {
  return (
    <div
      className="
        w-[360px]
        rounded-3xl
        border
        border-ink-200
        bg-surface
        p-5
        shadow-xl
      "
    >
      <GuestCounter
        title="Adults"
        subtitle="Ages 13 or above"
        value={guests.adults}
        min={GUEST_LIMITS.adults.min}
        max={GUEST_LIMITS.adults.max}
        onChange={(value) =>
          onChange({
            ...guests,
            adults: value,
          })
        }
      />

      <GuestCounter
        title="Children"
        subtitle="Ages 2 to 12"
        value={guests.children}
        min={GUEST_LIMITS.children.min}
        max={GUEST_LIMITS.children.max}
        onChange={(value) =>
          onChange({
            ...guests,
            children: value,
          })
        }
      />

      <GuestCounter
        title="Infants"
        subtitle="Under 2"
        value={guests.infants}
        min={GUEST_LIMITS.infants.min}
        max={GUEST_LIMITS.infants.max}
        onChange={(value) =>
          onChange({
            ...guests,
            infants: value,
          })
        }
      />
    </div>
  );
}