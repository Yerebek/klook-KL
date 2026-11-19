import { useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import {
  Activity,
  ActivityCategory,
  CATEGORIES,
  CURRENCY_RATES,
  CartItem,
  CurrencyCode,
  KL_ACTIVITIES,
  SortOption,
} from './data/klActivities';
import { ActivityCard } from './components/ActivityCard';
import { ActivityModal } from './components/ActivityModal';
import { BookingDrawer } from './components/BookingDrawer';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { TravelGuideSection } from './components/TravelGuideSection';

export default function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<ActivityCategory>('All experiences');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [currency, setCurrency] = useState<CurrencyCode>('SGD');

  const [instantOnly, setInstantOnly] = useState(false);
  const [freeCancelOnly, setFreeCancelOnly] = useState(false);
  const [klPassOnly, setKlPassOnly] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredActivities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = KL_ACTIVITIES.filter((item) => {
      if (
        selectedCategory !== 'All experiences' &&
        item.category !== selectedCategory
      ) {
        return false;
      }
      if (instantOnly && !item.instantConfirmation) return false;
      if (freeCancelOnly && !item.freeCancellation) return false;
      if (klPassOnly && !item.klPassEligible) return false;

      if (query) {
        const haystack = `${item.title} ${item.category} ${item.district} ${item.summary}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });

    const sorted = [...list];
    switch (sortBy) {
      case 'popular':
        sorted.sort((a, b) => b.bookedCountNumeric - a.bookedCountNumeric);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.priceSgd - b.priceSgd);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.priceSgd - a.priceSgd);
        break;
    }

    return sorted;
  }, [
    selectedCategory,
    searchQuery,
    sortBy,
    instantOnly,
    freeCancelOnly,
    klPassOnly,
  ]);

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (
    newItem: CartItem,
    openDrawerImmediately: boolean
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.cartItemId === newItem.cartItemId
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          adults: updated[existingIndex].adults + newItem.adults,
          children: updated[existingIndex].children + newItem.children,
        };
        return updated;
      }
      return [...prev, newItem];
    });
    if (openDrawerImmediately) {
      setIsCartOpen(true);
    }
  };

  const handleQuickBook = (activity: Activity) => {
    const defaultPkg = activity.packages[0];
    if (!defaultPkg) {
      setActiveActivity(activity);
      return;
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDate = tomorrow.toISOString().split('T')[0];

    handleAddToCart(
      {
        cartItemId: `${activity.id}-${defaultPkg.id}-${defaultDate}`,
        activity,
        packageId: defaultPkg.id,
        packageName: defaultPkg.name,
        date: defaultDate,
        adults: 1,
        children: 0,
        adultPriceSgd: defaultPkg.adultPriceSgd,
        childPriceSgd: defaultPkg.childPriceSgd,
      },
      true
    );
  };

  const handleUpdateGuests = (
    cartItemId: string,
    field: 'adults' | 'children',
    delta: number
  ) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId !== cartItemId) return item;
        const min = field === 'adults' ? 1 : 0;
        return {
          ...item,
          [field]: Math.max(min, item[field] + delta),
        };
      })
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleResetFilters = () => {
    setSelectedCategory('All experiences');
    setSearchQuery('');
    setInstantOnly(false);
    setFreeCancelOnly(false);
    setKlPassOnly(false);
    setSortBy('popular');
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('kl-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleJumpToGuide = () => {
    const el = document.getElementById('kl-travel-guide');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={setSelectedCategory}
        onJumpToGuide={handleJumpToGuide}
      />

      <main>
        <HeroBanner
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleScrollToCatalog}
          totalActivitiesCount={KL_ACTIVITIES.length}
        />

        {/* Catalog & Filter Section */}
        <section
          id="kl-catalog"
          className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
        >
          {/* Section heading + currency switcher */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-900">
                Top activities in Kuala Lumpur
              </h2>
              <p className="mt-1 text-sm text-neutral-500 tabular-nums">
                Showing {filteredActivities.length} of {KL_ACTIVITIES.length} experiences
                {wishlistIds.length > 0 && ` · ${wishlistIds.length} saved`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="catalog-currency" className="text-xs text-neutral-500">
                Currency
              </label>
              <select
                id="catalog-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="h-9 cursor-pointer rounded-lg border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-800 focus:border-[#FF5B00] focus:outline-none"
              >
                {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((code) => (
                  <option key={code} value={code}>
                    {CURRENCY_RATES[code].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Klook-style Category Tab Bar */}
          <div
            role="tablist"
            aria-label="Activity categories"
            className="no-scrollbar mt-5 flex items-center gap-1 overflow-x-auto border-b border-neutral-200"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative cursor-pointer px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#FF5B00]'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {category}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#FF5B00]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Filter & Sort Toolbar */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 pr-1 text-xs font-medium text-neutral-500">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters:
              </span>

              <button
                type="button"
                aria-pressed={instantOnly}
                onClick={() => setInstantOnly((v) => !v)}
                className={`min-h-[36px] cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  instantOnly
                    ? 'border-[#FF5B00] bg-[#FFF3EB] text-[#FF5B00]'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                }`}
              >
                Instant confirmation
              </button>

              <button
                type="button"
                aria-pressed={freeCancelOnly}
                onClick={() => setFreeCancelOnly((v) => !v)}
                className={`min-h-[36px] cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  freeCancelOnly
                    ? 'border-[#FF5B00] bg-[#FFF3EB] text-[#FF5B00]'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                }`}
              >
                Free cancellation
              </button>

              <button
                type="button"
                aria-pressed={klPassOnly}
                onClick={() => setKlPassOnly((v) => !v)}
                className={`min-h-[36px] cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  klPassOnly
                    ? 'border-[#FF5B00] bg-[#FFF3EB] text-[#FF5B00]'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                }`}
              >
                KL Pass eligible
              </button>

              {(instantOnly ||
                freeCancelOnly ||
                klPassOnly ||
                searchQuery ||
                selectedCategory !== 'All experiences') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="cursor-pointer px-2 py-1 text-xs font-semibold text-neutral-500 underline underline-offset-4 hover:text-neutral-900 whitespace-nowrap shrink-0"
                >
                  Reset all
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-activities" className="text-xs text-neutral-500 whitespace-nowrap">
                Sort by
              </label>
              <select
                id="sort-activities"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-9 cursor-pointer rounded-lg border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-800 focus:border-[#FF5B00] focus:outline-none"
              >
                <option value="popular">Most popular</option>
                <option value="rating">Top rated</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
              </select>
            </div>
          </div>

          {/* Activity Grid */}
          {filteredActivities.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  currency={currency}
                  isWishlisted={wishlistIds.includes(activity.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onSelect={setActiveActivity}
                  onQuickBook={handleQuickBook}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-neutral-200 bg-[#F7F8FA] px-6 py-14 text-center">
              <p className="font-display text-lg font-bold text-neutral-900">
                No Kuala Lumpur activities match these filters
              </p>
              <p className="mt-1.5 text-sm text-neutral-600">
                Try clearing your search term or switching back to all categories.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-5 cursor-pointer rounded-xl bg-[#FF5B00] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E04E00]"
              >
                Show all activities
              </button>
            </div>
          )}
        </section>

        <TravelGuideSection
          currency={currency}
          onCurrencyChange={setCurrency}
        />
      </main>

      <ActivityModal
        activity={activeActivity}
        currency={currency}
        onClose={() => setActiveActivity(null)}
        onAddToCart={handleAddToCart}
      />

      <BookingDrawer
        isOpen={isCartOpen}
        items={cartItems}
        currency={currency}
        onClose={() => setIsCartOpen(false)}
        onUpdateGuests={handleUpdateGuests}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
