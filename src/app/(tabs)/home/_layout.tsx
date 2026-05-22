import { useTheme } from '@/hooks/useTheme';
import { FontFamily } from '@/theme/fonts';
import { Stack } from 'expo-router';

/**
 * Home stack navigator.
 *
 * Screens:
 *  - index      → no header (custom top bar rendered inside the screen)
 *  - restaurant → VISIBLE custom native header: orange bg, white tint, "Back" label,
 *                 dynamic title from route params. The animated cover image sits
 *                 below the header and collapses on scroll.
 *  - cart       → no header (custom header rendered inside the screen)
 */
export default function HomeStackLayout() {
    const { colors, isDark } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: '#fff',
                headerTitleStyle: { fontFamily: FontFamily.bold, fontSize: 17 },
                headerBackTitle: 'Back',
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />

            {/* Custom stack header — title from params, orange bg, white back label */}
            <Stack.Screen
                name="restaurant"
                options={({ route }) => ({
                    headerShown: true,
                    title: (route.params as any)?.name ?? 'Restaurant',
                    presentation: 'card',
                })}
            />

            <Stack.Screen
                name="cart"
                options={{ headerShown: false, presentation: 'card' }}
            />
        </Stack>
    );
}
