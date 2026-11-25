import React from 'react';

const IAGS_BANNER_LIGHT_SRC = '/assets/aistudio/iags-logo-banner-light-v3.png';
const IAGS_BANNER_DARK_SRC = '/assets/aistudio/iags-logo-banner-dark-v3.png';
const IAGS_MARK_LIGHT_SRC = '/assets/aistudio/iags-logo-mark-light-v3.png';
const IAGS_MARK_DARK_SRC = '/assets/aistudio/iags-logo-mark-dark-v3.png';

interface IagsLogoProps {
  variant?: 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const MARK_SIZE_CLASSES: Record<NonNullable<IagsLogoProps['size']>, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

/**
 * High-DPI theme-aware IAGS brand emblem sourced directly from the dedicated
 * Light and Dark artworks, pre-cropped tightly at native retina resolution
 * (1284x588 banner & 512x512 mark) and seamlessly color-matched to the sidebar
 * surface (#ffffff in light mode, #0f172a in dark mode) with zero CSS transform
 * scaling to prevent browser mipmap blur on hover.
 */
export const IagsLogo: React.FC<IagsLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
}) => {
  if (variant === 'mark') {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-md border border-slate-200/80 bg-white transition-shadow duration-200 hover:border-cyan-500/70 hover:shadow-[0_0_12px_rgba(6,182,212,0.16)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-400/70 dark:hover:shadow-[0_0_14px_rgba(34,211,238,0.22)] ${MARK_SIZE_CLASSES[size]} ${className}`}
      >
        <img
          src={IAGS_MARK_LIGHT_SRC}
          alt="IAGS — Industrial Automation Governance Studio"
          width={512}
          height={512}
          className="block h-full w-full select-none object-contain p-0.5 dark:hidden"
          decoding="sync"
        />
        <img
          src={IAGS_MARK_DARK_SRC}
          alt="IAGS — Industrial Automation Governance Studio"
          width={512}
          height={512}
          className="hidden h-full w-full select-none object-contain p-0.5 dark:block"
          decoding="sync"
        />
      </div>
    );
  }

  return (
    <div
      className={`group relative aspect-[1284/588] w-full overflow-hidden rounded-md bg-white transition-all duration-200 hover:bg-slate-50/40 dark:bg-slate-900 dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.14)] ${className}`}
    >
      <img
        src={IAGS_BANNER_LIGHT_SRC}
        alt="IAGS — Industrial Automation Governance Studio"
        width={1284}
        height={588}
        className="block h-full w-full select-none object-contain dark:hidden"
        decoding="sync"
      />
      <img
        src={IAGS_BANNER_DARK_SRC}
        alt="IAGS — Industrial Automation Governance Studio"
        width={1284}
        height={588}
        className="hidden h-full w-full select-none object-contain dark:block"
        decoding="sync"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:via-cyan-400/80"
      />
    </div>
  );
};
