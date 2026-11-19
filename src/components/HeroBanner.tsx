import { Search, X } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/klActivities';
import { ResilientImage } from './ResilientImage';

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  totalActivitiesCount: number;
}

export function HeroBanner({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  totalActivitiesCount,
}: HeroBannerProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section id="top" className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 pt-4 sm:px-6 lg:px-8">
        {/* Clean unboxed breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-3 flex flex-wrap items-center gap-2 text-xs text-neutral-500"
        >
          <a href="#top" className="hover:text-[#FF5B00] transition-colors">
            Home
          </a>
          <span aria-hidden="true">/</span>
          <a href="#kl-catalog" className="hover:text-[#FF5B00] transition-colors">
            Malaysia
          </a>
          <span aria-hidden="true">/</span>
          <a href="#kl-catalog" className="hover:text-[#FF5B00] transition-colors">
            Kuala Lumpur
          </a>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-neutral-800">Things to do</span>
        </nav>

        {/* Hero banner frame */}
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900">
          <div className="aspect-[16/9] max-h-[420px] w-full">
            <ResilientImage
              src={HERO_BANNER_IMAGE}
              alt="Petronas Twin Towers and Kuala Lumpur skyline illuminated at twilight above KLCC Park"
              fallbackTitle="Kuala Lumpur Skyline"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Measured scrim for crisp 4.5:1 text legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20"
          />

          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-10">
            <div className="max-w-2xl">
              <p className="mb-1.5 text-xs font-medium tracking-wide text-white/85">
                Malaysia · Destination guide · Singapore Dollars (SGD)
              </p>
              <h1
                className="font-display font-bold tracking-tight text-white [text-wrap:balance]"
                style={{ fontSize: 'clamp(1.85rem, 3.6vw, 3rem)', lineHeight: 1.12 }}
              >
                Things to do in Kuala Lumpur
              </h1>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
                Book skip-the-line Petronas Twin Towers tickets, Batu Caves cultural tours, Sunway Lagoon passes, and KLIA Ekspres rail transfers with instant mobile e-vouchers.
              </p>

              {/* Integrated Hero Search */}
              <form
                onSubmit={handleSubmit}
                className="mt-5 flex max-w-xl items-center gap-2 rounded-xl bg-white p-1.5 shadow-lg"
              >
                <div className="relative flex flex-1 items-center">
                  <Search
                    className="pointer-events-none absolute left-3 h-4 w-4 text-neutral-400"
                    strokeWidth={2}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search Petronas Towers, Batu Caves, Sunway Lagoon..."
                    aria-label="Search Kuala Lumpur activities"
                    className="h-10 w-full rounded-lg bg-transparent pl-9 pr-8 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      aria-label="Clear search query"
                      className="absolute right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="h-10 cursor-pointer rounded-lg bg-[#FF5B00] px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#E04E00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5B00] whitespace-nowrap shrink-0"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 4-column destination quick-facts strip below hero */}
        <div className="mt-4 grid grid-cols-2 gap-4 rounded-xl border border-neutral-200/80 bg-[#F7F8FA] px-5 py-4 lg:grid-cols-4 lg:gap-6">
          <div>
            <p className="text-xs text-neutral-500">Featured catalog</p>
            <p className="mt-0.5 font-display text-sm font-semibold text-neutral-900 tabular-nums">
              {totalActivitiesCount} curated experiences
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Airport rail transit</p>
            <p className="mt-0.5 font-display text-sm font-semibold text-neutral-900 tabular-nums">
              28 mins KLIA to KL Sentral
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Best months to visit</p>
            <p className="mt-0.5 font-display text-sm font-semibold text-neutral-900">
              May – Jul &amp; Dec – Feb
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Voucher redemption</p>
            <p className="mt-0.5 font-display text-sm font-semibold text-neutral-900">
              Instant mobile QR entry
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
