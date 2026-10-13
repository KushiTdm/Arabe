import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// ─── Haptique à deux niveaux ─────────────────────────────────────────────────
// `tap` : léger, à chaque choix ou bonne réponse.
// `success` : réservé à une réussite de fin de leçon ou de quiz.
// Pas de vibration d'erreur : une erreur s'explique, elle ne se punit pas.

const run = (fn: () => Promise<void>) => { if (Platform.OS !== 'web') fn().catch(() => {}); };

export const tap = () => run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
export const success = () => run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));
