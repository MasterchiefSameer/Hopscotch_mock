import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { type, TypographyVariant, colors, ColorToken } from '@/theme';

export interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: ColorToken | string;
  weight?: TextStyle['fontWeight'];
  align?: TextStyle['textAlign'];
}

export function ThemedText({
  variant = 'body',
  color,
  weight,
  align,
  style,
  children,
  ...props
}: ThemedTextProps) {
  const baseStyle = type[variant] as TextStyle;
  const resolvedColor = color ? (colors[color as ColorToken] || color) : baseStyle.color;

  return (
    <Text
      style={[
        baseStyle,
        color ? { color: resolvedColor } : null,
        weight ? { fontWeight: weight } : null,
        align ? { textAlign: align } : null,
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
}
