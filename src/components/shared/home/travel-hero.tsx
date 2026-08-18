"use client";

import { SearchBar } from "@/components/shared/header/search";
import { TravelVideo } from "./travel-video";

type TravelHeroProps = {
  initialLocation?: string;
  initialGuests?: string;
  initialAdults?: string;
  initialChildren?: string;
  initialInfants?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
};

export function TravelHero({
  initialLocation,
  initialGuests,
  initialAdults,
  initialChildren,
  initialInfants,
  initialCheckIn,
  initialCheckOut,
}: TravelHeroProps) {
  return (
    <section
      className="
        relative
        isolate
        min-h-[680px]
        overflow-visible
        sm:min-h-[720px]
        lg:min-h-[calc(100vh-80px)]
      "
    >
      {/* =====================================================
          VIDEO BACKGROUND
          ===================================================== */}

      <TravelVideo
        desktopSources={[
          "/videos/hero-coast.mp4",
          "/videos/wikendia-hero.mp4",
          "/videos/hero-wildlife.mp4",
          "/videos/hero-nature.mp4",
          "/videos/hero-mountains.mp4",
          "/videos/hero-stay.mp4",
        ]}
        mobileSources={[
          "/videos/mobile/hero-coast.mp4",
          "/videos/mobile/wikendia-hero.mp4",
          "/videos/mobile/hero-wildlife.mp4",
          "/videos/mobile/hero-nature.mp4",
          "/videos/mobile/hero-mountains.mp4",
          "/videos/mobile/hero-stay.mp4",
        ]}
        poster="/images/hero/wikendia-hero-poster.jpg"
      />

      {/* =====================================================
          HERO CONTENT
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[680px]
          max-w-7xl
          flex-col
          px-4
          pb-10
          pt-8
          sm:min-h-[720px]
          sm:px-6
          sm:pt-10
          lg:min-h-[calc(100vh-80px)]
          lg:px-8
          lg:pb-14
          lg:pt-10
        "
      >
        {/* ===================================================
            MARKETING COPY
            =================================================== */}

        <div
          className="
            mx-auto
            w-full
            max-w-4xl
            pt-6
            text-center
            sm:pt-8
            lg:pt-10
          "
        >
          <p
            className="
              mb-3
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-white/85
              sm:mb-4
              sm:text-xs
            "
          >
            Discover • Stay • Experience
          </p>

          <h1
            className="
              mx-auto
              max-w-4xl
              text-4xl
              font-bold
              leading-[1.02]
              tracking-tight
              text-white
              drop-shadow-xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            More than

            <span className="block text-white/90">
               a stay...
            </span>
          </h1>
        </div>

        {/* ===================================================
            SEARCH BAR
            =================================================== */}

        <div
          className="
            relative
            z-30
            mx-auto
            mt-10
            w-full
            max-w-5xl
            sm:mt-12
            lg:mt-14
          "
        >
          <SearchBar
            initialLocation={initialLocation}
            initialGuests={initialGuests}
            initialAdults={initialAdults}
            initialChildren={initialChildren}
            initialInfants={initialInfants}
            initialCheckIn={initialCheckIn}
            initialCheckOut={initialCheckOut}
          />
        </div>
      </div>
    </section>
  );
}