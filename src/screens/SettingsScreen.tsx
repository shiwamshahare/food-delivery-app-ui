
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/useTheme';
import { FontFamily } from '@/theme/fonts';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

export default function SettingsScreen() {
  const { colors, isDark, setThemeMode } = useTheme();
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [locationServices, setLocationServices] = useState(true);

  const SettingRow = ({
    icon,
    label,
    value,
    onValueChange,
    type = 'toggle',
    onPress,
  }: {
    icon: IoniconsName;
    label: string;
    value?: boolean;
    onValueChange?: (val: boolean) => void;
    type?: 'toggle' | 'link';
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.row, { borderBottomColor: colors.border }]}
      onPress={type === 'link' ? onPress : undefined}
      activeOpacity={type === 'link' ? 0.7 : 1}
    >
      <View style={[styles.iconWrap, { backgroundColor: colors.surface }]}>
        <Ionicons name={icon} size={20} color={colors.textSecondary} />
      </View>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      {type === 'toggle' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.borderStrong, true: colors.primary }}
          thumbColor="#fff"
        />
      ) : (
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}
      >
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>ACCOUNT</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SettingRow icon="person-outline" label="Edit Profile" type="link" onPress={() => {}} />
            <SettingRow icon="phone-portrait-outline" label="Connected Devices" type="link" onPress={() => {}} />
            <SettingRow icon="globe-outline" label="Language" type="link" onPress={() => {}} />
          </View>
        </View>

        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>NOTIFICATIONS</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SettingRow icon="notifications-outline" label="Push Notifications" value={notifications} onValueChange={setNotifications} />
            <SettingRow icon="information-circle-outline" label="Marketing Emails" value={marketingEmails} onValueChange={setMarketingEmails} />
          </View>
        </View>

        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>PRIVACY & SECURITY</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SettingRow icon="lock-closed-outline" label="Change Password" type="link" onPress={() => {}} />
            <SettingRow icon="shield-outline" label="Location Services" value={locationServices} onValueChange={setLocationServices} />
          </View>
        </View>

        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>APPEARANCE</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SettingRow icon="moon-outline" label="Dark Mode" value={isDark} onValueChange={(val) => setThemeMode(val ? 'dark' : 'light')} />
          </View>
        </View>

        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>ABOUT</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SettingRow icon="information-circle-outline" label="Version 1.0.0" type="link" onPress={() => {}} />
            <SettingRow icon="shield-outline" label="Privacy Policy" type="link" onPress={() => {}} />
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 8, paddingTop: 6, paddingBottom: 16,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontFamily: FontFamily.bold, color: '#fff' },
  scrollContent: { padding: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 12, fontFamily: FontFamily.bold, marginBottom: 8, marginLeft: 4, letterSpacing: 0.5 },
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1 },
  iconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  label: { flex: 1, fontSize: 15, fontFamily: FontFamily.medium },
});
