"use client";

import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { SearchItem } from "./search-item";
import { DatePickerWithRange } from "./date-range-picker";

interface DateSearchProps {
  range: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function DateSearch({
  range,
  onChange,
  open,
  onOpen,
  onClose,
}: DateSearchProps) {
  const getLabel = () => {
    if (!range?.from) {
      return "Add dates";
    }

    if (!range.to) {
      return format(range.from, "MMM d");
    }

    return `${format(
      range.from,
      "MMM d"
    )} – ${format(range.to, "MMM d")}`;
  };

  return (
    <div className="relative">
      <SearchItem
        title="When"
        value={getLabel()}
        onClick={open ? onClose : onOpen}
      />

      {open && (
        <div
          className="
            absolute
            left-1/2
            top-full
            z-50
            mt-3
            w-[min(960px,calc(100vw-2rem))]
            -translate-x-1/2
          "
        >
          <div
            className="
              rounded-[28px]
              border
              border-ink-200
              bg-surface
              p-5
              shadow-xl
            "
          >
            <DatePickerWithRange
              value={range}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}