/**
 * Centralized image imports.
 * Per AGENTS.md: Do not import image assets directly inside screens or components.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const icon = require('@/assets/images/icon.png') as number;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const splashIcon = require('@/assets/images/splash-icon.png') as number;

export const images = {
  icon,
  splashIcon,
};
