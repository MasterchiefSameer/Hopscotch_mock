import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, Alert, Platform } from 'react-native';
import {
  colors,
  spacing,
  radius,
  shadows,
} from '@/theme';
import {
  ThemedText,
  Button,
  Badge,
  PriceTag,
  ImageCard,
  HeaderBar,
  CartBadge,
} from '@/components/ui';

export default function HomeScreen() {
  const [cartCount, setCartCount] = useState(3);

  const handleAction = (msg: string) => {
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert('Hopscotch', msg);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* 1. HeaderBar Primitive */}
      <HeaderBar
        title="Hopscotch"
        cartCount={cartCount}
        onSearchPress={() => handleAction('Search clicked')}
        onWishlistPress={() => handleAction('Wishlist clicked')}
        onCartPress={() => handleAction(`Cart clicked (${cartCount} items)`)}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Banner / Hero with NativeWind v5 */}
        <View className="rounded-2xl bg-brand-purple p-5 shadow-raised">
          <Badge label="New Season '26" variant="sale" pill />
          <View style={{ height: spacing.xs }} />
          <ThemedText variant="largeTitle" style={{ color: colors.onTint }}>
            Hopscotch Kids Fashion
          </ThemedText>
          <ThemedText
            variant="body"
            style={{ color: colors.brandPurpleLight, marginTop: spacing.xs }}>
            Vibrant, fast-loading, zero-CLS design system powered by NativeWind v5 and Expo.
          </ThemedText>
          <View style={{ height: spacing.md }} />
          <View style={styles.rowWrap}>
            <Button
              title="Shop Now"
              variant="pink"
              size="md"
              pill
              onPress={() => setCartCount((prev) => prev + 1)}
            />
            <Button
              title="Explore Collection"
              variant="secondary"
              size="md"
              pill
              onPress={() => handleAction('Exploring collection...')}
            />
          </View>
        </View>

        {/* 2. Color Palette Tokens */}
        <View style={styles.section}>
          <ThemedText variant="title">Brand Colors</ThemedText>
          <ThemedText variant="subhead">Hopscotch single source of truth tokens</ThemedText>
          <View style={styles.paletteGrid}>
            <View style={[styles.paletteCard, { backgroundColor: colors.brandPurple }]}>
              <ThemedText variant="caption" style={styles.whiteText}>
                Purple
              </ThemedText>
              <ThemedText variant="badge" style={styles.whiteText}>
                #67218C
              </ThemedText>
            </View>
            <View style={[styles.paletteCard, { backgroundColor: colors.brandPink }]}>
              <ThemedText variant="caption" style={styles.whiteText}>
                Pink
              </ThemedText>
              <ThemedText variant="badge" style={styles.whiteText}>
                #E91E63
              </ThemedText>
            </View>
            <View style={[styles.paletteCard, { backgroundColor: colors.playfulNavy }]}>
              <ThemedText variant="caption" style={styles.whiteText}>
                Navy
              </ThemedText>
              <ThemedText variant="badge" style={styles.whiteText}>
                #1A237E
              </ThemedText>
            </View>
            <View style={[styles.paletteCard, { backgroundColor: colors.softTeal }]}>
              <ThemedText variant="caption" style={styles.whiteText}>
                Teal
              </ThemedText>
              <ThemedText variant="badge" style={styles.whiteText}>
                #008A45
              </ThemedText>
            </View>
            <View style={[styles.paletteCard, { backgroundColor: colors.sunshineYellow }]}>
              <ThemedText variant="caption" style={{ color: colors.neutralDark }}>
                Yellow
              </ThemedText>
              <ThemedText variant="badge" style={{ color: colors.neutralDark }}>
                #FFB800
              </ThemedText>
            </View>
          </View>
        </View>

        {/* 3. Reusable Buttons */}
        <View style={styles.section}>
          <ThemedText variant="title">Button Variants & Sizes</ThemedText>
          <View style={styles.buttonRow}>
            <Button title="Primary (Purple)" variant="primary" size="md" />
            <Button title="Action (Pink)" variant="pink" size="md" />
            <Button title="Secondary" variant="secondary" size="md" />
            <Button title="Outline" variant="outline" size="md" />
            <Button title="Ghost" variant="ghost" size="md" />
            <Button title="Small Pill" variant="pink" size="sm" pill />
            <Button title="Large Button" variant="primary" size="lg" />
            <Button title="Loading" variant="primary" loading />
          </View>
        </View>

        {/* 4. Badges & Chips */}
        <View style={styles.section}>
          <ThemedText variant="title">Badges & Tags</ThemedText>
          <View style={styles.rowWrap}>
            <Badge label="55% OFF" variant="discount" />
            <Badge label="TRENDING" variant="sale" />
            <Badge label="HOPSCOTCH EXCLUSIVE" variant="brand" />
            <Badge label="CLUB PRICE" variant="club" />
            <Badge label="100% COTTON" variant="outline" />
          </View>
        </View>

        {/* 5. PriceTag Primitive */}
        <View style={styles.section}>
          <ThemedText variant="title">Price Tag Variations</ThemedText>
          <View style={styles.cardContainer}>
            <View style={styles.priceRowItem}>
              <ThemedText variant="subhead">Small (Cards):</ThemedText>
              <PriceTag price={499} regularPrice={999} discountPercentage={50} size="sm" />
            </View>
            <View style={styles.priceRowItem}>
              <ThemedText variant="subhead">Medium (Default):</ThemedText>
              <PriceTag price={799} regularPrice={1599} discountPercentage={50} size="md" />
            </View>
            <View style={styles.priceRowItem}>
              <ThemedText variant="subhead">Large (PDP):</ThemedText>
              <PriceTag price={1299} regularPrice={2499} discountPercentage={48} size="lg" />
            </View>
          </View>
        </View>

        {/* 6. Product Card Example (ImageCard + PriceTag + Button) */}
        <View style={styles.section}>
          <ThemedText variant="title">Product Card Composition</ThemedText>
          <ThemedText variant="subhead">Zero-CLS aspect ratio image with integrated tokens</ThemedText>

          <View style={styles.productGrid}>
            <View style={styles.productCard}>
              <ImageCard
                source="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80"
                aspectRatio={3 / 4}
                borderRadius={radius.sm}
                alt="Boys Floral Printed Shirt & Trouser Set">
                {/* Discount Badge on Image */}
                <View style={styles.imageOverlayTop}>
                  <Badge label="60% OFF" variant="discount" />
                </View>
              </ImageCard>

              <View style={styles.productInfo}>
                <ThemedText variant="headline" numberOfLines={1}>
                  Hopscotch Boys
                </ThemedText>
                <ThemedText variant="subhead" numberOfLines={1}>
                  Printed Shirt with Suspender Trousers Set
                </ThemedText>
                <PriceTag price={749} regularPrice={1899} size="sm" />
                <View style={{ marginTop: spacing.xs }}>
                  <Button
                    title="Quick Add"
                    variant="pink"
                    size="sm"
                    pill
                    onPress={() => setCartCount((prev) => prev + 1)}
                  />
                </View>
              </View>
            </View>

            <View style={styles.productCard}>
              <ImageCard
                source="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80"
                aspectRatio={3 / 4}
                borderRadius={radius.sm}
                alt="Girls Party Frock Dress">
                <View style={styles.imageOverlayTop}>
                  <Badge label="50% OFF" variant="sale" />
                </View>
              </ImageCard>

              <View style={styles.productInfo}>
                <ThemedText variant="headline" numberOfLines={1}>
                  Hopscotch Girls
                </ThemedText>
                <ThemedText variant="subhead" numberOfLines={1}>
                  Sparkle Bow Ruffle Party Dress
                </ThemedText>
                <PriceTag price={899} regularPrice={1799} size="sm" />
                <View style={{ marginTop: spacing.xs }}>
                  <Button
                    title="Quick Add"
                    variant="pink"
                    size="sm"
                    pill
                    onPress={() => setCartCount((prev) => prev + 1)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 7. Cart Badge Demo */}
        <View style={styles.section}>
          <ThemedText variant="title">Interactive Cart Counter</ThemedText>
          <View style={[styles.cardContainer, styles.rowBetween]}>
            <View>
              <ThemedText variant="bodyBold">Cart Items: {cartCount}</ThemedText>
              <ThemedText variant="caption">Tap badge or buttons to update</ThemedText>
            </View>
            <View style={styles.rowWrap}>
              <Button
                title="-"
                variant="outline"
                size="sm"
                onPress={() => setCartCount((prev) => Math.max(0, prev - 1))}
              />
              <CartBadge count={cartCount} size={28} />
              <Button
                title="+"
                variant="outline"
                size="sm"
                onPress={() => setCartCount((prev) => prev + 1)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.screenPadding,
    gap: spacing.xl,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  section: {
    gap: spacing.sm,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  paletteCard: {
    width: 100,
    height: 60,
    borderRadius: radius.md,
    padding: spacing.xs,
    justifyContent: 'space-between',
    boxShadow: shadows.card,
  },
  whiteText: {
    color: colors.onTint,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  cardContainer: {
    backgroundColor: colors.canvasWhite,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutralBorder,
    boxShadow: shadows.card,
  },
  priceRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  productCard: {
    flex: 1,
    maxWidth: 240,
    backgroundColor: colors.canvasWhite,
    borderRadius: radius.md,
    padding: spacing.sm,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.neutralBorder,
    boxShadow: shadows.card,
  },
  imageOverlayTop: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
  },
  productInfo: {
    gap: spacing.xxs + 1,
    paddingTop: spacing.xs,
  },
});
