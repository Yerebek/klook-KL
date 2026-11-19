import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  CURRENCY_RATES,
  CurrencyCode,
  KL_FAQS,
  KL_TRAVEL_TIPS,
} from '../data/klActivities';

interface TravelGuideSectionProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

export function TravelGuideSection({
  currency,
  onCurrencyChange,
}: TravelGuideSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <>
      <section
        id="kl-travel-guide"
        className="border-t border-neutral-200/80 bg-[#F7F8FA] py-12 sm:py-16"
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left column: Travel guide tips */}
            <div className="lg:col-span-6">
              <p className="text-xs font-medium text-[#FF5B00]">
                Kuala Lumpur travel guide
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-neutral-900 [text-wrap:balance]">
                Essential tips before you go
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-600">
                Practical local advice for getting around Malaysia&apos;s capital, timing your observation deck slots, and stretching your SGD budget.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {KL_TRAVEL_TIPS.map((tip, index) => (
                  <div
                    key={tip.title}
                    className="rounded-xl border border-neutral-200/90 bg-white p-4"
                  >
                    <p className="font-display text-xs font-semibold text-neutral-400 tabular-nums">
                      0{index + 1}.
                    </p>
                    <h3 className="mt-1 font-display text-sm font-bold text-neutral-900">
                      {tip.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">
                      {tip.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: Interactive FAQ accordion */}
            <div className="lg:col-span-6">
              <p className="text-xs font-medium text-[#FF5B00]">
                Common questions
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-neutral-900 [text-wrap:balance]">
                Frequently asked questions
              </h2>

              <div className="mt-6 divide-y divide-neutral-200 rounded-xl border border-neutral-200/90 bg-white">
                {KL_FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={faq.question}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqIndex(isOpen ? null : idx)
                        }
                        aria-expanded={isOpen}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-neutral-900 transition-colors hover:text-[#FF5B00]"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#FF5B00]' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-sm leading-relaxed text-neutral-600">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-neutral-200 bg-white py-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <a
              href="#top"
              className="font-display text-xl font-extrabold tracking-tight text-[#FF5B00]"
            >
              klook
            </a>
            <p className="mt-1 text-xs text-neutral-500">
              Kuala Lumpur Destination Guide · Singapore (en-SG) · Instant E-Vouchers
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
            <a href="#kl-catalog" className="hover:text-[#FF5B00]">
              Attractions
            </a>
            <span aria-hidden="true">·</span>
            <a href="#kl-catalog" className="hover:text-[#FF5B00]">
              Day Tours
            </a>
            <span aria-hidden="true">·</span>
            <a href="#kl-travel-guide" className="hover:text-[#FF5B00]">
              Travel Tips
            </a>
            <span aria-hidden="true">·</span>
            <label htmlFor="footer-currency" className="sr-only">
              Display currency
            </label>
            <select
              id="footer-currency"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="h-8 cursor-pointer rounded-lg border border-neutral-200 bg-white px-2.5 text-xs font-medium text-neutral-800 focus:border-[#FF5B00] focus:outline-none"
            >
              {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((code) => (
                <option key={code} value={code}>
                  {CURRENCY_RATES[code].label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </footer>
    </>
  );
}
