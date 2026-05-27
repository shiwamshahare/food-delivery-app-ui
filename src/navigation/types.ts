
import type { NavigatorScreenParams } from '@react-navigation/native';

// ── Home Stack (nested inside Home tab) ─────────
export type HomeStackParamList = {
  Home: undefined;
  RestaurantDetail: {
    id: string;
    name: string;
    deliveryFee: string;
  };
  Cart: undefined;
};

// ── Tab Navigator ------
export type TabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Orders: undefined;
  Profile: undefined;
};

// ── Drawer Navigator --------
export type DrawerParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Settings: undefined;
  Help: undefined;
};

// ── Root Stack ──────
export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: NavigatorScreenParams<DrawerParamList>;
};

// ── Auth Stack ──────
export type AuthStackParamList = {
  Login: undefined;
};
