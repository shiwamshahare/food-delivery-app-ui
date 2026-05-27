
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { logout, useAuth } from '@/store/authStore';
import { FontFamily } from '@/theme/fonts';
import TabNavigator from './TabNavigator';
import SettingsScreen from '@/screens/SettingsScreen';
import HelpScreen from '@/screens/HelpScreen';
import type { DrawerParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

// ── Custom Drawer Content ───────────────────────────────────────────────────
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colors, isDark } = useTheme();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    // Navigation will automatically switch to AuthStack via conditional rendering
  };

  const navigateTo = (screen: string, params?: any) => {
    props.navigation.closeDrawer();
    if (screen === 'Orders') {
      props.navigation.navigate('Tabs', { screen: 'Orders' });
    } else {
      props.navigation.navigate(screen as any, params);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ flex: 1 }}
    >
      {/* User section */}
      <View style={[styles.userSection, { borderBottomColor: colors.border }]}>
        <Image
          source={{
            uri:
              user?.avatar ??
              'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
          }}
          style={styles.avatar}
        />
        <Text style={[styles.userName, { color: colors.text }]}>
          {user?.name ?? 'Guest'}
        </Text>
        <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
          {user?.email ?? ''}
        </Text>
        <View
          style={[
            styles.memberBadge,
            {
              backgroundColor: isDark ? '#2a2200' : '#FFF9E6',
              borderColor: '#F3C117',
            },
          ]}
        >
          <Ionicons name="star" size={11} color="#F3C117" />
          <Text style={styles.memberText}>Gold Member · 23 orders</Text>
        </View>
      </View>

      {/* Nav items */}
      <View style={styles.navSection}>
        <TouchableOpacity
          style={styles.drawerRow}
          onPress={() => navigateTo('Orders')}
          activeOpacity={0.7}
        >
          <View style={[styles.itemIcon, { backgroundColor: '#FC801918' }]}>
            <Ionicons name="cube-outline" size={17} color="#FC8019" />
          </View>
          <Text style={[styles.itemLabel, { color: colors.text }]}>
            My Orders
          </Text>
          <Ionicons name="chevron-forward" size={15} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerRow}
          onPress={() => navigateTo('Settings')}
          activeOpacity={0.7}
        >
          <View style={[styles.itemIcon, { backgroundColor: '#686B7818' }]}>
            <Ionicons name="settings-outline" size={17} color="#686B78" />
          </View>
          <Text style={[styles.itemLabel, { color: colors.text }]}>
            Settings
          </Text>
          <Ionicons name="chevron-forward" size={15} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerRow}
          onPress={() => navigateTo('Help')}
          activeOpacity={0.7}
        >
          <View style={[styles.itemIcon, { backgroundColor: '#4A90E218' }]}>
            <Ionicons name="help-circle-outline" size={17} color="#4A90E2" />
          </View>
          <Text style={[styles.itemLabel, { color: colors.text }]}>
            Help & Support
          </Text>
          <Ionicons name="chevron-forward" size={15} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Sign out */}
      <View style={[styles.logoutSection, { borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[
            styles.logoutBtn,
            { backgroundColor: isDark ? '#2a1212' : '#FFF0F1' },
          ]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={17} color="#E23744" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textMuted }]}>
          Delulu Food v1.0.0
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

// ── Drawer Navigator ────────────────────────────────────────────────────────
export default function DrawerNavigator() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      id="DrawerNav"
      drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: colors.background,
          width: 280,
        },
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  userSection: {
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 6,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2.5,
    borderColor: '#FC8019',
    marginBottom: 10,
  },
  userName: {
    fontSize: 17,
    fontFamily: FontFamily.bold,
    marginBottom: 3,
  },
  userEmail: {
    fontSize: 13,
    marginBottom: 10,
    fontFamily: FontFamily.regular,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
  },
  memberText: {
    fontSize: 12,
    fontFamily: FontFamily.semiBold,
    color: '#B8860B',
  },
  navSection: {
    paddingHorizontal: 14,
    paddingTop: 10,
    flex: 1,
  },
  drawerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    gap: 12,
    paddingHorizontal: 4,
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  logoutSection: {
    marginHorizontal: 14,
    marginTop: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 14,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  logoutText: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: '#E23744',
  },
  footer: { alignItems: 'center', paddingVertical: 18 },
  footerText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
});
