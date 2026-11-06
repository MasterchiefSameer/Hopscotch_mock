import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from './ThemedText';

export type ButtonVariant = 'primary' | 'pink' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variants = {
  primary: {
    backgroundColor: colors.brandPurple,
    borderColor: 'transparent',
    textColor: colors.onTint,
  },
  pink: {
    backgroundColor: colors.brandPink,
    borderColor: 'transparent',
    textColor: colors.onTint,
  },
  secondary: {
    backgroundColor: colors.brandPurpleLight,
    borderColor: 'transparent',
    textColor: colors.brandPurple,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.brandPurple,
    textColor: colors.brandPurple,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    textColor: colors.brandPurple,
  },
} as const;

const sizes = {
  sm: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.compact,
    minHeight: 32,
  },
  md: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    minHeight: 44,
  },
  lg: {
    paddingVertical: spacing.compact + 2,
    paddingHorizontal: spacing.xl,
    minHeight: 52,
  },
} as const;

export interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  pill = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  onPress,
}: ButtonProps) {
  const currentVariant = variants[variant];
  const currentSize = sizes[size];
  const borderRadius = pill ? radius.full : radius.sm;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: !!(disabled || loading), busy: !!loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.xs + 2,
          backgroundColor: currentVariant.backgroundColor,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderColor: currentVariant.borderColor,
          borderRadius,
          borderCurve: 'continuous',
          opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
          ...currentSize,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={currentVariant.textColor} size="small" />
      ) : (
        <>
          {leftIcon}
          <ThemedText
            variant={size === 'sm' ? 'subhead' : size === 'lg' ? 'headline' : 'bodyBold'}
            weight="600"
            style={{ color: currentVariant.textColor }}>
            {title}
          </ThemedText>
          {rightIcon}
        </>
      )}
    </Pressable>
  );
}
