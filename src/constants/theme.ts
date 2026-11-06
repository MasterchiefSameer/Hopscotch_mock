import '@/global.css';
import { Platform } from 'react-native';
import { colors, spacing } from '@/theme';

export const Colors = {
  light: {
    text: colors.neutralDark,
    background: colors.canvasWhite,
    backgroundElement: colors.lightBackground,
    backgroundSelected: colors.brandPurpleLight,
    textSecondary: colors.neutralGray,
    brandPurple: colors.brandPurple,
    brandPink: colors.brandPink,
  },
  dark: {
    text: '#FFFFFF',
    background: '#121212',
    backgroundElement: '#1E1E1E',
    backgroundSelected: '#2D1B36',
    textSecondary: '#A0A0A0',
    brandPurple: '#9C4DCC',
    brandPink: '#FF4081',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: spacing.xxs,
  one: spacing.xs,
  two: spacing.sm,
  three: spacing.md,
  four: spacing.xl,
  five: spacing.xxl,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 1200;
