import React, { ReactNode } from 'react';
import { ImageSourcePropType, Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

interface ParallaxScreenProps {
  /** Image source (asset local ou {uri}) for the parallax header. */
  image: ImageSourcePropType;
  /** Height of the header area (default 240). */
  headerHeight?: number;
  /** Content overlaid on top of the header image (title, badges…). */
  headerContent?: ReactNode;
  /** Element pinned to the top-right of the header (avatar, credits…). */
  topRight?: ReactNode;
  /** Main scrollable content below the header. */
  children: ReactNode;
  /** Extra style for the inner content wrapper. */
  contentStyle?: ViewStyle;
  /** Gradient tint at the bottom of the header for text legibility. */
  tint?: string;
  /** Background color behind the content (default white). */
  background?: string;
}

/**
 * A scroll view whose header image moves and scales with the scroll offset —
 * a classic parallax hero effect, implemented with react-native-reanimated so
 * it runs natively on Android/iOS *and* in the browser via Expo Web.
 */
export function ParallaxScreen({
  image,
  headerHeight = 240,
  headerContent,
  topRight,
  children,
  contentStyle,
  tint = 'rgba(15,28,26,0.62)',
  background = '#f8faf9',
}: ParallaxScreenProps) {
  const ref = useAnimatedRef<Animated.ScrollView>();
  const offset = useScrollViewOffset(ref);
  const insets = useSafeAreaInsets();
  const topRightOffset = Platform.OS === 'web' ? 18 : Math.max(insets.top, 24) + 10;

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          offset.value,
          [-headerHeight, 0, headerHeight],
          [-headerHeight / 2, 0, headerHeight * 0.6],
        ),
      },
      {
        scale: interpolate(
          offset.value,
          [-headerHeight, 0],
          [2.2, 1],
          Extrapolation.CLAMP,
        ),
      },
    ] as any,
  }));

  const contentFadeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      offset.value,
      [0, headerHeight * 0.85],
      [1, 0.25],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          offset.value,
          [0, headerHeight],
          [0, 40],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Animated.ScrollView
      ref={ref}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: background }}
    >
      <View style={[styles.header, { height: headerHeight }]}>
        <Animated.Image
          source={image}
          style={[StyleSheet.absoluteFill, imageStyle] as any}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.25)', 'transparent', tint]}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
        />
        {topRight ? <View style={[styles.topRight, { top: topRightOffset }]}>{topRight}</View> : null}
        {headerContent ? (
          <Animated.View style={[styles.headerContent, contentFadeStyle]}>
            {headerContent}
          </Animated.View>
        ) : null}
      </View>

      <View style={[styles.body, { backgroundColor: background }, contentStyle]}>
        {children}
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: '#1a2e2a',
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  topRight: {
    position: 'absolute',
    right: 20,
  },
  body: {
    flex: 1,
    marginTop: -24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
    minHeight: 400,
  },
});
