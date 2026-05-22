import { RESTAURANTS, Restaurant } from '@/data/restaurants';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeColors } from '@/theme/colors';
import { FontFamily } from '@/theme/fonts';
import { useRouter } from 'expo-router';
import { Clock, Search, Star, TrendingUp, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TRENDING = ['Biryani', 'Dosa', 'Butter Chicken', 'Paneer Tikka', 'Chaat', 'Thali'];

function RestaurantRow({
    restaurant,
    colors,
    onPress,
}: {
    restaurant: Restaurant;
    colors: ThemeColors;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            style={[styles.rRow, { borderBottomColor: colors.divider }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Image source={{ uri: restaurant.image }} style={styles.rImg} />
            <View style={styles.rInfo}>
                <Text style={[styles.rName, { color: colors.text }]}>{restaurant.name}</Text>
                <Text style={[styles.rCuisine, { color: colors.textSecondary }]}>{restaurant.cuisine}</Text>
                <View style={styles.rMeta}>
                    <View style={[styles.ratingPill, { backgroundColor: colors.green }]}>
                        <Star size={9} color="#fff" fill="#fff" />
                        <Text style={styles.ratingText}>{restaurant.rating}</Text>
                    </View>
                    <Text style={[styles.rMetaDot, { color: colors.textMuted }]}>·</Text>
                    <Clock size={11} color={colors.textMuted} strokeWidth={2} />
                    <Text style={[styles.rMetaText, { color: colors.textMuted }]}>{restaurant.deliveryTime}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default function SearchScreen() {
    const { colors } = useTheme();
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const router = useRouter();

    const results =
        query.trim().length > 0
            ? RESTAURANTS.filter(
                (r: Restaurant) =>
                    r.name.toLowerCase().includes(query.toLowerCase()) ||
                    r.cuisine.toLowerCase().includes(query.toLowerCase())
            )
            : [];

    const goToRestaurant = (id: string, name: string, deliveryFee: number) => {
        router.push({
            pathname: '/(tabs)/home/restaurant' as any,
            params: { id, name, deliveryFee: String(deliveryFee) },
        });
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.primary }]} edges={['top']}>
            {/* Pink header with search */}
            <View style={[styles.header, { backgroundColor: colors.primary }]}>
                <Text style={styles.headerTitle}>Search</Text>
                <View style={[
                    styles.searchBar,
                    { borderColor: focused ? colors.primary : 'transparent' },
                ]}>
                    <Search size={16} color={focused ? colors.primary : '#93959F'} strokeWidth={2} />
                    <TextInput
                        ref={inputRef}
                        style={[styles.searchInput, { color: colors.black }]}
                        placeholder="Search restaurants, cuisines…"
                        placeholderTextColor="#93959F"
                        value={query}
                        onChangeText={setQuery}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        autoCorrect={false}
                        returnKeyType="search"
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery('')}>
                            <X size={15} color="#93959F" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <ScrollView
                style={[styles.scroll, { backgroundColor: colors.surface }]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {query.trim().length === 0 ? (
                    <>
                        {/* Trending */}
                        <View style={[styles.section, { backgroundColor: colors.card }]}>
                            <View style={styles.sectionHead}>
                                <TrendingUp size={15} color={colors.primary} strokeWidth={2} />
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>Trending Searches</Text>
                            </View>
                            <View style={styles.trendGrid}>
                                {TRENDING.map(term => (
                                    <TouchableOpacity
                                        key={term}
                                        style={[styles.trendChip, {
                                            backgroundColor: colors.primaryLight,
                                            borderColor: colors.primaryBorder,
                                        }]}
                                        onPress={() => setQuery(term)}
                                    >
                                        <Text style={[styles.trendText, { color: colors.primary }]}>{term}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* All restaurants */}
                        <View style={[styles.section, { backgroundColor: colors.card }]}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>All Restaurants</Text>
                            {RESTAURANTS.map((r: Restaurant) => (
                                <RestaurantRow
                                    key={r.id}
                                    restaurant={r}
                                    colors={colors}
                                    onPress={() => goToRestaurant(r.id, r.name, r.deliveryFee)}
                                />
                            ))}
                        </View>
                    </>
                ) : results.length > 0 ? (
                    <View style={[styles.section, { backgroundColor: colors.card }]}>
                        <Text style={[styles.resultLabel, { color: colors.textSecondary }]}>
                            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                        </Text>
                        {results.map((r: Restaurant) => (
                            <RestaurantRow
                                key={r.id}
                                restaurant={r}
                                colors={colors}
                                onPress={() => goToRestaurant(r.id, r.name, r.deliveryFee)}
                            />
                        ))}
                    </View>
                ) : (
                    <View style={styles.noResults}>
                        <Text style={styles.noResultsEmoji}>🔍</Text>
                        <Text style={[styles.noResultsTitle, { color: colors.text }]}>No results found</Text>
                        <Text style={[styles.noResultsSub, { color: colors.textSecondary }]}>
                            Try a different search term
                        </Text>
                    </View>
                )}

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
        paddingBottom: 14,
        gap: 10,
    },
    headerTitle: { fontSize: 22, fontFamily: FontFamily.black, color: '#fff', marginBottom: 8 },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderWidth: 1.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,

    },
    searchInput: {
        flex: 1, fontSize: 13, padding: 0, margin: 0, alignItems: 'center', fontFamily: FontFamily.regular
    },
    scroll: { flex: 1 },
    section: {
        marginHorizontal: 16,
        marginTop: 14,
        borderRadius: 14,
        padding: 16,
    },
    sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
    sectionTitle: { fontSize: 15, fontFamily: FontFamily.bold, marginBottom: 12 },
    trendGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    trendChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    trendText: { fontSize: 13, fontFamily: FontFamily.semiBold },

    rRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        gap: 12,
    },
    rImg: { width: 68, height: 68, borderRadius: 10 },
    rInfo: { flex: 1 },
    rName: { fontSize: 14, fontFamily: FontFamily.bold, marginBottom: 2 },
    rCuisine: { fontSize: 12, marginBottom: 5, fontFamily: FontFamily.regular },
    rMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    ratingPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        borderRadius: 5,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    ratingText: { color: '#fff', fontSize: 10, fontFamily: FontFamily.bold },
    rMetaDot: { fontSize: 12 },
    rMetaText: { fontSize: 12, fontFamily: FontFamily.regular },

    resultLabel: { fontSize: 13, marginBottom: 12 },
    noResults: { alignItems: 'center', paddingVertical: 60 },
    noResultsEmoji: { fontSize: 48, marginBottom: 14 },
    noResultsTitle: { fontSize: 18, fontFamily: FontFamily.bold, marginBottom: 6 },
    noResultsSub: { fontSize: 14, fontFamily: FontFamily.regular },
});
