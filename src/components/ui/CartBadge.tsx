import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';
import { SymbolView } from 'expo-symbols';
import { colors, radius } from '@/theme';
import { ThemedText } from './ThemedText';

export interface CartBadgeProps {
  count?: number;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function CartBadge({
  count = 0,
  size = 24,
  color = colors.neutralDark,
  onPress,
  style,
}: CartBadgeProps) {
  const displayCount = count > 99 ? '99+' : count > 0 ? count.toString() : '';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={count > 0 ? `Shopping cart, ${count} items` : 'Shopping cart, empty'}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 },
        style,
      ]}>
      {Platform.OS === 'ios' ? (
        <SymbolView
          name="bag"
          size={size}
          tintColor={color}
          fallback={
            <View style={[styles.bagFallback, { width: size, height: size }]}>
              <View style={[styles.bagHandle, { borderColor: color }]} />
              <View style={[styles.bagBody, { borderColor: color }]} />
            </View>
          }
        />
      ) : (
        <View style={[styles.bagFallback, { width: size, height: size }]}>
          <View style={[styles.bagHandle, { borderColor: color }]} />
          <View style={[styles.bagBody, { borderColor: color }]} />
        </View>
      )}

      {/* Dynamic Count Badge */}
      {count > 0 && (
        <View style={styles.badge}>
          <ThemedText variant="badge" style={styles.badgeText}>
            {displayCount}
          </ThemedText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bagFallback: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 2,
  },
  bagHandle: {
    width: 10,
    height: 6,
    borderWidth: 1.8,
    borderBottomWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: -1,
  },
  bagBody: {
    width: 18,
    height: 14,
    borderWidth: 1.8,
    borderRadius: 3,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: radius.full,
    backgroundColor: colors.brandPink,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.onTint,
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 11,
    textAlign: 'center',
  },
});
