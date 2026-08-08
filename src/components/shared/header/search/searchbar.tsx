"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { DateRange } from "react-day-picker";

import { LocationSearch } from "./location-search";
import { DateSearch } from "./date-search";
import { GuestSearch } from "./guest-search";
import { SearchButton } from "./search-button";
import { SearchOverlay } from "./search-overlay";

import { toValidDate } from "@/lib/utils";
import { DEFAULT_GUESTS } from "./search-constants";
import type {
  ActiveSearchPanel,
  GuestState,
  SearchBarProps,
} from "./search-types";

export function SearchBar({
  initialLocation = "",
  initialAdults,
  initialChildren,
  initialInfants,
  initialGuests,
  initialCheckIn,
  initialCheckOut,
}: SearchBarProps) {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);

  /*
   * ------------------------------------------------------------
   * SEARCH PANEL
   * ------------------------------------------------------------
   */

  const [activePanel, setActivePanel] =
    useState<ActiveSearchPanel>(null);

  /*
   * ------------------------------------------------------------
   * LOCATION
   * ------------------------------------------------------------
   */

  const [location, setLocation] =
    useState<string>(initialLocation);

  /*
   * ------------------------------------------------------------
   * DATES
   * ------------------------------------------------------------
   */

  const [range, setRange] =
    useState<DateRange | undefined>(() => ({
      from: toValidDate(initialCheckIn),
      to: toValidDate(initialCheckOut),
    }));

  /*
   * ------------------------------------------------------------
   * GUESTS
   * ------------------------------------------------------------
   */

  const [guests, setGuests] =
    useState<GuestState>(() => ({
      adults: Number(
        initialAdults ??
          initialGuests ??
          DEFAULT_GUESTS.adults
      ),

      children: Number(
        initialChildren ??
          DEFAULT_GUESTS.children
      ),

      infants: Number(
        initialInfants ??
          DEFAULT_GUESTS.infants
      ),
    }));

  /*
   * ------------------------------------------------------------
   * TOTAL GUESTS
   * ------------------------------------------------------------
   */

  const totalGuests = useMemo(() => {
    return (
      guests.adults +
      guests.children +
      guests.infants
    );
  }, [guests]);

  /*
   * ------------------------------------------------------------
   * PANEL CONTROL
   * ------------------------------------------------------------
   */

  const openPanel = (
    panel: Exclude<ActiveSearchPanel, null>
  ) => {
    setActivePanel(panel);
  };

  const closePanel = () => {
    setActivePanel(null);
  };

  /*
   * ------------------------------------------------------------
   * CLOSE WHEN CLICKING OUTSIDE
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const handlePointerDown = (
      event: PointerEvent
    ) => {
      if (!containerRef.current) {
        return;
      }

      const target = event.target as Node;

      if (
        !containerRef.current.contains(target)
      ) {
        closePanel();
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * SEARCH SUBMISSION
   * ------------------------------------------------------------
   */

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const params = new URLSearchParams();

    /*
     * Location
     */

    if (location.trim()) {
      params.set(
        "location",
        location.trim()
      );
    }

    /*
     * Check-in
     */

    if (range?.from) {
      params.set(
        "checkIn",
        range.from
          .toISOString()
          .split("T")[0]
      );
    }

    /*
     * Check-out
     */

    if (range?.to) {
      params.set(
        "checkOut",
        range.to
          .toISOString()
          .split("T")[0]
      );
    }

    /*
     * Guests
     */

    params.set(
      "guests",
      String(totalGuests)
    );

    params.set(
      "adults",
      String(guests.adults)
    );

    params.set(
      "children",
      String(guests.children)
    );

    params.set(
      "infants",
      String(guests.infants)
    );

    /*
     * Close any open search panel.
     */

    closePanel();

    /*
     * Navigate using Next.js router.
     *
     * This is preferable to:
     * window.location.href
     *
     * because it keeps navigation inside
     * the Next.js application.
     */

    router.push(
      `/listings?${params.toString()}`
    );
  };

  /*
   * ------------------------------------------------------------
   * RENDER
   * ------------------------------------------------------------
   */

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      {/*
       * Background overlay.
       *
       * The overlay sits behind the active panel
       * but above the page content.
       */}

      <SearchOverlay
        open={activePanel !== null}
        onClose={closePanel}
      />

      <form
        onSubmit={handleSubmit}
        className="
          relative
          z-50
          rounded-[32px]
          border
          border-ink-200
          bg-surface
          p-2
          shadow-sm
          md:rounded-full
          md:p-1.5
        "
      >
        {/*
         * ======================================================
         * MOBILE SEARCH
         * ======================================================
         */}

        <div className="space-y-2 md:hidden">
          <LocationSearch
            value={location}
            onChange={setLocation}
            open={
              activePanel === "where"
            }
            onOpen={() =>
              openPanel("where")
            }
            onClose={closePanel}
          />

          <DateSearch
            range={range}
            onChange={setRange}
            open={
              activePanel === "when"
            }
            onOpen={() =>
              openPanel("when")
            }
            onClose={closePanel}
          />

          <GuestSearch
            guests={guests}
            onChange={setGuests}
            open={
              activePanel === "who"
            }
            onOpen={() =>
              openPanel("who")
            }
            onClose={closePanel}
          />

          <div className="pt-2">
            <SearchButton mobile />
          </div>
        </div>

        {/*
         * ======================================================
         * DESKTOP SEARCH
         * ======================================================
         */}

        <div
          className="
            hidden
            items-center
            gap-1
            md:grid
            md:grid-cols-[1.5fr_1.5fr_1fr_auto]
          "
        >
          <LocationSearch
            value={location}
            onChange={setLocation}
            open={
              activePanel === "where"
            }
            onOpen={() =>
              openPanel("where")
            }
            onClose={closePanel}
          />

          <DateSearch
            range={range}
            onChange={setRange}
            open={
              activePanel === "when"
            }
            onOpen={() =>
              openPanel("when")
            }
            onClose={closePanel}
          />

          <GuestSearch
            guests={guests}
            onChange={setGuests}
            open={
              activePanel === "who"
            }
            onOpen={() =>
              openPanel("who")
            }
            onClose={closePanel}
          />

          <SearchButton />
        </div>

        {/*
         * ======================================================
         * FORM VALUES
         *
         * These are useful for progressive enhancement,
         * browser inspection and future server actions.
         * ======================================================
         */}

        <input
          type="hidden"
          name="location"
          value={location}
        />

        <input
          type="hidden"
          name="guests"
          value={totalGuests}
        />

        <input
          type="hidden"
          name="adults"
          value={guests.adults}
        />

        <input
          type="hidden"
          name="children"
          value={guests.children}
        />

        <input
          type="hidden"
          name="infants"
          value={guests.infants}
        />

        <input
          type="hidden"
          name="checkIn"
          value={
            range?.from
              ? range.from
                  .toISOString()
                  .split("T")[0]
              : ""
          }
        />

        <input
          type="hidden"
          name="checkOut"
          value={
            range?.to
              ? range.to
                  .toISOString()
                  .split("T")[0]
              : ""
          }
        />
      </form>
    </div>
  );
}

