
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RESTAURANTS, Restaurant } from '@/data/restaurants';
import { useTheme } from '@/hooks/useTheme';
import type { HomeStackParamList } from '@/navigation/types';
import { useAuth } from '@/store/authStore';
import { useCart } from '@/store/cartStore';
import { FontFamily } from '@/theme/fonts';

type NavProp = NativeStackNavigationProp<HomeStackParamList>;

const PROMO_CARDS = [
  { id: '1', line1: '₹0', line2: 'PACKAGING\nFEE', bg: '#F3C117', textColor: '#1C1C1C' },
  { id: '2', line1: '₹0', line2: 'PLATFORM\nFEE', bg: '#3AB757', textColor: '#FFFFFF' },
];

export default function HomeScreen() {
  const { colors, isDark } = useTheme();
  const { user } = useAuth();
  const { totalItems } = useCart();
  const navigation = useNavigation<NavProp>();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRestaurants =
    selectedCategory === 'All'
      ? RESTAURANTS
      : RESTAURANTS.filter((r) =>
          r.cuisine.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  
  const goToRestaurant = (id: string, name: string, deliveryFee: number) => {
    navigation.navigate('RestaurantDetail', {
      id,
      name,
      deliveryFee: String(deliveryFee),
    });
  };

  
  const openDrawer = () => {
    (navigation as any).getParent('DrawerNav')?.openDrawer();
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.primary }]} edges={['top']}>
      
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        
        <TouchableOpacity onPress={openDrawer} style={styles.menuIconBtn} activeOpacity={0.8}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.locationBtn} activeOpacity={0.8}>
          <View style={styles.locationIconWrap}>
            <Ionicons name="navigate" size={18} color="#000" />
          </View>
          <View style={styles.locationTextWrap}>
            <View style={styles.locationRow}>
              <Text style={styles.locationName} numberOfLines={1}>
                {user ? 'Home' : 'Select Location'}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#fff" />
            </View>
            <Text style={styles.locationSub} numberOfLines={1}>
              Connaught Place, New Delhi
            </Text>
          </View>
        </TouchableOpacity>

        
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartIconBtn}
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      
      <View style={[styles.searchSection, { backgroundColor: colors.primary }]}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => {
            
            (navigation.getParent() as any)?.navigate('Search');
          }}
          activeOpacity={0.9}
        >
          <Ionicons name="search" size={16} color="#93959F" />
          <Text style={styles.searchPlaceholder}>Search for 'Biryani'</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.surface }]}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={[styles.promoBanner, { backgroundColor: colors.primary }]}>
          <Text style={styles.promoBannerText}>LOWEST PRICE GUARANTEED</Text>
          <View style={styles.promoCardsWrap}>
            {PROMO_CARDS.map((card, i) => (
              <View
                key={card.id}
                style={[
                  styles.promoCard,
                  { backgroundColor: card.bg, zIndex: PROMO_CARDS.length - i },
                  i === 0 && styles.promoCardFirst,
                  i === 1 && styles.promoCardSecond,
                ]}
              >
                <Text style={[styles.promoCardBig, { color: card.textColor }]}>{card.line1}</Text>
                <Text style={[styles.promoCardSub, { color: card.textColor }]}>{card.line2}</Text>
              </View>
            ))}
          </View>
        </View>

        
        <View style={[styles.sectionHeader, { backgroundColor: colors.background, marginTop: 8 }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Brands</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.brandList, { backgroundColor: colors.background }]}
        >
          {RESTAURANTS.map((r) => (
            <TouchableOpacity
              key={r.id}
              style={styles.brandItem}
              onPress={() => goToRestaurant(r.id, r.name, r.deliveryFee)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: r.image }} style={styles.brandLogo} />
              <Text style={[styles.brandName, { color: colors.textSecondary }]} numberOfLines={1}>
                {r.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        
        <View style={[styles.sectionHeader, { backgroundColor: colors.surface, marginTop: 8 }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {selectedCategory === 'All' ? 'All Restaurants' : selectedCategory}
          </Text>
          <Text style={[styles.sectionCount, { color: colors.textMuted }]}>
            {filteredRestaurants.length} options
          </Text>
        </View>

        {filteredRestaurants.map((r: Restaurant) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            colors={colors}
            onPress={() => goToRestaurant(r.id, r.name, r.deliveryFee)}
          />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Restaurant Card ─────────────────────────────────────────────────────────
function RestaurantCard({
  restaurant,
  colors,
  onPress,
}: {
  restaurant: Restaurant;
  colors: ReturnType<typeof useTheme>['colors'];
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.rCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={styles.rImgWrap}>
        <Image source={{ uri: restaurant.coverImage }} style={styles.rImg} />
        {restaurant.badge && (
          <View style={[styles.rBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.rBadgeText}>{restaurant.badge}</Text>
          </View>
        )}
        {restaurant.deliveryFee === 0 && (
          <View style={[styles.rFreeBadge, { backgroundColor: colors.green }]}>
            <Text style={styles.rFreeBadgeText}>FREE DELIVERY</Text>
          </View>
        )}
      </View>
      <View style={styles.rInfo}>
        <View style={styles.rTopRow}>
          <Text style={[styles.rName, { color: colors.text }]} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={[styles.ratingPill, { backgroundColor: colors.green }]}>
            <Ionicons name="star" size={9} color="#fff" />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>
        <Text style={[styles.rCuisine, { color: colors.textSecondary }]} numberOfLines={1}>
          {restaurant.cuisine}
        </Text>
        <View style={[styles.rDivider, { backgroundColor: colors.divider }]} />
        <View style={styles.rMeta}>
          <Ionicons name="time-outline" size={12} color={colors.textMuted} />
          <Text style={[styles.rMetaText, { color: colors.textMuted }]}>
            {restaurant.deliveryTime}
          </Text>
          <View style={[styles.rDot, { backgroundColor: colors.textMuted }]} />
          <Text style={[styles.rMetaText, { color: colors.textMuted }]}>
            {restaurant.deliveryFee === 0 ? 'Free delivery' : `₹${restaurant.deliveryFee} delivery`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 10,
    gap: 10,
  },
  menuIconBtn: { padding: 4 },
  locationBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  locationIconWrap: {
    borderRadius: 18,
    padding: 8,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationTextWrap: { flex: 1 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationName: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: '#fff',
    maxWidth: 150,
  },
  locationSub: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 1,
  },
  cartIconBtn: { position: 'relative', padding: 4 },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: { color: '#1C1C1C', fontSize: 9, fontFamily: FontFamily.black },
  searchSection: { paddingHorizontal: 16, paddingBottom: 14 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#93959F',
    flex: 1,
    fontFamily: FontFamily.light,
  },
  scroll: { flex: 1 },
  promoBanner: { paddingHorizontal: 16, paddingBottom: 20, paddingTop: 4 },
  promoBannerText: {
    fontSize: 18,
    fontFamily: FontFamily.extraBold,
    color: '#fff',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 14,
  },
  promoCardsWrap: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  promoCard: {
    width: 130,
    height: 72,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  promoCardFirst: { transform: [{ rotate: '-6deg' }], marginRight: -20, zIndex: 10 },
  promoCardSecond: { transform: [{ rotate: '6deg' }], marginRight: -20, zIndex: 20 },
  promoCardBig: { fontSize: 20, fontFamily: FontFamily.black },
  promoCardSub: { fontSize: 10, fontFamily: FontFamily.bold, marginTop: 2, lineHeight: 13 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  sectionTitle: { fontSize: 17, fontFamily: FontFamily.extraBold },
  sectionCount: { fontSize: 12, fontFamily: FontFamily.light },
  brandList: { paddingHorizontal: 16, paddingBottom: 12, gap: 16 },
  brandItem: { alignItems: 'center', width: 64 },
  brandLogo: { width: 56, height: 56, borderRadius: 28, marginBottom: 6 },
  brandName: { fontSize: 10, fontFamily: FontFamily.semiBold, textAlign: 'center' },
  rCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  rImgWrap: { position: 'relative' },
  rImg: { width: '100%', height: 160, resizeMode: 'cover' },
  rBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  rBadgeText: { color: '#fff', fontSize: 10, fontFamily: FontFamily.extraBold },
  rFreeBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  rFreeBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontFamily: FontFamily.extraBold,
    letterSpacing: 0.5,
  },
  rInfo: { padding: 12 },
  rTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  rName: { fontSize: 15, fontFamily: FontFamily.bold, flex: 1, marginRight: 8 },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  ratingText: { color: '#fff', fontSize: 11, fontFamily: FontFamily.bold },
  rCuisine: { fontSize: 12, marginBottom: 8, fontFamily: FontFamily.light },
  rDivider: { height: 1, marginBottom: 8 },
  rMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  rMetaText: { fontSize: 12, fontFamily: FontFamily.light },
  rDot: { width: 3, height: 3, borderRadius: 1.5 },
});
