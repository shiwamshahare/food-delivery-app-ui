import { MOCK_ORDERS } from '@/data/restaurants';
import { useTheme } from '@/hooks/useTheme';
import { FontFamily } from '@/theme/fonts';
import { ChevronRight, Clock, Package, RotateCcw } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrdersScreen() {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.primary }]} edges={['top']}>
            {/* Pink header */}
            <View style={[styles.header, { backgroundColor: colors.primary }]}>
                <Text style={styles.headerTitle}>Orders</Text>
                <Text style={styles.headerSub}>Your food journey</Text>
            </View>

            <ScrollView
                style={[styles.scroll, { backgroundColor: colors.surface }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Active order banner */}
                <View style={[styles.activeBanner, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                    <View style={[styles.activeBannerIcon, { backgroundColor: colors.primaryLight }]}>
                        <Clock size={22} color={colors.primary} strokeWidth={2} />
                    </View>
                    <View style={styles.activeBannerText}>
                        <Text style={[styles.activeBannerTitle, { color: colors.text }]}>No active orders</Text>
                        <Text style={[styles.activeBannerSub, { color: colors.textSecondary }]}>
                            Order something delicious!
                        </Text>
                    </View>
                </View>

                {/* Past orders */}
                <Text style={[styles.sectionLabel, { color: colors.text }]}>Past Orders</Text>

                {MOCK_ORDERS.map(order => (
                    <View
                        key={order.id}
                        style={[styles.orderCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
                    >
                        {/* Top row */}
                        <View style={styles.orderTop}>
                            <View style={[styles.orderIcon, { backgroundColor: colors.primaryLight }]}>
                                <Package size={20} color={colors.primary} strokeWidth={1.8} />
                            </View>
                            <View style={styles.orderMeta}>
                                <Text style={[styles.orderRestaurant, { color: colors.text }]}>
                                    {order.restaurantName}
                                </Text>
                                <Text style={[styles.orderDate, { color: colors.textMuted }]}>{order.date}</Text>
                            </View>
                            <View style={styles.orderRight}>
                                <Text style={[styles.orderTotal, { color: colors.text }]}>
                                    ₹{order.total.toFixed(0)}
                                </Text>
                                <View style={[styles.statusPill, { backgroundColor: colors.greenBg }]}>
                                    <Text style={[styles.statusText, { color: colors.green }]}>{order.status}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Items */}
                        <View style={[styles.orderDivider, { backgroundColor: colors.divider }]} />
                        <View style={styles.orderItems}>
                            {order.items.map((item, i) => (
                                <Text key={i} style={[styles.orderItem, { color: colors.textSecondary }]}>
                                    • {item}
                                </Text>
                            ))}
                        </View>

                        {/* Actions */}
                        <View style={[styles.orderActions, { borderTopColor: colors.border }]}>
                            <TouchableOpacity
                                style={[styles.reorderBtn, { backgroundColor: colors.primary }]}
                                activeOpacity={0.85}
                            >
                                <RotateCcw size={13} color="#fff" strokeWidth={2.5} />
                                <Text style={styles.reorderText}>Reorder</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.detailsBtn} activeOpacity={0.8}>
                                <Text style={[styles.detailsText, { color: colors.primary }]}>View Details</Text>
                                <ChevronRight size={14} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: {
        paddingHorizontal: 16,
        paddingTop: 6,
        paddingBottom: 16,
    },
    headerTitle: { fontSize: 22, fontFamily: FontFamily.black, color: '#fff' },
    headerSub: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2, fontFamily: FontFamily.light },
    scroll: { flex: 1 },

    activeBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        borderRadius: 14,
        padding: 16,
        gap: 14,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
    activeBannerIcon: {
        width: 46, height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeBannerText: { flex: 1 },
    activeBannerTitle: { fontSize: 14, fontFamily: FontFamily.bold },
    activeBannerSub: { fontSize: 12, marginTop: 2, fontFamily: FontFamily.light },

    sectionLabel: {
        fontSize: 16,
        fontFamily: FontFamily.extraBold,
        paddingHorizontal: 16,
        paddingBottom: 10,
    },

    orderCard: {
        marginHorizontal: 16,
        marginBottom: 14,
        borderRadius: 14,
        padding: 14,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
    orderTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    orderIcon: {
        width: 42, height: 42,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderMeta: { flex: 1 },
    orderRestaurant: { fontSize: 14, fontFamily: FontFamily.bold },
    orderDate: { fontSize: 12, marginTop: 2, fontFamily: FontFamily.medium },
    orderRight: { alignItems: 'flex-end', gap: 5 },
    orderTotal: { fontSize: 14, fontFamily: FontFamily.bold },
    statusPill: {
        borderRadius: 6,
        paddingHorizontal: 7,
        paddingVertical: 2,
    },
    statusText: { fontSize: 11, fontFamily: FontFamily.bold },

    orderDivider: { height: 1, marginVertical: 10 },
    orderItems: { gap: 3, marginBottom: 12 },
    orderItem: { fontSize: 12, fontFamily: FontFamily.regular },

    orderActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingTop: 10,
    },
    reorderBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    reorderText: { color: '#fff', fontSize: 13, fontFamily: FontFamily.bold },
    detailsBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    detailsText: { fontSize: 13, fontFamily: FontFamily.medium },
});
