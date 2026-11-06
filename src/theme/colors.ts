import { Platform } from 'react-native';
import { Color } from 'expo-router';

export const colors = {
  // Hopscotch Core Brand Palette
  brandPurple: '#67218C', // Primary Hopscotch Purple (Logo, Main CTAs, Header accents)
  brandPurpleLight: '#F3E8FF', // Soft Purple tint for chip backgrounds
  brandPink: '#E91E63', // Vibrant Pink (Offer banners, Quick Add, Heart Wishlist)
  brandPinkLight: '#FCE4EC', // Soft Pink tint
  sunshineYellow: '#FFB800', // Sunshine Gold (Ratings, Festive accents, Club badge)
  sunshineYellowLight: '#FFF8E1',
  softTeal: '#008A45', // Forest/Teal Green (Discount pill, Stock/Delivery indicators)
  softTealLight: '#E8F5E9',
  playfulNavy: '#1A237E', // Playful Navy (Boys category, Strong headings)

  // Neutrals & Surfaces
  neutralDark: '#282C3F', // Hopscotch high-contrast primary text
  neutralGray: '#757575', // Secondary text & MRP strike-through
  neutralLight: '#9E9E9E', // Muted captions & placeholders
  neutralBorder: '#EAEAEC', // Card hairline borders & divider lines
  canvasWhite: '#FFFFFF', // Pure White for product cards & modals
  lightBackground: '#F8F9FA', // Page canvas background

  // Semantic platform tokens with graceful fallbacks
  label: Platform.select({
    ios: Color.ios.label,
    android: Color.android.dynamic.onSurface,
    default: '#282C3F',
  })!,
  secondaryLabel: Platform.select({
    ios: Color.ios.secondaryLabel,
    android: Color.android.dynamic.onSurfaceVariant,
    default: '#757575',
  })!,
  separator: Platform.select({
    ios: Color.ios.separator,
    android: Color.android.dynamic.outlineVariant,
    default: '#EAEAEC',
  })!,
  systemBackground: Platform.select({
    ios: Color.ios.systemBackground,
    android: Color.android.dynamic.surface,
    default: '#F8F9FA',
  })!,
  systemBlue: Platform.select({
    ios: Color.ios.systemBlue,
    android: Color.android.dynamic.primary,
    default: '#67218C',
  })!,
  onTint: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof colors;
