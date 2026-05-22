import { useTheme } from '@/hooks/useTheme';
import { clearCart, updateQuantity, useCart } from '@/store/cartStore';
import { FontFamily } from '@/theme/fonts';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CartScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { items, totalPrice } = useCart();
    const { colors, isDark } = useTheme();
    const [orderPlaced, setOrderPlaced] = useState(false);

    const deliveryFee = items.length > 0 ? 0 : 0;
    const serviceFee = items.length > 0 ? 0 : 0;
    const total = totalPrice + deliveryFee + serviceFee;

    const handleCheckout = () => {
        setOrderPlaced(true);
        clearCart();
        setTimeout(() => {
            router.dismissAll();
            router.replace('/(tabs)/orders' as any);
        }, 2200);
    };

    if (orderPlaced) {
        return (
            <View style={[styles.root, styles.successRoot, { backgroundColor: colors.background }]}>
                <Stack.Screen options={{ headerShown: false }} />
                <Text style={styles.successEmoji}>🎉</Text>
                <Text style={[styles.successTitle, { color: colors.text }]}>Order Placed!</Text>
                <Text style={[styles.successSub, { color: colors.textSecondary }]}>
                    Your food is being prepared. Redirecting…
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.root, { backgroundColor: colors.surface }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={[styles.header, {
                backgroundColor: colors.background,
                borderBottomColor: colors.border,
                paddingTop: insets.top + 10,
            }]}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={[styles.backBtn, { backgroundColor: colors.iconBg }]}
                    activeOpacity={0.8}
                >
                    <ArrowLeft size={18} color={colors.text} strokeWidth={2.5} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Cart</Text>
                {items.length > 0 && (
                    <TouchableOpacity
                        onPress={() => clearCart()}
                        style={[styles.clearBtn, { backgroundColor: isDark ? '#2a1212' : '#FFF0F0' }]}
                    >
                        <Trash2 size={16} color="#E23744" />
                    </TouchableOpacity>
                )}
            </View>

            {items.length === 0 ? (
                <View style={styles.emptyWrap}>
                    <ShoppingCart size={72} color={colors.border} strokeWidth={1.2} />
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>Your cart is empty</Text>
                    <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
                        Add items from a restaurant to get started
                    </Text>
                    <TouchableOpacity
                        style={[styles.browseBtn, { backgroundColor: colors.primary }]}
                        onPress={() => router.replace('/(tabs)/home' as any)}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.browseBtnText}>Browse Restaurants</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                            <View style={styles.cardHeader}>
                                <MapPin size={15} color={colors.primary} />
                                <Text style={[styles.cardTitle, { color: colors.text }]}>Delivery Address</Text>
                            </View>
                            <Text style={[styles.addrTitle, { color: colors.text }]}>Home</Text>
                            <Text style={[styles.addrText, { color: colors.textSecondary }]}>
                                A-42, Connaught Place, New Delhi - 110001
                            </Text>
                            <TouchableOpacity>
                                <Text style={[styles.changeLink, { color: colors.primary }]}>Change</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Items */}
                        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                            <Text style={[styles.cardTitle, { color: colors.text, marginBottom: 12 }]}>
                                {items[0]?.restaurantName}
                            </Text>
                            {items.map((item, idx) => (
                                <View key={item.id}>
                                    <View style={styles.itemRow}>
                                        <View style={styles.itemInfo}>
                                            <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                                            <Text style={[styles.itemUnit, { color: colors.textMuted }]}>
                                                ₹{item.price.toFixed(0)} each
                                            </Text>
                                        </View>
                                        <View style={[styles.qtyRow, { backgroundColor: colors.primary }]}>
                                            <TouchableOpacity
                                                style={styles.qtyBtn}
                                                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus size={12} color="#fff" strokeWidth={3} />
                                            </TouchableOpacity>
                                            <Text style={styles.qtyVal}>{item.quantity}</Text>
                                            <TouchableOpacity
                                                style={styles.qtyBtn}
                                                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus size={12} color="#fff" strokeWidth={3} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={[styles.itemTotal, { color: colors.text }]}>
                                            ₹{(item.price * item.quantity).toFixed(0)}
                                        </Text>
                                    </View>
                                    {idx < items.length - 1 && (
                                        <View style={[styles.divider, { backgroundColor: colors.divider }]} />
                                    )}
                                </View>
                            ))}
                        </View>

                        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                            <Text style={[styles.cardTitle, { color: colors.text, marginBottom: 12 }]}>Payment</Text>
                            <View style={styles.payRow}>
                                <View style={[styles.cardIcon, { backgroundColor: colors.iconBg }]}>
                                    <Text style={styles.cardIconEmoji}>💳</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.cardName, { color: colors.text }]}>Visa •••• 4242</Text>
                                    <Text style={[styles.cardExpiry, { color: colors.textMuted }]}>Expires 12/27</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={[styles.changeLink, { color: colors.primary }]}>Change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                            <Text style={[styles.cardTitle, { color: colors.text, marginBottom: 12 }]}>Bill Details</Text>
                            {[
                                { label: 'Item total', value: totalPrice },
                                { label: 'Delivery fee', value: deliveryFee },
                                { label: 'Platform fee', value: serviceFee },
                            ].map(row => (
                                <View key={row.label} style={styles.billRow}>
                                    <Text style={[styles.billLabel, { color: colors.textSecondary }]}>{row.label}</Text>
                                    <Text style={[styles.billVal, { color: colors.text }]}>₹{row.value.toFixed(0)}</Text>
                                </View>
                            ))}
                            <View style={[styles.billDivider, { backgroundColor: colors.border }]} />
                            <View style={styles.billRow}>
                                <Text style={[styles.billTotal, { color: colors.text }]}>To Pay</Text>
                                <Text style={[styles.billTotalVal, { color: colors.primary }]}>₹{total.toFixed(0)}</Text>
                            </View>
                        </View>

                        <View style={{ height: 120 }} />
                    </ScrollView>

                    <View style={[styles.footer, {
                        backgroundColor: colors.background,
                        borderTopColor: colors.border,
                        paddingBottom: insets.bottom + 8,
                    }]}>
                        <View style={styles.footerMeta}>
                            <Text style={[styles.footerTotal, { color: colors.text }]}>₹{total.toFixed(0)}</Text>
                            <Text style={[styles.footerSub, { color: colors.textMuted }]}>Total bill</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.placeBtn, { backgroundColor: colors.primary }]}
                            onPress={handleCheckout}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.placeBtnText}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    successRoot: { justifyContent: 'center', alignItems: 'center', padding: 32 },
    successEmoji: { fontSize: 64, marginBottom: 16 },
    successTitle: { fontSize: 26, fontFamily: FontFamily.extraBold, marginBottom: 8 },
    successSub: { fontSize: 14, textAlign: 'center', fontFamily: FontFamily.regular, },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        gap: 12,
    },
    backBtn: {
        width: 36, height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { flex: 1, fontSize: 18, fontFamily: FontFamily.bold },
    clearBtn: {
        width: 36, height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
    emptyTitle: { fontSize: 20, fontFamily: FontFamily.bold, marginTop: 20, marginBottom: 8 },
    emptySub: { fontSize: 14, textAlign: 'center', marginBottom: 28, fontFamily: FontFamily.regular, },
    browseBtn: {
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 10,
    },
    browseBtnText: { color: '#fff', fontSize: 15, fontFamily: FontFamily.bold },

    scroll: { flex: 1 },
    card: {
        marginHorizontal: 16,
        marginTop: 14,
        borderRadius: 14,
        padding: 16,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
    cardTitle: { fontSize: 15, fontFamily: FontFamily.bold },
    addrTitle: { fontSize: 14, fontFamily: FontFamily.semiBold, marginBottom: 3 },
    addrText: { fontSize: 13, lineHeight: 18, marginBottom: 6, fontFamily: FontFamily.regular },
    changeLink: { fontSize: 13, fontFamily: FontFamily.semiBold },

    itemRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 },
    itemInfo: { flex: 1 },
    itemName: { fontSize: 14, fontFamily: FontFamily.semiBold, marginBottom: 2 },
    itemUnit: { fontSize: 12, fontFamily: FontFamily.light, },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 5,
        gap: 8,
    },
    qtyBtn: { padding: 1 },
    qtyVal: { color: '#fff', fontSize: 13, fontFamily: FontFamily.extraBold, minWidth: 16, textAlign: 'center' },
    itemTotal: { fontSize: 14, fontFamily: FontFamily.bold, minWidth: 50, textAlign: 'right' },
    divider: { height: 1, marginVertical: 8 },

    payRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    cardIcon: {
        width: 40, height: 28,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardIconEmoji: { fontSize: 16 },
    cardName: { fontSize: 14, fontFamily: FontFamily.semiBold },
    cardExpiry: { fontSize: 12, fontFamily: FontFamily.light, },

    billRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
    billLabel: { fontSize: 13, fontFamily: FontFamily.regular },
    billVal: { fontSize: 13, fontFamily: FontFamily.regular },
    billDivider: { height: 1, marginVertical: 8 },
    billTotal: { fontSize: 15, fontFamily: FontFamily.bold },
    billTotalVal: { fontSize: 16, fontFamily: FontFamily.extraBold },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
        gap: 16,
    },
    footerMeta: {},
    footerTotal: { fontSize: 17, fontFamily: FontFamily.extraBold },
    footerSub: { fontSize: 11, marginTop: 1, fontFamily: FontFamily.light, },
    placeBtn: {
        flex: 1,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#FC2D7C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    placeBtnText: { color: '#fff', fontSize: 16, fontFamily: FontFamily.bold },
});
