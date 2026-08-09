import Link from "next/link";

import { SearchBar } from "@/components/shared/header/search";
import { Navbar } from "@/components/shared/header/navbar";

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
    <div className="min-h-screen bg-background text-ink-900">
      <Navbar />

      <main>
        <section
          className="
            relative
            overflow-visible
            bg-surface
            px-4
            pb-16
            pt-12
            sm:px-6
            lg:px-8
            lg:pb-24
            lg:pt-20
          "
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h1
                className="
                  text-4xl
                  font-bold
                  tracking-tight
                  text-ink-900
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Find your next
                <span className="text-brand-500">
                  {" "}
                  perfect stay
                </span>
              </h1>

              <p
                className="
                  mx-auto
                  mt-5
                  max-w-2xl
                  text-base
                  leading-7
                  text-ink-600
                  sm:text-lg
                "
              >
                Discover curated stays and book your next
                getaway with Wikendia.
              </p>
            </div>

            <div className="relative z-30 mx-auto mt-10 w-full max-w-5xl">
              <SearchBar
                initialLocation={params.location}
                initialGuests={params.guests}
                initialAdults={params.adults}
                initialChildren={params.children}
                initialInfants={params.infants}
                initialCheckIn={params.checkIn}
                initialCheckOut={params.checkOut}
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-ink-900">
                  Explore stays
                </h2>

                <p className="mt-2 text-sm text-ink-600">
                  Find places worth staying in.
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
                  transition
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