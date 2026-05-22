import { useTheme } from "@/hooks/useTheme";
import { logout, useAuth } from "@/store/authStore";
import { FontFamily } from "@/theme/fonts";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  HelpCircle,
  LogOut,
  Package,
  Settings,
  Star,
  X,
} from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.78;

const DRAWER_ITEMS = [
  {
    section: "Main",
    items: [
      {
        icon: Package,
        label: "My Orders",
        route: "/(tabs)/orders",
        color: "#FC8019",
      },
      // { icon: Star, label: 'Favourites', route: null, color: '#E8A020' },
    ],
  },
  {
    section: "Account",
    items: [
      {
        icon: Settings,
        label: "Settings",
        route: "/settings",
        color: "#686B78",
      },
      // { icon: Bell, label: 'Notifications', route: null, color: '#9B59B6' },
      // { icon: Shield, label: 'Privacy & Security', route: null, color: '#48C479' },
    ],
  },
  {
    section: "Support",
    items: [
      { icon: HelpCircle, label: "Help", route: "/help", color: "#4A90E2" },
      // { icon: FileText, label: 'Terms of Service', route: null, color: '#93959F' },
    ],
  },
];

export default function DrawerScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  // Start off-screen to the left, slide in to 0
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  // Backdrop fades in
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Slide in from left + fade backdrop simultaneously
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        speed: 20,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const close = () => {
    // Slide out to left + fade backdrop, then navigate back
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -DRAWER_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => router.back());
  };

  const navigate = (route: string | null) => {
    if (route) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => {
        router.back();
        router.push(route as any);
      });
    } else {
      close();
    }
  };

  return (
    <Modal visible transparent statusBarTranslucent onRequestClose={close}>
      <View style={styles.root}>
        {/* Dimmed backdrop — tap to close */}
        <TouchableWithoutFeedback onPress={close}>
          <Animated.View
            style={[styles.backdrop, { opacity: backdropOpacity }]}
          />
        </TouchableWithoutFeedback>

        {/* Drawer panel slides in from left */}
        <Animated.View
          style={[
            styles.drawer,
            {
              backgroundColor: colors.background,
              paddingTop: insets.top,
              paddingBottom: insets.bottom + 16,
              transform: [{ translateX }],
            },
          ]}
        >
          {/* Close button */}
          <TouchableOpacity
            style={[styles.closeBtn, { backgroundColor: colors.iconBg }]}
            onPress={close}
            activeOpacity={0.8}
          >
            <X size={18} color={colors.textSecondary} strokeWidth={2.5} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* User section */}
            <View
              style={[styles.userSection, { borderBottomColor: colors.border }]}
            >
              <Image
                source={{
                  uri:
                    user?.avatar ??
                    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
                }}
                style={styles.avatar}
              />
              <Text style={[styles.userName, { color: colors.text }]}>
                {user?.name ?? "Guest"}
              </Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                {user?.email ?? ""}
              </Text>
              <View
                style={[
                  styles.memberBadge,
                  {
                    backgroundColor: isDark ? "#2a2200" : "#FFF9E6",
                    borderColor: "#F3C117",
                  },
                ]}
              >
                <Star size={11} color="#F3C117" fill="#F3C117" />
                <Text style={styles.memberText}>Gold Member · 23 orders</Text>
              </View>
            </View>

            {/* Nav items */}
            {DRAWER_ITEMS.map((section) => (
              <View key={section.section} style={styles.section}>
                {/* <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                                    {section.section}
                                </Text> */}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <TouchableOpacity
                      key={item.label}
                      style={styles.drawerRow}
                      onPress={() => navigate(item.route)}
                      activeOpacity={0.7}
                    >
                      <View
                        style={[
                          styles.itemIcon,
                          { backgroundColor: item.color + "18" },
                        ]}
                      >
                        <Icon size={17} color={item.color} strokeWidth={1.8} />
                      </View>
                      <Text style={[styles.itemLabel, { color: colors.text }]}>
                        {item.label}
                      </Text>
                      <ChevronRight size={15} color={colors.textMuted} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            {/* Sign out */}
            <View
              style={[styles.logoutSection, { borderTopColor: colors.border }]}
            >
              <TouchableOpacity
                style={[
                  styles.logoutBtn,
                  { backgroundColor: isDark ? "#2a1212" : "#FFF0F1" },
                ]}
                onPress={() => {
                  logout();
                  close();
                }}
                activeOpacity={0.8}
              >
                <LogOut size={17} color="#E23744" strokeWidth={1.8} />
                <Text style={styles.logoutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.textMuted }]}>
                Delulu Food v1.0.0
              </Text>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 24,
  },
  closeBtn: {
    alignSelf: "flex-end",
    marginRight: 14,
    marginTop: 8,
    marginBottom: 4,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  userSection: {
    alignItems: "center",
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
    borderColor: "#FC8019",
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
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
  },
  memberText: {
    fontSize: 12,
    fontFamily: FontFamily.semiBold,
    color: "#B8860B",
  },

  section: { paddingHorizontal: 14, paddingTop: 10 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
    paddingLeft: 4,
  },
  drawerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    gap: 12,
    paddingHorizontal: 4,
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  logoutText: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: "#E23744",
  },

  footer: { alignItems: "center", paddingVertical: 18 },
  footerText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
});
