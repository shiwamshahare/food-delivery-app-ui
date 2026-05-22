import { MenuItem, RESTAURANTS } from '@/data/restaurants';
import { useTheme } from '@/hooks/useTheme';
import { addItem, updateQuantity, useCart } from '@/store/cartStore';
import { FontFamily } from '@/theme/fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Clock, Minus, Plus, Star, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Animated,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_MAX = 240;
const HEADER_MIN = Platform.OS === 'ios' ? 88 : 0;
const SCROLL_DIST = HEADER_MAX - HEADER_MIN;

export default function RestaurantScreen() {
    const params = useLocalSearchParams<{ id: string; name: string; deliveryFee: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets(); // kept for cart CTA bottom padding
    const { items } = useCart();
    const { colors } = useTheme();
    const [selectedCat, setSelectedCat] = useState('All');

    const restaurant = RESTAURANTS.find(r => r.id === params.id) ?? RESTAURANTS[0];
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const categories = ['All', ...Array.from(new Set(restaurant.menu.map((m: MenuItem) => m.category)))];
    const filteredMenu =
        selectedCat === 'All'
            ? restaurant.menu
            : restaurant.menu.filter((m: MenuItem) => m.category === selectedCat);

    const getQty = (id: string) => items.find(i => i.id === id)?.quantity ?? 0;
    const totalInCart = items.reduce((s, i) => s + i.quantity, 0);
    const cartTotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

    const headerH = scrollY.interpolate({
        inputRange: [0, SCROLL_DIST],
        outputRange: [HEADER_MAX, HEADER_MIN],
        extrapolate: 'clamp',
    });
    const imgOpacity = scrollY.interpolate({
        inputRange: [0, SCROLL_DIST * 0.6, SCROLL_DIST],
        outputRange: [1, 0.4, 0],
        extrapolate: 'clamp',
    });
    const titleOpacity = scrollY.interpolate({
        inputRange: [SCROLL_DIST - 30, SCROLL_DIST],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    return (
        <View style={[styles.root, { backgroundColor: colors.surface }]}>
            {/* Native stack header is shown (configured in home/_layout.tsx):
                orange background, white tint, "Back" label, restaurant name as title */}
            <Stack.Screen options={{ headerShown: true, title: params.name ?? restaurant.name }} />

            {/* Animated cover — sits below the native header */}
            <Animated.View style={[styles.cover, { height: headerH }]}>
                <Animated.Image
                    source={{ uri: restaurant.coverImage }}
                    style={[styles.coverImg, { opacity: imgOpacity }]}
                />
                <LinearGradient
                    colors={['rgba(0,0,0,0.35)', 'transparent', 'rgba(0,0,0,0.45)']}
                    style={StyleSheet.absoluteFillObject}
                />
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{ paddingTop: HEADER_MAX }}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Info card ── */}
                <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                    <Text style={[styles.rName, { color: colors.text }]}>{restaurant.name}</Text>
                    <Text style={[styles.rCuisine, { color: colors.textSecondary }]}>{restaurant.cuisine}</Text>

                    {/* Stats row */}
                    <View style={[styles.statsRow, { borderColor: colors.border }]}>
                        <View style={styles.statItem}>
                            <View style={[styles.ratingPill, { backgroundColor: colors.green }]}>
                                <Star size={11} color="#fff" fill="#fff" />
                                <Text style={styles.ratingVal}>{restaurant.rating}</Text>
                            </View>
                            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Rating</Text>
                        </View>
                        <View style={[styles.statSep, { backgroundColor: colors.border }]} />
                        <View style={styles.statItem}>
                            <View style={styles.statIconRow}>
                                <Clock size={14} color={colors.primary} strokeWidth={2} />
                                <Text style={[styles.statVal, { color: colors.text }]}>{restaurant.deliveryTime}</Text>
                            </View>
                            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Delivery</Text>
                        </View>
                        <View style={[styles.statSep, { backgroundColor: colors.border }]} />
                        <View style={styles.statItem}>
                            <View style={styles.statIconRow}>
                                <Zap size={14} color={colors.primary} strokeWidth={2} />
                                <Text style={[styles.statVal, { color: colors.text }]}>
                                    {restaurant.deliveryFee === 0 ? 'Free' : `₹${restaurant.deliveryFee}`}
                                </Text>
                            </View>
                            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Delivery fee</Text>
                        </View>
                    </View>

                    {/* Offer strip */}
                    <View style={[styles.offerStrip, { backgroundColor: colors.primaryLight, borderColor: colors.primaryBorder }]}>
                        <Text style={[styles.offerStripText, { color: colors.primary }]}>
                            🎉  Min. order ₹{restaurant.minOrder} · Free delivery on orders above ₹299
                        </Text>
                    </View>
                </View>

                {/* ── Category tabs ── */}
                <View style={[styles.catBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catBarList}>
                        {categories.map(cat => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.catTab,
                                    selectedCat === cat && [styles.catTabActive, { borderBottomColor: colors.primary }],
                                ]}
                                onPress={() => setSelectedCat(cat)}
                            >
                                <Text style={[
                                    styles.catTabText,
                                    { color: selectedCat === cat ? colors.primary : colors.textSecondary },
                                    selectedCat === cat && styles.catTabTextActive,
                                ]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* ── Menu items ── */}
                <View style={[styles.menuList, { backgroundColor: colors.card }]}>
                    {filteredMenu.map((item: MenuItem, idx: number) => {
                        const qty = getQty(item.id);
                        const isLast = idx === filteredMenu.length - 1;
                        return (
                            <View key={item.id}>
                                <View style={styles.menuRow}>
                                    {/* Text side */}
                                    <View style={styles.menuText}>
                                        <Text style={[styles.menuName, { color: colors.text }]}>{item.name}</Text>
                                        <Text style={[styles.menuDesc, { color: colors.textMuted }]} numberOfLines={2}>
                                            {item.description}
                                        </Text>
                                        <Text style={[styles.menuPrice, { color: colors.text }]}>
                                            ₹{item.price.toFixed(0)}
                                        </Text>
                                    </View>

                                    {/* Image + ADD button */}
                                    <View style={styles.menuImgWrap}>
                                        <Image source={{ uri: item.image }} style={styles.menuImg} />
                                        {qty === 0 ? (
                                            <TouchableOpacity
                                                style={[styles.addBtn, { backgroundColor: colors.card, borderColor: colors.primary }]}
                                                onPress={() => addItem({
                                                    id: item.id,
                                                    name: item.name,
                                                    price: item.price,
                                                    restaurantId: restaurant.id,
                                                    restaurantName: restaurant.name,
                                                })}
                                                activeOpacity={0.8}
                                            >
                                                <Text style={[styles.addBtnText, { color: colors.primary }]}>ADD</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <View style={[styles.qtyControl, { backgroundColor: colors.primary }]}>
                                                <TouchableOpacity
                                                    style={styles.qtyBtn}
                                                    onPress={() => updateQuantity(item.id, qty - 1)}
                                                >
                                                    <Minus size={13} color="#fff" strokeWidth={3} />
                                                </TouchableOpacity>
                                                <Text style={styles.qtyVal}>{qty}</Text>
                                                <TouchableOpacity
                                                    style={styles.qtyBtn}
                                                    onPress={() => updateQuantity(item.id, qty + 1)}
                                                >
                                                    <Plus size={13} color="#fff" strokeWidth={3} />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                </View>
                                {!isLast && <View style={[styles.menuDivider, { backgroundColor: colors.divider }]} />}
                            </View>
                        );
                    })}
                </View>

                <View style={{ height: 120 }} />
            </Animated.ScrollView>

            {/* ── View Cart CTA ── */}
            {totalInCart > 0 && (
                <View style={[styles.cartBar, { paddingBottom: insets.bottom + 8, backgroundColor: 'transparent' }]}>
                    <TouchableOpacity
                        style={[styles.cartBarBtn, { backgroundColor: colors.primary }]}
                        onPress={() => router.push('/(tabs)/home/cart' as any)}
                        activeOpacity={0.9}
                    >
                        <View style={styles.cartBarLeft}>
                            <View style={styles.cartBarBadge}>
                                <Text style={styles.cartBarBadgeText}>{totalInCart}</Text>
                            </View>
                            <Text style={styles.cartBarLabel}>View Cart</Text>
                        </View>
                        <Text style={styles.cartBarPrice}>₹{cartTotal.toFixed(0)}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    cover: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        overflow: 'hidden',
        zIndex: 10,
        backgroundColor: '#333',
    },
    coverImg: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        resizeMode: 'cover',
    },
    compactBar: {
        // kept for reference — no longer rendered since native header is used
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: HEADER_MIN,
        justifyContent: 'flex-end',
        paddingBottom: 14,
        paddingHorizontal: 56,
        alignItems: 'center',
    },
    compactTitle: { fontSize: 16, fontFamily: FontFamily.bold },
    backBtn: {
        // kept for reference — native header back button is used instead
        position: 'absolute',
        left: 14,
        zIndex: 20,
        width: 36, height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    infoCard: {
        paddingHorizontal: 16,
        paddingTop: 18,
        paddingBottom: 14,
    },
    rName: { fontSize: 22, fontFamily: FontFamily.extraBold, marginBottom: 4, letterSpacing: -0.3 },
    rCuisine: { fontSize: 13, marginBottom: 14, fontFamily: FontFamily.medium },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 12,
        marginBottom: 14,
    },
    statItem: { flex: 1, alignItems: 'center', gap: 5 },
    statIconRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ratingPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    ratingVal: { color: '#fff', fontSize: 12, fontFamily: FontFamily.bold },
    statVal: { fontSize: 13, fontFamily: FontFamily.bold },
    statLabel: { fontSize: 11, fontFamily: FontFamily.medium },
    statSep: { width: 1, height: 32 },
    offerStrip: {
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 9,
    },
    offerStripText: { fontSize: 12, fontFamily: FontFamily.semiBold },

    catBar: { borderBottomWidth: 1 },
    catBarList: { paddingHorizontal: 16, gap: 0 },
    catTab: {
        paddingHorizontal: 14,
        paddingVertical: 13,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        marginRight: 4,
    },
    catTabActive: {},
    catTabText: { fontSize: 13, fontFamily: FontFamily.semiBold },
    catTabTextActive: { fontFamily: FontFamily.bold },

    menuList: { paddingHorizontal: 16 },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 16,
        gap: 12,
    },
    menuText: { flex: 1 },
    menuName: { fontSize: 14, fontFamily: FontFamily.bold, marginBottom: 4 },
    menuDesc: { fontSize: 12, lineHeight: 17, marginBottom: 8, fontFamily: FontFamily.semiBold },
    menuPrice: { fontSize: 14, fontFamily: FontFamily.bold },
    menuImgWrap: { alignItems: 'center', gap: 8 },
    menuImg: { width: 96, height: 80, borderRadius: 10 },
    addBtn: {
        width: 80,
        height: 32,
        borderRadius: 6,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtnText: { fontSize: 13, fontFamily: FontFamily.extraBold, letterSpacing: 0.5 },
    qtyControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        width: 80,
        height: 32,
        justifyContent: 'space-between',
        paddingHorizontal: 6,
    },
    qtyBtn: { padding: 2 },
    qtyVal: { color: '#fff', fontSize: 13, fontFamily: FontFamily.extraBold, minWidth: 18, textAlign: 'center' },
    menuDivider: { height: 1, marginHorizontal: -16 },

    cartBar: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    cartBarBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 18,
        shadowColor: '#FC2D7C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 8,
    },
    cartBarLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    cartBarBadge: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: 6,
        minWidth: 24, height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    cartBarBadgeText: { color: '#fff', fontSize: 12, fontFamily: FontFamily.extraBold },
    cartBarLabel: { color: '#fff', fontSize: 15, fontFamily: FontFamily.bold },
    cartBarPrice: { color: '#fff', fontSize: 15, fontFamily: FontFamily.bold },
});
