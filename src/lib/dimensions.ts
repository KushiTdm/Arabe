import { Dimensions, Platform } from 'react-native';

/**
 * Max width of the centered "phone" column used on the web (Expo Web).
 * Keep in sync with the AppShell frame width in App.tsx.
 */
export const APP_MAX_WIDTH = 460;

const windowWidth = Dimensions.get('window').width;

/**
 * Usable content width.
 *
 * On native this is just the device width. On the web the app is rendered
 * inside a centered phone-sized column, but `Dimensions.get('window')` still
 * reports the full browser width — so we clamp it to the frame width to keep
 * width-based layouts (stat grids, drawing canvas…) correct in the browser.
 */
export const CONTENT_WIDTH =
  Platform.OS === 'web' ? Math.min(windowWidth, APP_MAX_WIDTH) : windowWidth;
