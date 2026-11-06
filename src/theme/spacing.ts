export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  compact: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  screenPadding: 16,
} as const;

export type SpacingToken = keyof typeof spacing;
