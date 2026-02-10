/**
 * UI Kit Color Palette
 * These colors match the design system and are available as CSS variables
 * and Tailwind classes throughout the application.
 */

export const colors = {
  // Base UI Kit Colors
  lightGrayishPink: '#E7E0E0',
  palePink: '#E0A9AD',
  vibrantPink: '#DB004D',
  darkGray: '#0A0A0A',
  black: '#000000',
  headerGray: '#6D6D6D',

  // Semantic Colors
  background: 'var(--color-light-grayish-pink)',
  foreground: 'var(--color-black)',
  primary: 'var(--color-vibrant-pink)',
  primaryLight: 'var(--color-pale-pink)',
  surface: 'var(--color-light-grayish-pink)',
  surfaceDark: 'var(--color-dark-gray)',
} as const;

/**
 * CSS Variable names for use in inline styles
 */
export const colorVariables = {
  lightGrayishPink: 'var(--color-light-grayish-pink)',
  palePink: 'var(--color-pale-pink)',
  vibrantPink: 'var(--color-vibrant-pink)',
  darkGray: 'var(--color-dark-gray)',
  black: 'var(--color-black)',
  headerGray: 'var(--color-header-gray)',
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  primary: 'var(--primary)',
  primaryLight: 'var(--primary-light)',
  surface: 'var(--surface)',
  surfaceDark: 'var(--surface-dark)',
} as const;

/**
 * Tailwind class names for common color combinations
 */
export const colorClasses = {
  background: 'bg-light-grayish-pink',
  foreground: 'text-black',
  primary: 'bg-vibrant-pink text-white',
  primaryText: 'text-vibrant-pink',
  surface: 'bg-light-grayish-pink',
  surfaceDark: 'bg-dark-gray text-white',
} as const;
