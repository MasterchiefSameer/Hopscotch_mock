import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from './ThemedText';

export type BadgeVariant = 'discount' | 'brand' | 'sale' | 'club' | 'outline' | 'neutral';
export type BadgeSize = 'sm' | 'md';

const badgeVariants = {
  discount: {
    backgroundColor: colors.softTealLight,
    textColor: colors.softTeal,
    borderColor: 'transparent',
  },
  brand: {
    backgroundColor: colors.brandPurpleLight,
    textColor: colors.brandPurple,
    borderColor: 'transparent',
  },
  sale: {
    backgroundColor: colors.brandPinkLight,
    textColor: colors.brandPink,
    borderColor: 'transparent',
  },
  club: {
    backgroundColor: colors.sunshineYellowLight,
    textColor: '#8D6E00',
    borderColor: 'transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    textColor: colors.neutralGray,
    borderColor: colors.neutralBorder,
  },
  neutral: {
    backgroundColor: colors.lightBackground,
    textColor: colors.neutralDark,
    borderColor: colors.neutralBorder,
  },
} as const;

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Badge({
  label,
  variant = 'discount',
  size = 'sm',
  pill = true,
  style,
}: BadgeProps) {
  const current = badgeVariants[variant];
  const isSm = size === 'sm';

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          backgroundColor: current.backgroundColor,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: current.borderColor,
          borderRadius: pill ? radius.full : radius.xs,
          borderCurve: 'continuous',
          paddingVertical: isSm ? 2 : spacing.xs,
          paddingHorizontal: isSm ? spacing.xs + 2 : spacing.sm,
        },
        style,
      ]}>
      <ThemedText
        variant="badge"
        style={{
          color: current.textColor,
          fontSize: isSm ? 10 : 11,
          fontWeight: '700',
          textTransform: 'uppercase',
        }}>
        {label}
      </ThemedText>
    </View>
  );
}
