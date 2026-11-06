import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { spacing } from '@/theme';
import { ThemedText } from './ThemedText';

export interface PriceTagProps {
  price: number;
  regularPrice?: number;
  discountPercentage?: number;
  size?: 'sm' | 'md' | 'lg';
  direction?: 'row' | 'column';
  style?: StyleProp<ViewStyle>;
}

export function formatIndianCurrency(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function PriceTag({
  price,
  regularPrice,
  discountPercentage,
  size = 'md',
  direction = 'row',
  style,
}: PriceTagProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const hasDiscount =
    (discountPercentage && discountPercentage > 0) ||
    (regularPrice && regularPrice > price);

  const calculatedDiscount =
    discountPercentage ??
    (regularPrice && regularPrice > price
      ? Math.round(((regularPrice - price) / regularPrice) * 100)
      : 0);

  return (
    <View
      style={[
        {
          flexDirection: direction === 'row' ? 'row' : 'column',
          alignItems: direction === 'row' ? 'baseline' : 'flex-start',
          gap: spacing.xs + 2,
        },
        style,
      ]}>
      {/* Selling Price */}
      <ThemedText
        variant={isSm ? 'bodyBold' : isLg ? 'title' : 'price'}
        weight="700"
        color="neutralDark"
        style={isLg ? { fontSize: 22, lineHeight: 28 } : undefined}>
        {formatIndianCurrency(price)}
      </ThemedText>

      {/* Strike-through MRP */}
      {regularPrice && regularPrice > price && (
        <ThemedText
          variant={isSm ? 'caption' : 'strikePrice'}
          color="neutralGray"
          style={isLg ? { fontSize: 15 } : undefined}>
          {formatIndianCurrency(regularPrice)}
        </ThemedText>
      )}

      {/* Discount Badge */}
      {hasDiscount && calculatedDiscount > 0 && (
        <ThemedText
          variant={isSm ? 'caption' : 'discountTag'}
          weight="700"
          color="softTeal"
          style={isLg ? { fontSize: 14 } : undefined}>
          {`${calculatedDiscount}% off`}
        </ThemedText>
      )}
    </View>
  );
}
