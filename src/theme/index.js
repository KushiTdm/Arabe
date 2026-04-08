import { StyleSheet } from 'react-native';

// Colors matching the original Tailwind theme
export const colors = {
  primary: '#1a2e2a',
  primaryLight: '#2d4a44',
  primaryDark: '#0f1c1a',
  secondary: '#f59e0b',
  secondaryLight: '#fbbf24',
  accent: '#10b981',
  accentLight: '#34d399',
  background: '#f8faf9',
  card: '#ffffff',
  text: '#1a2e2a',
  textMuted: '#6b7280',
  textLight: '#9ca3af',
  border: '#e5e7eb',
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
    borderRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  textArabic: {
    fontFamily: 'System',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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