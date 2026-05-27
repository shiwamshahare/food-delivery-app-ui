
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/useTheme';
import { FontFamily } from '@/theme/fonts';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const HELP_CATEGORIES = [
  { id: '1', title: 'Help with Orders', icon: 'help-circle-outline' as IoniconsName, color: '#FC8019' },
  { id: '2', title: 'Payments & Wallet', icon: 'wallet-outline' as IoniconsName, color: '#3AB757' },
  { id: '3', title: 'Account Settings', icon: 'person-outline' as IoniconsName, color: '#4A90E2' },
  { id: '4', title: 'General Issues', icon: 'information-circle-outline' as IoniconsName, color: '#93959F' },
];

const FAQS = [
  {
    id: 'q1',
    question: 'How do I cancel my order?',
    answer: 'You can cancel your order within 60 seconds of placing it. After that, please contact support for assistance.',
  },
  {
    id: 'q2',
    question: 'Where is my refund?',
    answer: 'Refunds usually take 5-7 business days to reflect in your original payment method.',
  },
  {
    id: 'q3',
    question: 'How do I change my delivery address?',
    answer: 'You can update your address in the Account Settings or before placing an order on the checkout screen.',
  },
  {
    id: 'q4',
    question: 'Is there a minimum order value?',
    answer: 'Minimum order values vary by restaurant and will be displayed on the restaurant page.',
  },
];

export default function HelpScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHeader = () => (
    <View style={{ backgroundColor: colors.primary }}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.background }]}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            placeholder="Search for issues, orders, etc."
            placeholderTextColor={colors.textMuted}
            style={[styles.searchInput, { color: colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
    </View>
  );

  const renderContactOptions = () => (
    <View style={styles.contactSection}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Still need help?</Text>
      <View style={styles.contactCards}>
        <TouchableOpacity
          style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <View style={[styles.contactIconWrap, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="chatbubbles-outline" size={20} color="#2E7D32" />
          </View>
          <Text style={[styles.contactLabel, { color: colors.text }]}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <View style={[styles.contactIconWrap, { backgroundColor: '#E3F2FD' }]}>
            <Ionicons name="call-outline" size={20} color="#1565C0" />
          </View>
          <Text style={[styles.contactLabel, { color: colors.text }]}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <View style={[styles.contactIconWrap, { backgroundColor: '#FFF3E0' }]}>
            <Ionicons name="mail-outline" size={20} color="#EF6C00" />
          </View>
          <Text style={[styles.contactLabel, { color: colors.text }]}>Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]} edges={['top']}>
      {renderHeader()}

      <FlatList
        data={filteredFaqs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { backgroundColor: colors.background }]}
        ListHeaderComponent={() => (
          <>
            <View style={styles.categoriesGrid}>
              {HELP_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={[styles.catIconWrap, { backgroundColor: cat.color + '15' }]}>
                    <Ionicons name={cat.icon} size={22} color={cat.color} />
                  </View>
                  <Text style={[styles.catTitle, { color: colors.text }]} numberOfLines={1}>
                    {cat.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>
              Frequently Asked Questions
            </Text>
          </>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.faqItem, { borderBottomColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.faqContent}>
              <Text style={[styles.faqQuestion, { color: colors.text }]}>{item.question}</Text>
              <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>{item.answer}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
        ListFooterComponent={renderContactOptions}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerTop: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 8, paddingVertical: 12,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontFamily: FontFamily.bold, color: '#fff' },
  searchContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, height: 48, borderRadius: 30,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, fontFamily: FontFamily.medium },
  listContent: { paddingBottom: 40 },
  categoriesGrid: {
    flexDirection: 'row', flexWrap: 'wrap', padding: 12, justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%', padding: 16, borderRadius: 16, borderWidth: 1,
    marginBottom: 12, alignItems: 'center',
  },
  catIconWrap: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  catTitle: { fontSize: 13, fontFamily: FontFamily.semiBold },
  sectionTitle: { fontSize: 16, fontFamily: FontFamily.bold, paddingHorizontal: 16, marginBottom: 16 },
  faqItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1,
  },
  faqContent: { flex: 1, marginRight: 12 },
  faqQuestion: { fontSize: 14, fontFamily: FontFamily.semiBold, marginBottom: 4 },
  faqAnswer: { fontSize: 13, fontFamily: FontFamily.regular, lineHeight: 18 },
  contactSection: { marginTop: 32 },
  contactCards: { flexDirection: 'row', paddingHorizontal: 16, justifyContent: 'space-between' },
  contactCard: {
    width: '31%', padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center',
  },
  contactIconWrap: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  contactLabel: { fontSize: 12, fontFamily: FontFamily.semiBold },
});
