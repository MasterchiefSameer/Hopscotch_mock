import React, { useState } from 'react';
import { View, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { Image, ImageProps } from 'expo-image';
import { colors, radius } from '@/theme';

export interface ImageCardProps {
  source: string | { uri: string };
  aspectRatio?: number;
  width?: number;
  height?: number;
  contentFit?: ImageProps['contentFit'];
  borderRadius?: number;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  alt?: string;
}

export function ImageCard({
  source,
  aspectRatio,
  width,
  height,
  contentFit = 'cover',
  borderRadius = radius.md,
  children,
  style,
  alt,
}: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // Strictly calculate aspect ratio from API dimensions to enforce Zero CLS
  const resolvedAspectRatio =
    aspectRatio ?? (width && height && height > 0 ? width / height : 1);

  const imageUri = typeof source === 'string' ? source : source?.uri;

  return (
    <View
      style={[
        styles.container,
        {
          aspectRatio: resolvedAspectRatio,
          borderRadius,
          backgroundColor: colors.lightBackground,
        },
        style,
      ]}>
      {/* Background placeholder skeleton while image is resolving */}
      {!isLoaded && !isError && (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.skeleton,
            { borderRadius },
          ]}
        />
      )}

      {/* Primary Image using expo-image */}
      <Image
        source={isError || !imageUri ? undefined : { uri: imageUri }}
        contentFit={contentFit}
        transition={200}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsError(true);
          setIsLoaded(true);
        }}
        accessibilityLabel={alt}
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius,
            opacity: isLoaded && !isError ? 1 : 0,
          },
        ]}
      />

      {/* Fallback state when image fails to load */}
      {isError && (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.fallbackContainer,
            { borderRadius },
          ]}>
          <View style={styles.fallbackDot} />
        </View>
      )}

      {/* Overlay content (e.g. Quick Add, Wishlist Heart, Discount Tag) */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderCurve: 'continuous',
  },
  skeleton: {
    backgroundColor: '#EBEBF0',
  },
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBackground,
  },
  fallbackDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.neutralBorder,
  },
});
