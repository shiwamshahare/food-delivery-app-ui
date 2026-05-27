
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useTheme } from '@/hooks/useTheme';
import { FontFamily } from '@/theme/fonts';
import HomeScreen from '@/screens/HomeScreen';
import RestaurantDetailScreen from '@/screens/RestaurantDetailScreen';
import CartScreen from '@/screens/CartScreen';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: FontFamily.bold, fontSize: 17 },
        headerBackTitle: 'Back',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={({ route }) => ({
          headerShown: true,
          title: route.params?.name ?? 'Restaurant',
          presentation: 'card',
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false, presentation: 'card' }}
      />
    </Stack.Navigator>
  );
}
