import { useState } from 'react';
import {
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { CartItem, CurrencyCode, formatPrice } from '../data/klActivities';
import { ResilientImage } from './ResilientImage';

interface BookingDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  currency: CurrencyCode;
  onClose: () => void;
  onUpdateGuests: (
    cartItemId: string,
    field: 'adults' | 'children',
    delta: number
  ) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export function BookingDrawer({
  isOpen,
  items,
  currency,
  onClose,
  onUpdateGuests,
  onRemoveItem,
  onClearCart,
}: BookingDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [confirmedTotalSgd, setConfirmedTotalSgd] = useState(0);

  if (!isOpen) return null;

  const subtotalSgd = items.reduce(
    (sum, item) =>
      sum +
      item.adults * item.adultPriceSgd +
      item.children * item.childPriceSgd,
    0
  );

  const discountSgd = promoApplied ? subtotalSgd * 0.1 : 0;
  const finalTotalSgd = Math.max(0, subtotalSgd - discountSgd);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'KL10' || code === 'KLOOK10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Try promo code KL10 for 10% off.');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const ref = `KLK-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedCount(items.length);
    setConfirmedTotalSgd(finalTotalSgd);
    setConfirmedRef(ref);
    onClearCart();
  };

  const handleCloseDrawer = () => {
    setConfirmedRef(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Booking bag"
      onClick={handleCloseDrawer}
    >
      <div
        className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#FF5B00]" />
            <h2 className="font-display text-lg font-bold text-neutral-900">
              Booking bag
            </h2>
            {items.length > 0 && (
              <span className="text-sm text-neutral-500 tabular-nums">
                ({items.length})
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close booking bag"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto p-5">
          {confirmedRef ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" />
                <div>
                  <h3 className="font-display text-base font-bold text-neutral-900">
                    Booking #{confirmedRef} Confirmed
                  </h3>
                  <p className="mt-1 text-sm text-neutral-700">
                    Instant mobile QR e-vouchers for {confirmedCount}{' '}
                    {confirmedCount === 1 ? 'activity' : 'activities'} have been
                    prepared for{' '}
                    <span className="font-medium">
                      {travelerEmail || 'your traveler account'}
                    </span>
                    .
                  </p>
                  <div className="mt-4 border-t border-emerald-200 pt-3 text-sm tabular-nums">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Total paid</span>
                      <span className="font-bold text-neutral-900">
                        {formatPrice(confirmedTotalSgd, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="mt-5 w-full cursor-pointer rounded-xl bg-[#FF5B00] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E04E00]"
              >
                Continue exploring Kuala Lumpur
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <p className="mt-4 font-display text-base font-semibold text-neutral-900">
                Your booking bag is empty
              </p>
              <p className="mt-1 max-w-[26ch] text-sm text-neutral-500">
                Select any Kuala Lumpur attraction or tour to add tickets and build your itinerary.
              </p>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="mt-5 cursor-pointer rounded-xl bg-[#FF5B00] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E04E00]"
              >
                Browse activities
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const lineTotal =
                  item.adults * item.adultPriceSgd +
                  item.children * item.childPriceSgd;
                return (
                  <div
                    key={item.cartItemId}
                    className="rounded-xl border border-neutral-200 p-3.5"
                  >
                    <div className="flex gap-3">
                      <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                        <ResilientImage
                          src={item.activity.image}
                          alt={item.activity.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900">
                            {item.activity.title}
                          </h3>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.cartItemId)}
                            aria-label={`Remove ${item.activity.title}`}
                            className="shrink-0 cursor-pointer p-1 text-neutral-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-neutral-500">
                          {item.packageName}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500 tabular-nums">
                          Date: {item.date}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-3">
                      <div className="flex items-center gap-3 text-xs text-neutral-700">
                        <div className="flex items-center gap-1.5">
                          <span>Adult</span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateGuests(item.cartItemId, 'adults', -1)
                            }
                            disabled={item.adults <= 1}
                            aria-label="Decrease adults"
                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center font-semibold tabular-nums">
                            {item.adults}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateGuests(item.cartItemId, 'adults', 1)
                            }
                            aria-label="Increase adults"
                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-neutral-200 hover:bg-neutral-50"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span>Child</span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateGuests(item.cartItemId, 'children', -1)
                            }
                            disabled={item.children <= 0}
                            aria-label="Decrease children"
                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center font-semibold tabular-nums">
                            {item.children}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateGuests(item.cartItemId, 'children', 1)
                            }
                            aria-label="Increase children"
                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-neutral-200 hover:bg-neutral-50"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <span className="font-display text-sm font-bold text-neutral-900 tabular-nums">
                        {formatPrice(lineTotal, currency)}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Promo code */}
              <form
                onSubmit={handleApplyPromo}
                className="rounded-xl border border-neutral-200 bg-[#F7F8FA] p-3.5"
              >
                <label
                  htmlFor="promo-code-input"
                  className="block text-xs font-semibold text-neutral-700"
                >
                  Promo code (use KL10 for 10% off)
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="promo-code-input"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter KL10"
                    className="h-9 flex-1 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-900 focus:border-[#FF5B00] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-9 cursor-pointer rounded-lg border border-neutral-300 bg-white px-3.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="mt-1.5 text-xs text-emerald-700">
                    Code KL10 applied: 10% destination discount active.
                  </p>
                )}
                {promoError && (
                  <p className="mt-1.5 text-xs text-red-600">{promoError}</p>
                )}
              </form>

              {/* Lead traveler details */}
              <form
                id="checkout-form"
                onSubmit={handleCheckout}
                className="space-y-3 rounded-xl border border-neutral-200 p-3.5"
              >
                <p className="text-xs font-semibold text-neutral-700">
                  Lead traveler details (for mobile QR e-vouchers)
                </p>
                <input
                  type="text"
                  required
                  value={travelerName}
                  onChange={(e) => setTravelerName(e.target.value)}
                  placeholder="Full name (as on passport)"
                  aria-label="Lead traveler full name"
                  className="h-9 w-full rounded-lg border border-neutral-200 px-3 text-sm text-neutral-900 focus:border-[#FF5B00] focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={travelerEmail}
                  onChange={(e) => setTravelerEmail(e.target.value)}
                  placeholder="Email address for e-vouchers"
                  aria-label="Lead traveler email"
                  className="h-9 w-full rounded-lg border border-neutral-200 px-3 text-sm text-neutral-900 focus:border-[#FF5B00] focus:outline-none"
                />
              </form>
            </div>
          )}
        </div>

        {/* Drawer footer */}
        {items.length > 0 && !confirmedRef && (
          <div className="border-t border-neutral-200 bg-white p-5">
            <div className="space-y-1.5 text-sm tabular-nums">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalSgd, currency)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promo (KL10)</span>
                  <span>-{formatPrice(discountSgd, currency)}</span>
                </div>
              )}
              <div className="flex items-baseline justify-between pt-1">
                <span className="font-semibold text-neutral-900">Total</span>
                <span className="font-display text-xl font-bold text-[#FF5B00]">
                  {formatPrice(finalTotalSgd, currency)}
                </span>
              </div>
            </div>
            <button
              type="submit"
              form="checkout-form"
              className="mt-4 min-h-[44px] w-full cursor-pointer rounded-xl bg-[#FF5B00] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E04E00] focus-visible:outline-2 focus-visible:outline-[#FF5B00]"
            >
              Confirm booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
