import { Appearance, StyleSheet } from 'react-native';

// Le thème suit le réglage du système, lu une fois au lancement : les styles de
// l'app sont créés au chargement des écrans, un changement de thème en cours
// d'utilisation s'applique donc à la prochaine ouverture.
export const isDark = Appearance.getColorScheme() === 'dark';

const lightColors = {
  primary: '#1a2e2a',
  primaryLight: '#2d4a44',
  primaryDark: '#0f1c1a',
  secondary: '#f59e0b',
  secondaryLight: '#fbbf24',
  accent: '#10b981',
  accentLight: '#34d399',
  background: '#f4f6f5',
  card: '#ffffff',
  text: '#1a2e2a',
  textMuted: '#6b7280',
  textLight: '#9ca3af',
  border: '#e8ebe9',
  destructive: '#ef4444',
  destructiveLight: '#fee2e2',
  success: '#10b981',
  successLight: '#d1fae5',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  
  // Arabic text color
  arabicText: '#1a2e2a',
  
  // XP Bar gradient
  xpGradientStart: '#1a2e2a',
  xpGradientEnd: '#2d4a44',
};

// Mode sombre : surfaces à peine plus claires que le fond (pas de noir pur),
// texte à fort contraste, vert d'accent éclairci pour rester lisible.
const darkColors = {
  ...lightColors,
  primary: '#4f9d88',
  primaryLight: '#8cc9b6',
  primaryDark: '#0a1110',
  secondaryLight: '#fcd34d',
  accent: '#34d399',
  accentLight: '#6ee7b7',
  background: '#0e1514',
  card: '#18211f',
  text: '#e8efed',
  textMuted: '#9fb0ab',
  textLight: '#8a9b96',
  border: '#27322f',
  destructive: '#f87171',
  destructiveLight: '#3a1c1c',
  success: '#34d399',
  successLight: '#12332a',
  arabicText: '#f3f7f5',
  xpGradientStart: '#4f9d88',
  xpGradientEnd: '#2f6f5f',
};

export const colors = isDark ? darkColors : lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  full: 9999,
};

export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
};

// Échelle typographique (style iOS) : un rôle = une taille, un poids, une hauteur de ligne.
export const type = {
  largeTitle: { fontSize: 34, fontWeight: '700', lineHeight: 41, letterSpacing: 0.3 },
  title:      { fontSize: 22, fontWeight: '700', lineHeight: 28, letterSpacing: 0.2 },
  headline:   { fontSize: 17, fontWeight: '600', lineHeight: 22 },
  body:       { fontSize: 17, fontWeight: '400', lineHeight: 24 },
  callout:    { fontSize: 15, fontWeight: '400', lineHeight: 21 },
  footnote:   { fontSize: 13, fontWeight: '400', lineHeight: 18 },
  caption:    { fontSize: 12, fontWeight: '500', lineHeight: 16, letterSpacing: 0.2 },
  // Écriture arabe : hauteur de ligne généreuse pour ne pas écraser les voyelles brèves.
  arabic:     { fontSize: 28, fontWeight: '600', lineHeight: 48 },
};

export const fontFamily = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
  arabic: 'System',
};

// Global styles
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  textArabic: {
    fontFamily: 'System',
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 48,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Helper function to create themed styles
export const createStyles = (styleCreator) => {
  return styleCreator({ colors, spacing, borderRadius, fontSize, fontFamily });
};