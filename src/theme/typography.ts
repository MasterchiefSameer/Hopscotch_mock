import { Platform, TextStyle } from 'react-native';
import { colors } from './colors';

export const fontFamilies = {
  primary: Platform.select({
    web: "Averta, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    ios: 'System',
    default: 'sans-serif',
  }),
  display: Platform.select({
    web: "Averta, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    ios: 'System',
    default: 'sans-serif-medium',
  }),
};

export const type = {
  largeTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    fontFamily: fontFamilies.display,
    color: colors.neutralDark,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    fontFamily: fontFamilies.display,
    color: colors.neutralDark,
  },
  headline: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: fontFamilies.primary,
    color: colors.neutralDark,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: fontFamilies.primary,
    color: colors.neutralDark,
  },
  bodyBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    fontFamily: fontFamilies.primary,
    color: colors.neutralDark,
  },
  subhead: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: fontFamilies.primary,
    color: colors.neutralGray,
  },
  caption: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500',
    fontFamily: fontFamilies.primary,
    color: colors.neutralGray,
  },
  price: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    fontFamily: fontFamilies.primary,
    color: colors.neutralDark,
  },
  strikePrice: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: fontFamilies.primary,
    color: colors.neutralGray,
    textDecorationLine: 'line-through',
  },
  discountTag: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    fontFamily: fontFamilies.primary,
    color: colors.softTeal,
  },
  badge: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '700',
    fontFamily: fontFamilies.primary,
    letterSpacing: 0.4,
    color: colors.neutralDark,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof type;
