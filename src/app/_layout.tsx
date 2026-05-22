import { useFonts } from "@/hooks/useFonts";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/store/authStore";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
} from "react-native";

function NavigationGuard() {
  const { user, isLoading, hasOnboarded } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = (segments as string[])[0] === "(auth)";
    const inOnboarding = (segments as string[])[0] === "onboarding";

    if (!user) {
      if (!hasOnboarded && !inOnboarding) {
        router.replace("/onboarding" as any);
      } else if (hasOnboarded && !inAuthGroup) {
        router.replace("/(auth)/login" as any);
      }
    } else {
      if (inAuthGroup || inOnboarding) {
        router.replace("/(tabs)/home" as any);
      }
    }
  }, [user, isLoading, hasOnboarded, segments]);

  return null;
}

function RootLayoutInner() {
  useFrameworkReady();
  const { isDark } = useTheme();
  const { fontsLoaded, fontError } = useFonts();

  // Show loading screen while fonts are loading
  if (!fontsLoaded && !fontError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FC2D7C",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Set default font for all Text components
  if (fontsLoaded) {
    // @ts-ignore - Setting default props for Text
    Text.defaultProps = Text.defaultProps || {};
    // @ts-ignore
    Text.defaultProps.style = { fontFamily: "Poppins_400Regular" };

    // @ts-ignore - Setting default props for TextInput
    TextInput.defaultProps = TextInput.defaultProps || {};
    // @ts-ignore
    TextInput.defaultProps.style = { fontFamily: "Poppins_400Regular" };
  }

  return (
    <>
      <NavigationGuard />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="drawer"
          options={{
            presentation: "transparentModal",
            animation: "none",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="help"
          options={{
            presentation: "card",
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            presentation: "card",
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  );
}

export default function RootLayout() {
  return <RootLayoutInner />;
}
