import { ShoppingBag } from 'lucide-react';
import { ActivityCategory } from '../data/klActivities';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: ActivityCategory) => void;
  onJumpToGuide: () => void;
}

export function Header({
  cartCount,
  onOpenCart,
  onSelectCategory,
  onJumpToGuide,
}: HeaderProps) {
  const handleNavClick = (category: ActivityCategory) => {
    onSelectCategory(category);
    const catalog = document.getElementById('kl-catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          className="font-display text-2xl font-extrabold tracking-tight text-[#FF5B00] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5B00]"
        >
          klook
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary categories"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-700"
        >
          <button
            type="button"
            onClick={() => handleNavClick('All experiences')}
            className="cursor-pointer py-1 transition-colors hover:text-[#FF5B00] hover:underline hover:underline-offset-8 whitespace-nowrap shrink-0"
          >
            Things to do
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('Attraction tickets')}
            className="cursor-pointer py-1 transition-colors hover:text-[#FF5B00] hover:underline hover:underline-offset-8 whitespace-nowrap shrink-0"
          >
            Attractions
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('Tours & sightseeing')}
            className="cursor-pointer py-1 transition-colors hover:text-[#FF5B00] hover:underline hover:underline-offset-8 whitespace-nowrap shrink-0"
          >
            Tours
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('Theme parks')}
            className="cursor-pointer py-1 transition-colors hover:text-[#FF5B00] hover:underline hover:underline-offset-8 whitespace-nowrap shrink-0"
          >
            Theme parks
          </button>
          <button
            type="button"
            onClick={onJumpToGuide}
            className="cursor-pointer py-1 transition-colors hover:text-[#FF5B00] hover:underline hover:underline-offset-8 whitespace-nowrap shrink-0"
          >
            Travel guide
          </button>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg bg-[#FF5B00] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#E04E00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5B00] whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={2} />
            <span>Booking bag</span>
            <span className="tabular-nums">({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
