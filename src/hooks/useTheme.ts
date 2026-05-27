import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, ThemeColors } from '@/theme/colors';
import { useEffect, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

const THEME_STORAGE_KEY = '@foodapp_theme';

export type ThemeMode = 'system' | 'light' | 'dark';

let currentThemeMode: ThemeMode = 'system';
const listeners = new Set<() => void>();

async function loadThemePreference() {
  try {
    const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      currentThemeMode = saved as ThemeMode;
      listeners.forEach(l => l());
    }
  } catch (_) {}
}

loadThemePreference();

export async function setThemeMode(mode: ThemeMode) {
  currentThemeMode = mode;
  listeners.forEach(l => l());
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (_) {}
}

export interface ThemeResult {
  colors: ThemeColors;
  isDark: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
}

export function useTheme(): ThemeResult {
  const systemScheme = useSystemColorScheme();
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const resolvedIsDark =
    currentThemeMode === 'system'
      ? systemScheme === 'dark'
      : currentThemeMode === 'dark';

  return {
    colors: resolvedIsDark ? Colors.dark : Colors.light,
    isDark: resolvedIsDark,
    themeMode: currentThemeMode,
    setThemeMode,
  };
}
