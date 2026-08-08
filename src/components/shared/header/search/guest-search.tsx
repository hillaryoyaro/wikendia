"use client";

import { useState } from "react";

import { SearchItem } from "./search-item";
import { GuestPanel } from "./guest-panel";
import { GuestState } from "./guest-types";


interface Props {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function GuestSearch({
  open,
  onOpen,
  onClose,
}: Props) {
  const [guests, setGuests] =
    useState<GuestState>({
      adults: 1,
      children: 0,
      infants: 0,
    });

  const total =
    guests.adults +
    guests.children +
    guests.infants;

  return (
    <div className="relative">

      <SearchItem
        title="Who"
        value={
          total > 0
            ? `${total} guest${total > 1 ? "s" : ""}`
            : "Add guests"
        }
        onClick={open ? onClose : onOpen}
      />

      {open && (
        <div className="absolute right-0 top-20 z-50">

          <GuestPanel
            guests={guests}
            setGuests={setGuests}
          />

        </div>
      )}
    </div>
  );
}