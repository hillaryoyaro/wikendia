"use client";

import { LocationPanel } from "./location-panel";
import { SearchItem } from "./search-item";
//import { LocationPanel } from "./location-panel";

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function LocationSearch({
  value,
  onChange,
  open,
  onOpen,
  onClose,
}: LocationSearchProps) {
  return (
    <div className="relative">
      <SearchItem
        title="Where"
        value={value || "Choose a destination"}
        onClick={open ? onClose : onOpen}
      />

      {open && (
        <div
          className="
            absolute
            left-0
            top-full
            z-50
            mt-3
            w-[420px]
          "
        >
          <LocationPanel
            value={value}
            onChange={(location) => {
              onChange(location);
              onClose();
            }}
          />
        </div>
      )}
    </div>
  );
}