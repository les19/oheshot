/**
 * Font Utilities and Constants
 * Typography system based on UI kit specifications
 */

export const fontStyles = {
  // Display/Heading Style: Width:100, Weight:600, XOPQ:96
  display: {
    className: 'font-display',
    css: {
      fontFamily: 'var(--font-roboto)',
      fontVariationSettings: "'wdth' 100, 'wght' 600, 'XOPQ' 96",
      fontWeight: 600,
    },
  },
  
  // Body Text Style: Width:110, Weight:410, XOPQ:96
  body: {
    className: 'font-body',
    css: {
      fontFamily: 'var(--font-roboto)',
      fontVariationSettings: "'wdth' 110, 'wght' 410, 'XOPQ' 96",
      fontWeight: 410,
    },
  },
  
  // Semibold Style (for secondary headings)
  semibold: {
    className: 'font-semibold',
    css: {
      fontFamily: 'var(--font-roboto)',
      fontWeight: 600,
    },
  },
  
  // NKDuy Mono Semibold (for special headings)
  nkduy: {
    className: 'font-nkduy',
    css: {
      fontFamily: 'var(--font-nkduy)',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
} as const;

/**
 * Font class names for Tailwind usage
 */
export const fontClasses = {
  display: 'font-display',
  body: 'font-body',
  semibold: 'font-semibold',
  nkduy: 'font-nkduy',
  roboto: 'font-roboto',
} as const;
