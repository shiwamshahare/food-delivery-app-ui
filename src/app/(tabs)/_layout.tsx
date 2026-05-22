import { useTheme } from '@/hooks/useTheme';
import { useCart } from '@/store/cartStore';
import { FontFamily } from '@/theme/fonts';
import { Tabs, useSegments } from 'expo-router';
import { Home, Search, ShoppingBag, User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function CartTabIcon({ color, size }: { color: string; size: number }) {
    const { totalItems } = useCart();
    return (
        <View style={{ position: 'relative' }}>
            <ShoppingBag size={size} color={color} strokeWidth={1.8} />
            {/* {totalItems > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalItems > 9 ? '9+' : totalItems}</Text>
                </View>
            )} */}
        </View>
    );
}

const HIDE_TABBAR = ['restaurant', 'cart'];

export default function TabsLayout() {
    const segments = useSegments();
    const { colors } = useTheme();
    const last = segments[segments.length - 1] as string;
    const hideTabBar = HIDE_TABBAR.includes(last);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#068234ff',
                tabBarInactiveTintColor: colors.textMuted,
                tabBarStyle: hideTabBar
                    ? { display: 'none' }
                    : {
                        backgroundColor: colors.tabBar,
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderTopColor: colors.tabBarBorder,
                        paddingBottom: 4,
                        paddingTop: 6,
                        height: 62,
                        shadowColor: colors.shadow,
                        shadowOffset: { width: 0, height: -2 },
                        shadowOpacity: 0.06,
                        shadowRadius: 8,
                        elevation: 10,
                    },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontFamily: FontFamily.semiBold,
                    marginTop: 2,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Home size={size} color={color} strokeWidth={1.8} />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <Search size={size} color={color} strokeWidth={1.8} />
                    ),
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: 'Orders',
                    tabBarIcon: ({ color, size }) => <CartTabIcon color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <User size={size} color={color} strokeWidth={1.8} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: -5,
        right: -7,
        backgroundColor: '#FC8019',
        borderRadius: 8,
        minWidth: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#fff',
        paddingHorizontal: 2,
    },
    badgeText: { color: '#fff', fontSize: 8, fontWeight: '900' },
});
