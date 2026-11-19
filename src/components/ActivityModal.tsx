import { useEffect, useState } from 'react';
import {
  Calendar,
  Check,
  Clock,
  MapPin,
  Minus,
  Plus,
  Star,
  X,
} from 'lucide-react';
import {
  Activity,
  CartItem,
  CurrencyCode,
  formatPrice,
} from '../data/klActivities';
import { ResilientImage } from './ResilientImage';

interface ActivityModalProps {
  activity: Activity | null;
  currency: CurrencyCode;
  onClose: () => void;
  onAddToCart: (item: CartItem, openDrawerImmediately: boolean) => void;
}

function getDefaultTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export function ActivityModal({
  activity,
  currency,
  onClose,
  onAddToCart,
}: ActivityModalProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [date, setDate] = useState<string>(getDefaultTomorrowDate);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  useEffect(() => {
    if (activity) {
      setSelectedPackageId(activity.packages[0]?.id ?? '');
      setAdults(2);
      setChildren(0);
      setDate(getDefaultTomorrowDate());
    }
  }, [activity]);

  useEffect(() => {
    if (!activity) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activity, onClose]);

  if (!activity) return null;

  const activePackage =
    activity.packages.find((pkg) => pkg.id === selectedPackageId) ??
    activity.packages[0];

  const totalSgd =
    adults * activePackage.adultPriceSgd + children * activePackage.childPriceSgd;

  const handleAction = (openDrawerImmediately: boolean) => {
    const newItem: CartItem = {
      cartItemId: `${activity.id}-${activePackage.id}-${date}`,
      activity,
      packageId: activePackage.id,
      packageName: activePackage.name,
      date,
      adults,
      children,
      adultPriceSgd: activePackage.adultPriceSgd,
      childPriceSgd: activePackage.childPriceSgd,
    };
    onAddToCart(newItem, openDrawerImmediately);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="activity-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky modal header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white/95 px-5 py-3.5 backdrop-blur-sm sm:px-6">
          <div className="min-w-0 pr-4">
            <p className="truncate text-xs text-neutral-500">
              {activity.category} <span aria-hidden="true">·</span> {activity.district}
            </p>
            <h2
              id="activity-modal-title"
              className="truncate font-display text-lg font-bold text-neutral-900"
            >
              {activity.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close activity details"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-[#FF5B00]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 2-Column Activity Details & Contiguous Purchase Module */}
        <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-12 lg:items-start">
          {/* Left column: Photography + Highlights + Logistics */}
          <div className="space-y-5 lg:col-span-7">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-100">
              <ResilientImage
                src={activity.image}
                alt={activity.title}
                fallbackTitle={activity.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600 tabular-nums">
              <span className="inline-flex items-center gap-1 font-semibold text-neutral-900">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {activity.rating.toFixed(1)}
              </span>
              <span>{activity.reviewCount.toLocaleString()} reviews</span>
              <span aria-hidden="true">·</span>
              <span>{activity.bookedText}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-neutral-400" />
                {activity.duration}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-neutral-700">
              {activity.summary}
            </p>

            <div>
              <h3 className="font-display text-sm font-bold text-neutral-900">
                Highlights
              </h3>
              <ul className="mt-2.5 space-y-2">
                {activity.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-neutral-700"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#FF5B00]"
                      strokeWidth={2.25}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <h3 className="font-display text-sm font-bold text-neutral-900">
                What&apos;s included
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-neutral-600">
                {activity.included.map((inc) => (
                  <li key={inc}>• {inc}</li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-xs text-neutral-500">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" />
                <span>Meeting / Redemption: {activity.meetingPoint}</span>
              </p>
            </div>
          </div>

          {/* Right column: Contiguous Purchase Module */}
          <div className="rounded-xl border border-neutral-200 bg-[#F7F8FA] p-5 lg:sticky lg:top-20 lg:col-span-5">
            <h3 className="font-display text-base font-bold text-neutral-900">
              Select package &amp; date
            </h3>

            {/* Package options */}
            <div className="mt-3 space-y-2.5">
              {activity.packages.map((pkg) => {
                const isSelected = pkg.id === activePackage.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`w-full cursor-pointer rounded-xl border p-3.5 text-left transition-colors ${
                      isSelected
                        ? 'border-[#FF5B00] bg-white ring-1 ring-[#FF5B00]'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-neutral-900">
                        {pkg.name}
                      </span>
                      <span className="shrink-0 font-display text-sm font-bold text-[#FF5B00] tabular-nums">
                        {formatPrice(pkg.adultPriceSgd, currency)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                      {pkg.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Date picker */}
            <div className="mt-4">
              <label
                htmlFor="activity-date"
                className="mb-1.5 block text-xs font-semibold text-neutral-700"
              >
                Participation date
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  id="activity-date"
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-sm text-neutral-900 focus:border-[#FF5B00] focus:outline-none"
                />
              </div>
            </div>

            {/* Guest quantity steppers */}
            <div className="mt-4 space-y-3 rounded-xl border border-neutral-200 bg-white p-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-900">Adult</p>
                  <p className="text-xs text-neutral-500 tabular-nums">
                    {formatPrice(activePackage.adultPriceSgd, currency)} / pax
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setAdults((v) => Math.max(1, v - 1))}
                    aria-label="Decrease adult count"
                    disabled={adults <= 1}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-5 text-center text-sm font-semibold tabular-nums">
                    {adults}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAdults((v) => Math.min(20, v + 1))}
                    aria-label="Increase adult count"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                <div>
                  <p className="text-sm font-medium text-neutral-900">Child</p>
                  <p className="text-xs text-neutral-500 tabular-nums">
                    {formatPrice(activePackage.childPriceSgd, currency)} / pax
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setChildren((v) => Math.max(0, v - 1))}
                    aria-label="Decrease child count"
                    disabled={children <= 0}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-5 text-center text-sm font-semibold tabular-nums">
                    {children}
                  </span>
                  <button
                    type="button"
                    onClick={() => setChildren((v) => Math.min(20, v + 1))}
                    aria-label="Increase child count"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Total and booking CTAs */}
            <div className="mt-5 border-t border-neutral-200 pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-neutral-600">Total amount</span>
                <span className="font-display text-2xl font-bold text-neutral-900 tabular-nums">
                  {formatPrice(totalSgd, currency)}
                </span>
              </div>
              <p className="mt-1 text-xs text-emerald-700">
                {activity.instantConfirmation
                  ? 'Instant confirmation · Mobile QR e-voucher'
                  : 'Confirmed within 24 hours'}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleAction(false)}
                  className="min-h-[44px] cursor-pointer rounded-xl border border-[#FF5B00] bg-white px-4 py-2.5 text-sm font-semibold text-[#FF5B00] transition-colors hover:bg-[#FFF3EB] focus-visible:outline-2 focus-visible:outline-[#FF5B00] whitespace-nowrap"
                >
                  Add to bag
                </button>
                <button
                  type="button"
                  onClick={() => handleAction(true)}
                  className="min-h-[44px] cursor-pointer rounded-xl bg-[#FF5B00] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E04E00] focus-visible:outline-2 focus-visible:outline-[#FF5B00] whitespace-nowrap"
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
