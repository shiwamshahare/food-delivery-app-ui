
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';

import { useFonts } from '@/hooks/useFonts';
import { useTheme } from '@/hooks/useTheme';
import RootNavigator from '@/navigation/RootNavigator';

// ── Deep Linking Configuration ──────────────────────────────────────────────
const linking = {
  prefixes: ['foodapp://'],
  config: {
    screens: {
      Main: {
        screens: {
          Tabs: {
            screens: {
              HomeStack: {
                screens: {
                  RestaurantDetail: 'restaurant/:id',
                },
              },
            },
          },
        },
      },
    },
  },
};

export default function App() {
  const { isDark } = useTheme();
  const { fontsLoaded, fontError } = useFonts();

  if (!fontsLoaded && !fontError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0c8910',
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Set default font for all Text / TextInput
  if (fontsLoaded) {
    // @ts-ignore
    Text.defaultProps = Text.defaultProps || {};
    // @ts-ignore
    Text.defaultProps.style = { fontFamily: 'Poppins_400Regular' };
    // @ts-ignore
    TextInput.defaultProps = TextInput.defaultProps || {};
    // @ts-ignore
    TextInput.defaultProps.style = { fontFamily: 'Poppins_400Regular' };
  }

  return (
    <NavigationContainer linking={linking as any}>
      <RootNavigator />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}
