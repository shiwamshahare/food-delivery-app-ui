
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { useCart } from '@/store/cartStore';
import { FontFamily } from '@/theme/fonts';
import HomeStackNavigator from './HomeStack';
import SearchScreen from '@/screens/SearchScreen';
import OrdersScreen from '@/screens/OrdersScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const HIDE_TABBAR_ROUTES = ['RestaurantDetail', 'Cart'];

function getTabBarStyle(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  if (HIDE_TABBAR_ROUTES.includes(routeName)) {
    return { display: 'none' as const };
  }
  return undefined;
}

export default function TabNavigator() {
  const { colors } = useTheme();
  const { totalItems } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#068234',
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
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
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={({ route }) => ({
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarStyle: getTabBarStyle(route)
            ? { display: 'none' as const }
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
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-outline" size={size} color={color} />
          ),
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#FC8019',
            fontSize: 10,
            fontFamily: FontFamily.bold,
            minWidth: 18,
            height: 18,
            lineHeight: 18,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
