// Swiggy-inspired color palette — hot pink header, white body
import { FontFamily } from './fonts';

export const Colors = {
  light: {
    // Backgrounds
    background: '#FFFFFF',
    surface: '#F2F2F2',
    card: '#FFFFFF',
    cardAlt: '#F9F9F9',

    // Text
    text: '#282C3F',
    textSecondary: '#686B78',
    textMuted: '#93959F',
    textLight: '#FFFFFF',

    // Brand — hot pink (Swiggy header color)
    primary: '#0c8910ff',        // hot pink / magenta
    primaryDark: '#24d42aff',
    primaryLight: '#f5fff0ff',
    primaryBorder: '#FFBAD8',

    // Orange accent (ADD button, price highlights)
    accent: '#FC8019',
    accentLight: '#FFF3E8',

    // Accents
    green: '#3AB757',
    greenBg: '#EEF9F0',
    red: '#E23744',
    yellow: '#F3C117',
    black: '#000000',

    // Borders & dividers
    border: '#E9E9EB',
    borderStrong: '#D4D5D9',
    divider: '#F2F2F2',

    // Inputs
    inputBg: '#FFFFFF',
    inputBorder: '#E9E9EB',

    // Chips / categories
    chipBg: '#FFFFFF',
    chipBorder: '#E9E9EB',
    chipActiveBg: '#1C1C1C',   // dark active like Swiggy

    // Icons & misc
    iconBg: '#F2F2F2',
    searchBg: '#FFFFFF',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E9E9EB',
    shadow: '#000000',
    overlay: 'rgba(0,0,0,0.55)',
    statusBar: 'light' as const,  // white icons on pink header
  },
  dark: {
    background: '#1C1C1E',
    surface: '#111111',
    card: '#2C2C2E',
    cardAlt: '#242426',

    text: '#F5F5F5',
    textSecondary: '#AEAEB2',
    textMuted: '#6C6C70',
    textLight: '#FFFFFF',

    primary: '#0c8910ff',        // hot pink / magenta
    primaryDark: '#24d42aff',
    primaryLight: '#013700ff',
    primaryBorder: '#105a1bff',

    accent: '#FC8019',
    accentLight: '#2E1A08',

    green: '#3AB757',
    greenBg: '#0D2A18',
    red: '#E23744',
    yellow: '#F3C117',
    black: '#000000',

    border: '#3A3A3C',
    borderStrong: '#48484A',
    divider: '#2C2C2E',

    inputBg: '#2C2C2E',
    inputBorder: '#48484A',

    chipBg: '#2C2C2E',
    chipBorder: '#48484A',
    chipActiveBg: '#F5F5F5',

    iconBg: '#2C2C2E',
    searchBg: '#2C2C2E',
    tabBar: '#1C1C1E',
    tabBarBorder: '#3A3A3C',
    shadow: '#000000',
    overlay: 'rgba(0,0,0,0.75)',
    statusBar: 'light' as const,
  },
};

export type ThemeColors = typeof Colors.light;

// Default font configuration
export const DefaultFontConfig = {
  regular: FontFamily.regular,
  medium: FontFamily.medium,
  bold: FontFamily.bold,
  semiBold: FontFamily.semiBold,
  extraBold: FontFamily.extraBold,
  black: FontFamily.black,
};
