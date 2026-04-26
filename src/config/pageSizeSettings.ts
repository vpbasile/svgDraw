export const DPI = 300;

function pxFromInches(inches: number): number {
  return inches * DPI;
}

export const PAGE_SIZES = {
  none: null,
  '8.5x11': { width: pxFromInches(8.5), height: pxFromInches(11), label: '8.5" x 11" (portrait)' },
  '11x8.5': { width: pxFromInches(11), height: pxFromInches(8.5), label: '11" x 8.5" (landscape)' },
  '24x36': { width: pxFromInches(24), height: pxFromInches(36), label: '24" x 36" (portrait)' },
  '36x24': { width: pxFromInches(36), height: pxFromInches(24), label: '36" x 24" (landscape)' },
} as const;

export type PageSizeKey = keyof typeof PAGE_SIZES;

export const DEFAULT_PAGE_SIZE: PageSizeKey = 'none';