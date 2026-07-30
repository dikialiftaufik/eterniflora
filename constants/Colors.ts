/**
 * EterniFlora Brand Colors
 * Based on Visual Direction in AGENTS.md
 */

export const brand = {
  /** Vivid Purple — Primary CTA, active states, accents */
  primary: '#7C3AED',
  /** Lighter purple for hover/pressed states */
  primaryLight: '#A78BFA',
  /** Darker purple for text on light backgrounds */
  primaryDark: '#5B21B6',
  /** Warm Off-White — Main background */
  background: '#F5F3F0',
  /** Deep Purple — Dark hero sections, dark cards */
  deepPurple: '#1E0A3C',
  /** Forest Green — Eco accent, sustainability labels */
  ecoGreen: '#16A34A',
  /** Dark Green — Eco wallet card background */
  ecoGreenDark: '#14532D',
  /** White */
  white: '#FFFFFF',
  /** Light gray for input borders, dividers */
  border: '#E5E2DD',
  /** Medium gray for placeholder text */
  placeholder: '#9CA3AF',
  /** Dark text */
  textPrimary: '#1F2937',
  /** Secondary text */
  textSecondary: '#6B7280',
  /** Error red */
  error: '#EF4444',
} as const;

export type BrandColor = keyof typeof brand;
