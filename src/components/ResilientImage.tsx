import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 via-neutral-50 to-orange-50/40 p-4 text-center text-neutral-500 ${className}`}
        role="img"
        aria-label={alt}
      >
        <MapPin className="mb-2 h-6 w-6 text-[#FF5B00]/70" strokeWidth={1.75} />
        {fallbackTitle && (
          <span className="max-w-[18ch] text-xs font-medium text-neutral-600">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
