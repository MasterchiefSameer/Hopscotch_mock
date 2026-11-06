export const shadows = {
  card: '0 1px 3px rgba(0, 0, 0, 0.06)',
  subtle: '0 2px 6px rgba(0, 0, 0, 0.04)',
  raised: '0 4px 12px rgba(0, 0, 0, 0.08)',
  overlay: '0 8px 24px rgba(0, 0, 0, 0.16)',
  header: '0 2px 4px rgba(0, 0, 0, 0.05)',
} as const;

export type ShadowToken = keyof typeof shadows;
