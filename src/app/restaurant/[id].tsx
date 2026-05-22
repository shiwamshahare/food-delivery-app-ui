/**
 * Deep link handler: foodapp://restaurant/123
 *
 * Expo Router maps the URL scheme + path directly to file-based routes.
 * This file catches  /restaurant/[id]  and immediately redirects into
 * the proper nested route inside the Home stack, passing the id as a param.
 *
 * Usage:
 *   foodapp://restaurant/1   →  opens Burger Palace detail screen
 *   foodapp://restaurant/2   →  opens Sushi Zen detail screen
 */
import { RESTAURANTS } from '@/data/restaurants';
import { Redirect, useLocalSearchParams } from 'expo-router';

export default function RestaurantDeepLink() {
    const { id } = useLocalSearchParams<{ id: string }>();

    // Find the restaurant so we can pass name + deliveryFee as params
    const restaurant = RESTAURANTS.find(r => r.id === id) ?? RESTAURANTS[0];

    return (
        <Redirect
            href={{
                pathname: '/(tabs)/home/restaurant' as any,
                params: {
                    id: restaurant.id,
                    name: restaurant.name,
                    deliveryFee: String(restaurant.deliveryFee),
                },
            }}
        />
    );
}
