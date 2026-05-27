
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/useTheme';
import { logout, useAuth } from '@/store/authStore';
import { FontFamily } from '@/theme/fonts';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline' as IoniconsName, label: 'Personal Information', color: '#4A90E2', hasToggle: false, route: null },
      { icon: 'location-outline' as IoniconsName, label: 'Saved Addresses', color: '#3AB757', hasToggle: false, route: null },
      { icon: 'card-outline' as IoniconsName, label: 'Payment Methods', color: '#FC2D7C', hasToggle: false, route: null },
      { icon: 'gift-outline' as IoniconsName, label: 'Offers & Benefits', color: '#E23744', hasToggle: false, route: null },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'notifications-outline' as IoniconsName, label: 'Notifications', color: '#9B59B6', hasToggle: true, route: null },
      { icon: 'heart-outline' as IoniconsName, label: 'Favourites', color: '#E23744', hasToggle: false, route: null },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline' as IoniconsName, label: 'Help & Support', color: '#4A90E2', route: 'Help', hasToggle: false },
      { icon: 'settings-outline' as IoniconsName, label: 'Settings', color: '#686B78', route: 'Settings', hasToggle: false },
    ],
  },
];

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = React.useState(true);


  const openDrawer = () => {
    navigation.getParent('DrawerNav')?.openDrawer();
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.primary }]} edges={['top']}>
      
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View>
          <Text style={styles.headerTitle}>Profile</Text>
          <Text style={styles.headerSub}>{user?.email ?? 'Sign in to continue'}</Text>
        </View>
        <TouchableOpacity style={styles.menuBtn} onPress={openDrawer} activeOpacity={0.8}>
          <Ionicons name="menu" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.surface }]}
        showsVerticalScrollIndicator={false}
      >
        
        <View
          style={[styles.profileCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
        >
          <Image
            source={{
              uri:
                user?.avatar ??
                'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
            }}
            style={[styles.avatar, { borderColor: colors.primary }]}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {user?.name ?? 'Guest User'}
            </Text>
            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
              {user?.email ?? 'Not signed in'}
            </Text>
          </View>
          <TouchableOpacity style={[styles.editBtn, { borderColor: colors.primary }]}>
            <Text style={[styles.editBtnText, { color: colors.primary }]}>Edit</Text>
          </TouchableOpacity>
        </View>

        
        <View
          style={[styles.statsCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
        >
          {[
            { label: 'Orders', value: '23' },
            { label: 'Favourites', value: '5' },
            { label: 'Spent', value: '₹18,450' },
          ].map((stat, i, arr) => (
            <React.Fragment key={stat.label}>
              <View style={styles.statItem}>
                <Text style={[styles.statVal, { color: colors.primary }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
              </View>
              {i < arr.length - 1 && (
                <View style={[styles.statSep, { backgroundColor: colors.border }]} />
              )}
            </React.Fragment>
          ))}
        </View>

        
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <Text style={[styles.menuSectionTitle, { color: colors.textMuted }]}>{section.title}</Text>
            <View
              style={[styles.menuCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
            >
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.menuRow,
                    idx < section.items.length - 1 && [
                      styles.menuRowBorder,
                      { borderBottomColor: colors.divider },
                    ],
                  ]}
                  onPress={() => {
                    if (item.route) {
                    
                      navigation.getParent('DrawerNav')?.navigate(item.route);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.menuIcon, { backgroundColor: item.color + '18' }]}>
                    <Ionicons name={item.icon} size={17} color={item.color} />
                  </View>
                  <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
                  {item.hasToggle ? (
                    <Switch
                      value={notifications}
                      onValueChange={setNotifications}
                      trackColor={{ false: colors.borderStrong, true: colors.primary }}
                      thumbColor="#fff"
                    />
                  ) : (
                    <Ionicons name="chevron-forward" size={15} color={colors.textMuted} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        
        <View style={styles.menuSection}>
          <View
            style={[styles.menuCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
          >
            <TouchableOpacity style={styles.menuRow} onPress={() => logout()} activeOpacity={0.7}>
              <View style={[styles.menuIcon, { backgroundColor: '#E2374418' }]}>
                <Ionicons name="log-out-outline" size={17} color="#E23744" />
              </View>
              <Text style={[styles.menuLabel, { color: '#E23744' }]}>Sign Out</Text>
              <Ionicons name="chevron-forward" size={15} color="#E2374460" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 8, paddingTop: 6, paddingBottom: 16,
  },
  headerTitle: { fontSize: 22, fontFamily: FontFamily.black, color: '#fff' },
  headerSub: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2, fontFamily: FontFamily.light },
  menuBtn: { padding: 4 },
  scroll: { flex: 1 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, marginTop: 14, borderRadius: 14, padding: 16, gap: 12,
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2.5 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontFamily: FontFamily.bold },
  profileEmail: { fontSize: 13, marginTop: 2, fontFamily: FontFamily.medium },
  editBtn: { borderWidth: 1.5, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 6 },
  editBtnText: { fontSize: 13, fontFamily: FontFamily.bold },
  statsCard: {
    flexDirection: 'row', marginHorizontal: 16, marginTop: 12, borderRadius: 14, padding: 16,
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 20, fontFamily: FontFamily.black },
  statLabel: { fontSize: 12, marginTop: 3 },
  statSep: { width: 1 },
  menuSection: { paddingHorizontal: 16, paddingTop: 18 },
  menuSectionTitle: {
    fontSize: 12, fontFamily: FontFamily.bold,
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8,
  },
  menuCard: {
    borderRadius: 14, overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
  },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 14, gap: 12,
  },
  menuRowBorder: { borderBottomWidth: 1 },
  menuIcon: {
    width: 36, height: 36, borderRadius: 9,
    justifyContent: 'center', alignItems: 'center',
  },
  menuLabel: { flex: 1, fontSize: 14, fontFamily: FontFamily.medium },
});
