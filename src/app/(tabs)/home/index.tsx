import { RESTAURANTS, Restaurant } from '@/data/restaurants';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/store/authStore';
import { useCart } from '@/store/cartStore';
import { FontFamily } from '@/theme/fonts';
import { useRouter } from 'expo-router';
import { ChevronDown, Clock, Menu, Navigation, Search, ShoppingCart, Star } from 'lucide-react-native';
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

// Stacked promo cards (Indian style)
const PROMO_CARDS = [
    { id: '1', line1: '₹0', line2: 'PACKAGING\nFEE', bg: '#F3C117', textColor: '#1C1C1C' },
    { id: '2', line1: '₹0', line2: 'PLATFORM\nFEE', bg: '#3AB757', textColor: '#FFFFFF' },
    // { id: '3', line1: '�', line2: 'RESTAURANT\nPRICES', bg: '#FFFFFF', textColor: '#1C1C1C' },
];

export default function HomeScreen() {
    const { colors, isDark } = useTheme();
    const { user } = useAuth();
    const { totalItems } = useCart();
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredRestaurants =
        selectedCategory === 'All'
            ? RESTAURANTS
            : RESTAURANTS.filter(r =>
                r.cuisine.toLowerCase().includes(selectedCategory.toLowerCase())
            );

    const goToRestaurant = (id: string, name: string, deliveryFee: number) => {
        router.push({
            pathname: '/(tabs)/home/restaurant' as any,
            params: { id, name, deliveryFee: String(deliveryFee) },
        });
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.primary }]} edges={['top']}>
            {/* ── Pink Header ── */}
            <View style={[styles.header, { backgroundColor: colors.primary }]}>
                {/* Hamburger Menu (Drawer) */}
                <TouchableOpacity
                    onPress={() => router.push('/drawer' as any)}
                    style={styles.menuIconBtn}
                    activeOpacity={0.8}
                >
                    <Menu size={22} color="#fff" strokeWidth={2} />
                </TouchableOpacity>

                {/* Location */}
                <TouchableOpacity style={styles.locationBtn} activeOpacity={0.8}>
                    <View style={styles.locationIconWrap}>
                        <Navigation size={18} color={colors.black} fill={colors.black} />
                    </View>
                    <View style={styles.locationTextWrap}>
                        <View style={styles.locationRow}>
                            <Text style={styles.locationName} numberOfLines={1}>
                                {user ? "Home" : 'Select Location'}
                            </Text>
                            <ChevronDown size={14} color="#fff" strokeWidth={2.5} />
                        </View>
                        <Text style={styles.locationSub} numberOfLines={1}>
                            Connaught Place, New Delhi
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Cart Icon */}
                <TouchableOpacity
                    onPress={() => router.push('/(tabs)/home/cart' as any)}
                    style={styles.cartIconBtn}
                    activeOpacity={0.8}
                >
                    <ShoppingCart size={22} color="#fff" strokeWidth={2} />
                    {totalItems > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{totalItems}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* ── White Search Bar ── */}
            <View style={[styles.searchSection, { backgroundColor: colors.primary }]}>
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={() => router.push('/(tabs)/search' as any)}
                    activeOpacity={0.9}
                >
                    <Search size={16} color="#93959F" strokeWidth={2} />
                    <Text style={styles.searchPlaceholder}>Search for 'Biryani'</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={[styles.scroll, { backgroundColor: colors.surface }]}
                showsVerticalScrollIndicator={false}
            >
                {/* ── "LOWEST PRICE GUARANTEED" banner ── */}
                <View style={[styles.promoBanner, { backgroundColor: colors.primary }]}>
                    <Text style={styles.promoBannerText}>LOWEST PRICE GUARANTEED</Text>

                    {/* Stacked promo cards */}
                    <View style={styles.promoCardsWrap}>
                        {PROMO_CARDS.map((card, i) => (
                            <View
                                key={card.id}
                                style={[
                                    styles.promoCard,
                                    { backgroundColor: card.bg, zIndex: PROMO_CARDS.length - i },
                                    i === 0 && styles.promoCardFirst,
                                    i === 1 && styles.promoCardSecond,
                                    i === 2 && styles.promoCardThird,
                                ]}
                            >
                                <Text style={[styles.promoCardBig, { color: card.textColor }]}>{card.line1}</Text>
                                <Text style={[styles.promoCardSub, { color: card.textColor }]}>{card.line2}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* ── Category tiles (square with food image) ── */}
                {/* <View style={[styles.catSection, { backgroundColor: colors.background }]}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.catList}
                    >
                        {CATEGORIES.map((cat, i) => {
                            const active = selectedCategory === cat.label;
                            const imgUri = i > 0 ? RESTAURANTS[i - 1]?.image : null;
                            return (
                                <TouchableOpacity
                                    key={cat.label}
                                    style={[
                                        styles.catTile,
                                        active && [styles.catTileActive, { backgroundColor: colors.chipActiveBg }],
                                    ]}
                                    onPress={() => setSelectedCategory(cat.label)}
                                    activeOpacity={0.8}
                                >
                                    {imgUri ? (
                                        <Image source={{ uri: imgUri }} style={styles.catTileImg} />
                                    ) : (
                                        <Text style={styles.catTileEmoji}>{cat.emoji}</Text>
                                    )}
                                    <Text style={[
                                        styles.catTileLabel,
                                        { color: active ? '#fff' : colors.text },
                                        active && styles.catTileLabelActive,
                                    ]}>
                                        {cat.label.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View> */}

                {/* ── "Meals under ₹199" section ── */}
                {/* <View style={[styles.sectionHeader, { backgroundColor: colors.background }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Meals under <Text style={styles.sectionTitleBadge}>₹199</Text>
                    </Text>
                    <TouchableOpacity style={styles.seeAllBtn}>
                        <Text style={[styles.seeAllText, { color: colors.primary }]}>See All </Text>
                        <Text style={[styles.seeAllArrow, { color: colors.primary }]}><ChevronRightIcon size={18} color={colors.primary} /></Text>
                    </TouchableOpacity>
                </View> */}

                {/* Horizontal food item cards */}
                {/* <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[styles.foodCardList, { backgroundColor: colors.background }]}
                >
                    {RESTAURANTS.slice(0, 5).map(r => (
                        <FoodCard
                            key={r.id}
                            restaurant={r}
                            colors={colors}
                            onPress={() => goToRestaurant(r.id, r.name, r.deliveryFee)}
                        />
                    ))}
                </ScrollView> */}

                {/* ── Popular Brands ── */}
                <View style={[styles.sectionHeader, { backgroundColor: colors.background, marginTop: 8 }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Brands</Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[styles.brandList, { backgroundColor: colors.background }]}
                >
                    {RESTAURANTS.map(r => (
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

                {/* ── All Restaurants ── */}
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

// ── Horizontal food card (like "Meals under ₹99" in the image) ─────────────
function FoodCard({
    restaurant,
    colors,
    onPress,
}: {
    restaurant: Restaurant;
    colors: ReturnType<typeof useTheme>['colors'];
    onPress: () => void;
}) {
    const { addItem } = useCart();
    return (
        <TouchableOpacity style={[styles.foodCard, { backgroundColor: colors.card }]} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.foodCardImgWrap}>
                <Image source={{ uri: restaurant.image }} style={styles.foodCardImg} />
                {restaurant.badge && (
                    <View style={[styles.popularBadge, { backgroundColor: colors.green }]}>
                        <Text style={styles.popularBadgeText}>{restaurant.badge}</Text>
                    </View>
                )}
                {/* Pink + button */}
                <TouchableOpacity
                    style={[styles.foodCardAddBtn, { backgroundColor: colors.primary }]}
                    onPress={e => {
                        e.stopPropagation();
                        if (restaurant.menu[0]) {
                            addItem({
                                id: restaurant.menu[0].id,
                                name: restaurant.menu[0].name,
                                price: restaurant.menu[0].price,
                                restaurantId: restaurant.id,
                                restaurantName: restaurant.name,
                            });
                        }
                    }}
                    activeOpacity={0.85}
                >
                    <Text style={styles.foodCardAddBtnText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.foodCardInfo}>
                <View style={styles.foodCardVegRow}>
                    <View style={[styles.vegDot, { borderColor: colors.green }]}>
                        <View style={[styles.vegDotInner, { backgroundColor: colors.green }]} />
                    </View>
                    <Text style={[styles.foodCardName, { color: colors.text }]} numberOfLines={1}>
                        {restaurant.menu[0]?.name ?? restaurant.name}
                    </Text>
                </View>
                <Text style={[styles.foodCardRestaurant, { color: colors.textSecondary }]} numberOfLines={1}>
                    by {restaurant.name}
                </Text>
                <View style={styles.foodCardMeta}>
                    <Star size={10} color={colors.yellow} fill={colors.yellow} />
                    <Text style={[styles.foodCardRating, { color: colors.textSecondary }]}>
                        {restaurant.rating}
                    </Text>
                    <Text style={[styles.foodCardDot, { color: colors.textMuted }]}>·</Text>
                    <Clock size={10} color={colors.textMuted} strokeWidth={2} />
                    <Text style={[styles.foodCardTime, { color: colors.textMuted }]}>
                        {restaurant.deliveryTime}
                    </Text>
                </View>
                <Text style={[styles.foodCardPrice, { color: colors.text }]}>
                    ₹{restaurant.menu[0]?.price.toFixed(0) ?? '0'}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

// ── Vertical restaurant card ────────────────────────────────────────────────
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
                        <Star size={9} color="#fff" fill="#fff" />
                        <Text style={styles.ratingText}>{restaurant.rating}</Text>
                    </View>
                </View>
                <Text style={[styles.rCuisine, { color: colors.textSecondary }]} numberOfLines={1}>
                    {restaurant.cuisine}
                </Text>
                <View style={[styles.rDivider, { backgroundColor: colors.divider }]} />
                <View style={styles.rMeta}>
                    <Clock size={11} color={colors.textMuted} strokeWidth={2} />
                    <Text style={[styles.rMetaText, { color: colors.textMuted }]}>{restaurant.deliveryTime}</Text>
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

    // Header
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
        display: 'flex',
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationTextWrap: { flex: 1 },
    locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    locationName: { fontSize: 14, fontFamily: FontFamily.bold, color: '#fff', maxWidth: 150 },
    locationSub: { fontSize: 11, fontFamily: FontFamily.regular, color: 'rgba(255,255,255,0.75)', marginTop: 1 },
    cartIconBtn: { position: 'relative', padding: 4 },
    cartBadge: {
        position: 'absolute', top: 0, right: 0,
        minWidth: 16, height: 16, borderRadius: 8,
        backgroundColor: '#FFD700',
        justifyContent: 'center', alignItems: 'center',
        paddingHorizontal: 3,
    },
    cartBadgeText: { color: '#1C1C1C', fontSize: 9, fontFamily: FontFamily.black },

    // Search
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
    searchPlaceholder: { fontSize: 14, color: '#93959F', flex: 1, fontFamily: FontFamily.light },

    scroll: { flex: 1 },

    // Promo banner
    promoBanner: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 4,
    },
    promoBannerText: {
        fontSize: 18,
        // fontFamily: FontFamily.black,
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
    promoCardThird: { transform: [{ rotate: '3deg' }], zIndex: 20 },
    promoCardBig: { fontSize: 20, fontFamily: FontFamily.black },
    promoCardSub: { fontSize: 10, fontFamily: FontFamily.bold, marginTop: 2, lineHeight: 13 },

    // Categories
    catSection: { paddingVertical: 12 },
    catList: { paddingHorizontal: 16, gap: 10 },
    catTile: {
        width: 72,
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 4,
        backgroundColor: '#F2F2F2',
    },
    catTileActive: { borderRadius: 10 },
    catTileImg: { width: 48, height: 48, borderRadius: 8, marginBottom: 6 },
    catTileEmoji: { fontSize: 32, marginBottom: 6 },
    catTileLabel: { fontSize: 10, fontFamily: FontFamily.bold, textAlign: 'center', letterSpacing: 0.3 },
    catTileLabelActive: { color: '#fff' },

    // Section headers
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 10,
    },
    sectionTitle: { fontSize: 17, fontFamily: FontFamily.extraBold },
    sectionTitleBadge: { fontSize: 17, fontFamily: FontFamily.extraBold },
    sectionCount: { fontSize: 12, fontFamily: FontFamily.light },
    seeAllBtn: { flexDirection: 'row', alignItems: 'center' },
    seeAllText: { fontSize: 13, fontFamily: FontFamily.semiBold },
    seeAllArrow: { fontSize: 16, fontFamily: FontFamily.bold },

    // Food cards (horizontal)
    foodCardList: { paddingHorizontal: 16, paddingBottom: 12, gap: 12 },
    foodCard: {
        width: 150,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 2,
    },
    foodCardImgWrap: { position: 'relative' },
    foodCardImg: { width: '100%', height: 120, resizeMode: 'cover' },
    popularBadge: {
        position: 'absolute', top: 8, left: 8,
        borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2,
    },
    popularBadgeText: { color: '#fff', fontSize: 9, fontFamily: FontFamily.extraBold },
    foodCardAddBtn: {
        position: 'absolute', bottom: -14, right: 10,
        width: 28, height: 28, borderRadius: 14,
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#FC2D7C',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    foodCardAddBtnText: { color: '#fff', fontSize: 20, fontFamily: FontFamily.light, lineHeight: 24, marginTop: -2 },
    foodCardInfo: { padding: 10, paddingTop: 18 },
    foodCardVegRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 2 },
    vegDot: {
        width: 12, height: 12, borderRadius: 2,
        borderWidth: 1.5,
        justifyContent: 'center', alignItems: 'center',
    },
    vegDotInner: { width: 6, height: 6, borderRadius: 3 },
    foodCardName: { fontSize: 12, fontFamily: FontFamily.bold, flex: 1 },
    foodCardRestaurant: { fontSize: 11, marginBottom: 4 },
    foodCardMeta: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 4 },
    foodCardRating: { fontSize: 10 },
    foodCardDot: { fontSize: 10 },
    foodCardTime: { fontSize: 10 },
    foodCardPrice: { fontSize: 13, fontFamily: FontFamily.extraBold },

    // Brand logos
    brandList: { paddingHorizontal: 16, paddingBottom: 12, gap: 16 },
    brandItem: { alignItems: 'center', width: 64 },
    brandLogo: { width: 56, height: 56, borderRadius: 28, marginBottom: 6 },
    brandName: { fontSize: 10, fontFamily: FontFamily.semiBold, textAlign: 'center' },

    // Restaurant cards (vertical)
    rCard: {
        marginHorizontal: 16, marginBottom: 16,
        borderRadius: 14, overflow: 'hidden',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
    },
    rImgWrap: { position: 'relative' },
    rImg: { width: '100%', height: 160, resizeMode: 'cover' },
    rBadge: {
        position: 'absolute', top: 10, left: 10,
        borderRadius: 5, paddingHorizontal: 8, paddingVertical: 3,
    },
    rBadgeText: { color: '#fff', fontSize: 10, fontFamily: FontFamily.extraBold },
    rFreeBadge: {
        position: 'absolute', bottom: 10, left: 10,
        borderRadius: 4, paddingHorizontal: 7, paddingVertical: 3,
    },
    rFreeBadgeText: { color: '#fff', fontSize: 9, fontFamily: FontFamily.extraBold, letterSpacing: 0.5 },
    rInfo: { padding: 12 },
    rTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 },
    rName: { fontSize: 15, fontFamily: FontFamily.bold, flex: 1, marginRight: 8 },
    ratingPill: {
        flexDirection: 'row', alignItems: 'center', gap: 3,
        borderRadius: 5, paddingHorizontal: 6, paddingVertical: 3,
    },
    ratingText: { color: '#fff', fontSize: 11, fontFamily: FontFamily.bold },
    rCuisine: { fontSize: 12, marginBottom: 8, fontFamily: FontFamily.light },
    rDivider: { height: 1, marginBottom: 8 },
    rMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    rMetaText: { fontSize: 12, fontFamily: FontFamily.light },
    rDot: { width: 3, height: 3, borderRadius: 1.5 },
});
