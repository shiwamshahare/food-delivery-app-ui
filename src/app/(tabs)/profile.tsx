import { useTheme } from "@/hooks/useTheme";
import { logout, useAuth } from "@/store/authStore";
import { FontFamily } from "@/theme/fonts";
import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Gift,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Menu,
  Settings,
  User,
} from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MENU_SECTIONS = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Personal Information", color: "#4A90E2", hasToggle: false, route: null },
      { icon: MapPin, label: "Saved Addresses", color: "#3AB757", hasToggle: false, route: null },
      { icon: CreditCard, label: "Payment Methods", color: "#FC2D7C", hasToggle: false, route: null },
      { icon: Gift, label: "Offers & Benefits", color: "#E23744", hasToggle: false, route: null },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", color: "#9B59B6", hasToggle: true, route: null },
      { icon: Heart, label: "Favourites", color: "#E23744", hasToggle: false, route: null },
    ],
  },
  {
    title: "Support",
    items: [
      {
        icon: HelpCircle,
        label: "Help & Support",
        color: "#4A90E2",
        route: "/help",
        hasToggle: false
      },
      {
        icon: Settings,
        label: "Settings",
        color: "#686B78",
        route: "/settings",
        hasToggle: false
      },
    ],
  },
];

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = React.useState(true);

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.primary }]}
      edges={["top"]}
    >
      {/* Pink header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View>
          <Text style={styles.headerTitle}>Profile</Text>
          <Text style={styles.headerSub}>
            {user?.email ?? "Sign in to continue"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => router.push("/drawer" as any)}
          activeOpacity={0.8}
        >
          <Menu size={22} color="#fff" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.surface }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile card */}
        <View
          style={[
            styles.profileCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Image
            source={{
              uri:
                user?.avatar ??
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
            }}
            style={[styles.avatar, { borderColor: colors.primary }]}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {user?.name ?? "Guest User"}
            </Text>
            <Text
              style={[styles.profileEmail, { color: colors.textSecondary }]}
            >
              {user?.email ?? "Not signed in"}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.editBtn, { borderColor: colors.primary }]}
          >
            <Text style={[styles.editBtnText, { color: colors.primary }]}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View
          style={[
            styles.statsCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          {[
            { label: "Orders", value: "23" },
            { label: "Favourites", value: "5" },
            { label: "Spent", value: "₹18,450" },
          ].map((stat, i, arr) => (
            <React.Fragment key={stat.label}>
              <View style={styles.statItem}>
                <Text style={[styles.statVal, { color: colors.primary }]}>
                  {stat.value}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  {stat.label}
                </Text>
              </View>
              {i < arr.length - 1 && (
                <View
                  style={[styles.statSep, { backgroundColor: colors.border }]}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <Text
              style={[styles.menuSectionTitle, { color: colors.textMuted }]}
            >
              {section.title}
            </Text>
            <View
              style={[
                styles.menuCard,
                { backgroundColor: colors.card, shadowColor: colors.shadow },
              ]}
            >
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.label}
                    style={[
                      styles.menuRow,
                      idx < section.items.length - 1 && [
                        styles.menuRowBorder,
                        { borderBottomColor: colors.divider },
                      ],
                    ]}
                    onPress={() => item.route && router.push(item.route as any)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.menuIcon,
                        { backgroundColor: item.color + "18" },
                      ]}
                    >
                      <Icon size={17} color={item.color} strokeWidth={1.8} />
                    </View>
                    <Text style={[styles.menuLabel, { color: colors.text }]}>
                      {item.label}
                    </Text>
                    {item.hasToggle ? (
                      <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{
                          false: colors.borderStrong,
                          true: colors.primary,
                        }}
                        thumbColor="#fff"
                      />
                    ) : (
                      <ChevronRight size={15} color={colors.textMuted} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Sign out */}
        <View style={styles.menuSection}>
          <View
            style={[
              styles.menuCard,
              { backgroundColor: colors.card, shadowColor: colors.shadow },
            ]}
          >
            <TouchableOpacity
              style={styles.menuRow}
              onPress={() => logout()}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: "#E2374418" }]}>
                <LogOut size={17} color="#E23744" strokeWidth={1.8} />
              </View>
              <Text style={[styles.menuLabel, { color: "#E23744" }]}>
                Sign Out
              </Text>
              <ChevronRight size={15} color="#E2374460" />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 22, fontFamily: FontFamily.black, color: "#fff" },
  headerSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
    fontFamily: FontFamily.light,
  },
  menuBtn: { padding: 4 },
  scroll: { flex: 1 },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 16,
    gap: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2.5,
  },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontFamily: FontFamily.bold },
  profileEmail: { fontSize: 13, marginTop: 2, fontFamily: FontFamily.medium },
  editBtn: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  editBtnText: { fontSize: 13, fontFamily: FontFamily.bold },

  statsCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 14,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: { flex: 1, alignItems: "center" },
  statVal: { fontSize: 20, fontFamily: FontFamily.black },
  statLabel: { fontSize: 12, marginTop: 3 },
  statSep: { width: 1 },

  menuSection: { paddingHorizontal: 16, paddingTop: 18 },
  menuSectionTitle: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  menuCard: {
    borderRadius: 14,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  menuRowBorder: { borderBottomWidth: 1 },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  menuLabel: { flex: 1, fontSize: 14, fontFamily: FontFamily.medium },
});
