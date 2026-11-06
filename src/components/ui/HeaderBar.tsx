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
import { colors, spacing, radius, shadows } from '@/theme';
import { ThemedText } from './ThemedText';
import { CartBadge } from './CartBadge';

export interface HeaderBarProps {
  title?: string;
  cartCount?: number;
  onSearchPress?: () => void;
  onWishlistPress?: () => void;
  onCartPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function HeaderBar({
  title = 'Hopscotch',
  cartCount = 0,
  onSearchPress,
  onWishlistPress,
  onCartPress,
  style,
}: HeaderBarProps) {
  return (
    <View style={[styles.headerContainer, style]}>
      <View style={styles.contentRow}>
        {/* Brand Name / Logo */}
        <View style={styles.brandContainer}>
          <ThemedText
            variant="title"
            weight="700"
            color="brandPurple"
            style={styles.brandTitle}>
            {title}
          </ThemedText>
        </View>

        {/* Search Bar Input / Trigger */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Search products"
          onPress={onSearchPress}
          style={({ pressed }) => [
            styles.searchBar,
            { opacity: pressed ? 0.8 : 1 },
          ]}>
          <View style={styles.searchIcon}>
            <View style={styles.searchCircle} />
            <View style={styles.searchStem} />
          </View>
          <ThemedText
            variant="subhead"
            color="neutralGray"
            numberOfLines={1}
            style={styles.searchPlaceholder}>
            Search for dresses, sets, shoes...
          </ThemedText>
        </Pressable>

        {/* Action Icons: Wishlist & Cart */}
        <View style={styles.actionsRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Wishlist"
            onPress={onWishlistPress}
            style={({ pressed }) => [
              styles.actionButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}>
            {Platform.OS === 'ios' ? (
              <SymbolView
                name="heart"
                size={22}
                tintColor={colors.neutralDark}
                fallback={<View style={styles.heartFallback} />}
              />
            ) : (
              <View style={styles.heartFallback} />
            )}
          </Pressable>

          <CartBadge
            count={cartCount}
            onPress={onCartPress}
            color={colors.neutralDark}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.canvasWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutralBorder,
    boxShadow: shadows.header,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.screenPadding,
    zIndex: 50,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  brandContainer: {
    paddingRight: spacing.xs,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBackground,
    borderRadius: radius.full,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.compact,
    gap: spacing.xs + 2,
    borderWidth: 1,
    borderColor: colors.neutralBorder,
  },
  searchIcon: {
    width: 16,
    height: 16,
    position: 'relative',
  },
  searchCircle: {
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 1.8,
    borderColor: colors.neutralGray,
  },
  searchStem: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    width: 5,
    height: 1.8,
    backgroundColor: colors.neutralGray,
    transform: [{ rotate: '45deg' }],
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 13,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartFallback: {
    width: 18,
    height: 18,
    borderWidth: 1.8,
    borderColor: colors.neutralDark,
    borderRadius: 4,
    transform: [{ rotate: '-45deg' }],
  },
});
