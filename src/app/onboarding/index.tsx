import { completeOnboarding } from '@/store/authStore';
import { FontFamily } from '@/theme/fonts';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Discover Authentic Indian Food',
        subtitle: 'Explore hundreds of restaurants serving delicious Indian cuisines.',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
        accent: '#FC8019',
    },
    {
        id: '2',
        title: 'Fast Delivery',
        subtitle: 'Get your favourite meals delivered hot and fresh in 30 minutes.',
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
        accent: '#48C479',
    },
    {
        id: '3',
        title: 'Easy Ordering',
        subtitle: 'Simple checkout with multiple payment options and order tracking.',
        image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800',
        accent: '#E23744',
    },
];

export default function OnboardingScreen() {
    const [idx, setIdx] = useState(0);
    const listRef = useRef<Animated.FlatList<(typeof SLIDES)[0]>>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const router = useRouter();

    const finish = () => {
        completeOnboarding();
        router.replace('/(auth)/login' as any);
    };

    const next = () => {
        if (idx < SLIDES.length - 1) {
            listRef.current?.scrollToIndex({ index: idx + 1 });
            setIdx(idx + 1);
        } else {
            finish();
        }
    };

    const renderSlide = ({ item }: { item: (typeof SLIDES)[0] }) => (
        <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.slideImg} />
            <View style={styles.slideOverlay} />
            <View style={styles.slideContent}>
                <View style={[styles.accentLine, { backgroundColor: item.accent }]} />
                <Text style={styles.slideTitle}>{item.title}</Text>
                <Text style={styles.slideSub}>{item.subtitle}</Text>
            </View>
        </View>
    );

    const renderDot = (i: number) => {
        const w = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [8, 22, 8],
            extrapolate: 'clamp',
        });
        const op = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.35, 1, 0.35],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View
                key={i}
                style={[styles.dot, { width: w, opacity: op, backgroundColor: SLIDES[idx].accent }]}
            />
        );
    };

    return (
        <View style={styles.root}>
            <StatusBar style="light" />
            <Animated.FlatList
                ref={listRef}
                data={SLIDES}
                renderItem={renderSlide}
                keyExtractor={s => s.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                onMomentumScrollEnd={e => setIdx(Math.round(e.nativeEvent.contentOffset.x / width))}
                scrollEventThrottle={16}
            />

            <View style={styles.footer}>
                <View style={styles.dots}>{SLIDES.map((_, i) => renderDot(i))}</View>

                <TouchableOpacity
                    style={[styles.nextBtn, { backgroundColor: SLIDES[idx].accent }]}
                    onPress={next}
                    activeOpacity={0.88}
                >
                    <Text style={styles.nextBtnText}>
                        {idx === SLIDES.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>

                {idx < SLIDES.length - 1 && (
                    <TouchableOpacity onPress={finish} style={styles.skipBtn}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#000' },
    slide: { width, height },
    slideImg: { width, height, resizeMode: 'cover' },
    slideOverlay: {
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        height: height * 0.40,
        backgroundColor: 'rgba(0,0,0,0.52)',
    },
    slideContent: {
        position: 'absolute',
        bottom: 210,
        left: 28,
        right: 28,
    },
    accentLine: { width: 44, height: 4, borderRadius: 2, marginBottom: 14 },
    slideTitle: { fontSize: 34, fontFamily: FontFamily.black, color: '#fff', marginBottom: 10, lineHeight: 40 },
    slideSub: {
        fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 22, fontFamily: FontFamily.regular
    },

    footer: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        paddingHorizontal: 28,
        paddingBottom: Platform.OS === 'ios' ? 44 : 28,
        paddingTop: 20,
        alignItems: 'center',
    },
    dots: { flexDirection: 'row', gap: 6, marginBottom: 22 },
    dot: { height: 8, borderRadius: 4 },
    nextBtn: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },
    nextBtnText: {
        color: '#fff', fontSize: 16, fontFamily: FontFamily.extraBold
    },
    skipBtn: { marginTop: 14, padding: 8 },
    skipText: {
        color: 'rgba(255,255,255,0.65)', fontSize: 14, fontFamily: FontFamily.medium
    },
});
