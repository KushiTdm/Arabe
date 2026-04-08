import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, borderRadius, spacing, fontSize } from '../../theme';

// Button Component
interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  style,
  fullWidth = false,
}: ButtonProps) {
  const variantStyles = {
    primary: {
      container: { backgroundColor: colors.primary },
      text: { color: colors.white },
    },
    secondary: {
      container: { backgroundColor: colors.secondary },
      text: { color: colors.white },
    },
    outline: {
      container: { 
        backgroundColor: 'transparent', 
        borderWidth: 1, 
        borderColor: colors.border 
      },
      text: { color: colors.text },
    },
    ghost: {
      container: { backgroundColor: 'transparent' },
      text: { color: colors.primary },
    },
  };

  const sizeStyles = {
    sm: { 
      container: { paddingVertical: 8, paddingHorizontal: 12 },
      text: { fontSize: 12 },
    },
    md: { 
      container: { paddingVertical: 12, paddingHorizontal: 16 },
      text: { fontSize: 14 },
    },
    lg: { 
      container: { paddingVertical: 16, paddingHorizontal: 24 },
      text: { fontSize: 16 },
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.buttonBase,
        variantStyles[variant].container,
        sizeStyles[size].container,
        fullWidth && styles.fullWidth,
        disabled && styles.buttonDisabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles[variant].text.color} />
      ) : (
        <Text style={[sizeStyles[size].text, variantStyles[variant].text, { fontWeight: '600' }]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

// Card Component
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, style, padding = 'md' }: CardProps) {
  const paddingStyles = {
    none: 0,
    sm: spacing.sm,
    md: spacing.lg,
    lg: spacing.xl,
  };

  return (
    <View
      style={[
        styles.card,
        { padding: paddingStyles[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Progress Bar Component
interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  style?: ViewStyle;
}

export function ProgressBar({ 
  progress, 
  color = colors.primary, 
  height = 10,
  style 
}: ProgressBarProps) {
  return (
    <View style={[styles.progressContainer, { height }, style]}>
      <View 
        style={[
          styles.progressFill, 
          { 
            width: `${Math.min(100, Math.max(0, progress))}%`,
            backgroundColor: color,
            height,
          }
        ]} 
      />
    </View>
  );
}

// Badge Component
interface BadgeProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'destructive';
  style?: ViewStyle;
}

export function Badge({ children, color = 'primary', style }: BadgeProps) {
  const colorStyles = {
    primary: { bg: `${colors.primary}15`, text: colors.primary },
    secondary: { bg: `${colors.secondary}20`, text: colors.secondary },
    success: { bg: colors.successLight, text: colors.success },
    destructive: { bg: colors.destructiveLight, text: colors.destructive },
  };

  return (
    <View style={[styles.badge, { backgroundColor: colorStyles[color].bg }, style]}>
      <Text style={[styles.badgeText, { color: colorStyles[color].text }]}>
        {children}
      </Text>
    </View>
  );
}

// Loading Spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function LoadingSpinner({ size = 'md', color = colors.primary }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 20,
    md: 32,
    lg: 48,
  };

  return (
    <ActivityIndicator size={sizeMap[size]} color={color} />
  );
}

// Header Component
interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export function Header({ title, subtitle, onBack, rightElement }: HeaderProps) {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      )}
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement}
    </View>
  );
}

// Arabic Text Component
interface ArabicTextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  style?: TextStyle;
}

export function ArabicText({ children, size = 'lg', style }: ArabicTextProps) {
  const sizeMap = {
    sm: fontSize.base,
    md: fontSize.lg,
    lg: fontSize['2xl'],
    xl: fontSize['3xl'],
    '2xl': fontSize['4xl'],
    '3xl': fontSize['5xl'],
  };

  return (
    <Text 
      style={[
        styles.arabicText, 
        { fontSize: sizeMap[size] },
        style
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: borderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressContainer: {
    backgroundColor: `${colors.textMuted}20`,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: borderRadius.full,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: borderRadius.md,
    backgroundColor: `${colors.textMuted}10`,
  },
  backIcon: {
    fontSize: 20,
    color: colors.text,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  arabicText: {
    textAlign: 'right',
    writingDirection: 'rtl',
    fontWeight: '600',
    color: colors.arabicText,
  },
});