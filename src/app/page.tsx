import Link from "next/link";

import { Navbar } from "@/components/shared/header/navbar/navbar";
import { TravelHero } from "@/components/shared/home";

type HomePageProps = {
  searchParams: Promise<{
    location?: string;
    guests?: string;
    adults?: string;
    children?: string;
    infants?: string;
    checkIn?: string;
    checkOut?: string;
  }>;
};

export default async function HomePage({
  searchParams,
}: HomePageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main>
        <TravelHero
          initialLocation={
            params.location
          }
          initialGuests={
            params.guests
          }
          initialAdults={
            params.adults
          }
          initialChildren={
            params.children
          }
          initialInfants={
            params.infants
          }
          initialCheckIn={
            params.checkIn
          }
          initialCheckOut={
            params.checkOut
          }
        />

        <section
          className="
            px-4
            py-16
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              mx-auto
              max-w-7xl
            "
          >
            <div
              className="
                flex
                items-end
                justify-between
                gap-4
              "
            >
              <div>
                <h2
                  className="
                    text-2xl
                    font-bold
                    text-ink-900
                  "
                >
                  Explore stays
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    text-ink-600
                  "
                >
                  More than a Stay.
                 </p>
              </div>

              <Link
                href="/listings"
                className="
                  hidden
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-brand-500
                  hover:bg-brand-50
                  sm:inline-flex
                "
              >
                View all
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}