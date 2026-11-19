import { Heart, Star } from 'lucide-react';
import { Activity, CurrencyCode, formatPrice } from '../data/klActivities';
import { ResilientImage } from './ResilientImage';

interface ActivityCardProps {
  activity: Activity;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onSelect: (activity: Activity) => void;
  onQuickBook: (activity: Activity) => void;
}

export function ActivityCard({
  activity,
  currency,
  isWishlisted,
  onToggleWishlist,
  onSelect,
  onQuickBook,
}: ActivityCardProps) {
  const policyText = [
    activity.instantConfirmation ? 'Instant confirmation' : null,
    activity.freeCancellation ? 'Free cancellation' : null,
    activity.klPassEligible ? 'KL Pass' : null,
  ]
    .filter(Boolean)
    .slice(0, 2)
    .join(' · ');

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200/90 bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* 4:3 Image frame */}
      <div
        onClick={() => onSelect(activity)}
        className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-neutral-100"
      >
        <ResilientImage
          src={activity.image}
          alt={activity.title}
          fallbackTitle={activity.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Wishlist toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(activity.id);
          }}
          aria-label={
            isWishlisted
              ? `Remove ${activity.title} from wishlist`
              : `Save ${activity.title} to wishlist`
          }
          aria-pressed={isWishlisted}
          className="absolute right-2.5 top-2.5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm backdrop-blur-xs transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-[#FF5B00]"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? 'fill-[#FF5B00] text-[#FF5B00]' : 'text-neutral-700'
            }`}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div
          onClick={() => onSelect(activity)}
          className="cursor-pointer"
        >
          {/* Clean unboxed category & location metadata */}
          <p className="truncate text-xs text-neutral-500">
            {activity.category} <span aria-hidden="true">·</span> {activity.district}
          </p>

          {/* Activity title */}
          <h3 className="mt-1.5 line-clamp-2 min-h-[2.75rem] font-display text-[15px] font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-[#FF5B00]">
            {activity.title}
          </h3>

          {/* Rating & booking volume */}
          <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-600 tabular-nums">
            <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-neutral-900">
              {activity.rating.toFixed(1)}
            </span>
            <span className="text-neutral-500">
              ({activity.reviewCount.toLocaleString()})
            </span>
            <span aria-hidden="true" className="text-neutral-300">
              ·
            </span>
            <span className="truncate text-neutral-500">{activity.bookedText}</span>
          </div>

          {/* Policy metadata */}
          <p className="mt-1.5 truncate text-xs text-emerald-700">
            {policyText || activity.duration}
          </p>
        </div>

        {/* Aligned pricing baseline & prominent one-click CTA */}
        <div className="mt-4 border-t border-neutral-100 pt-3">
          <div className="flex items-baseline justify-between gap-2 tabular-nums">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-neutral-500">From</span>
              <span className="font-display text-lg font-bold text-neutral-900">
                {formatPrice(activity.priceSgd, currency)}
              </span>
              {activity.originalPriceSgd && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(activity.originalPriceSgd, currency)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => onSelect(activity)}
              className="cursor-pointer text-xs font-medium text-neutral-500 hover:text-neutral-900 hover:underline whitespace-nowrap shrink-0"
            >
              Details
            </button>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickBook(activity);
            }}
            className="mt-3 flex min-h-[42px] w-full cursor-pointer items-center justify-center rounded-xl bg-[#FF5B00] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors duration-150 hover:bg-[#E04E00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5B00] whitespace-nowrap"
          >
            Book now with one click
          </button>
        </div>
      </div>
    </article>
  );
}
