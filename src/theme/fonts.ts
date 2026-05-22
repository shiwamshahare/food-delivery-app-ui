/**
 * Poppins Font Family Mapping
 * 
 * Use these font families in your StyleSheet fontWeight properties.
 * The font will automatically be applied based on fontWeight.
 */

export const FontFamily = {
  light: 'Poppins_300Light',
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
  extraBold: 'Poppins_800ExtraBold',
  black: 'Poppins_900Black',
} as const;

/**
 * Helper function to get font family based on weight
 * This allows you to use: fontFamily: getFontFamily(fontWeight)
 */
export function getFontFamily(weight?: string | number): string {
  const w = String(weight);
  
  switch (w) {
    case '300':
      return FontFamily.light;
    case '400':
    case 'normal':
    case '':
    case 'undefined':
      return FontFamily.regular;
    case '500':
      return FontFamily.medium;
    case '600':
      return FontFamily.semiBold;
    case '700':
    case 'bold':
      return FontFamily.bold;
    case '800':
      return FontFamily.extraBold;
    case '900':
      return FontFamily.black;
    default:
      return FontFamily.regular;
  }
}

/**
 * Text style presets with Poppins font
 */
export const TextPresets = {
  // Headers
  h1: {
    fontFamily: FontFamily.black,
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontFamily: FontFamily.extraBold,
    fontSize: 24,
    lineHeight: 32,
  },
  h3: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    lineHeight: 28,
  },
  h4: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
  },
  
  // Body
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  
  // Labels
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  labelSmall: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  
  // Buttons
  button: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
  },
  buttonSmall: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },
  
  // Caption
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  captionBold: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
  },
};
