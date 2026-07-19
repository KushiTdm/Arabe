import type { UserProfile, LanguageProgress } from './useProfiles';

// Badges dérivés des compteurs existants du profil : aucune donnée
// supplémentaire à stocker, tout est recalculé à l'affichage.

export interface Badge {
  id: string;
  emoji: string;
  label: string;
  description: string;
  earned: boolean;
}

export function computeBadges(profile: UserProfile): Badge[] {
  const langs = profile.languages ?? [];
  const sum = (pick: (l: LanguageProgress) => number) =>
    langs.reduce((acc, l) => acc + (pick(l) || 0), 0);
  const best = (pick: (l: LanguageProgress) => number) =>
    langs.reduce((acc, l) => Math.max(acc, pick(l) || 0), 0);

  const totalXP = sum(l => l.xp_points);
  const bestStreak = best(l => l.streak_days);
  const totalVocab = sum(l => l.vocab_learned);
  const totalQuizzes = sum(l => l.quizzes_completed);
  const bestQuizScore = best(l => l.quiz_best_score);
  const totalConversations = sum(l => l.conversations_count);
  const bestXP = best(l => l.xp_points);
  const languagesStarted = langs.filter(l =>
    l.xp_points > 0 || l.lessons_completed > 0 || l.conversations_count > 0 ||
    l.vocab_learned > 0 || l.quizzes_completed > 0,
  ).length;

  return [
    { id: 'first_steps',  emoji: '🐣', label: 'Premiers pas',   description: 'Gagner ses premiers XP',            earned: totalXP > 0 },
    { id: 'talker',       emoji: '💬', label: 'Causeur',        description: '5 conversations avec l\'IA',        earned: totalConversations >= 5 },
    { id: 'quiz_first',   emoji: '🎯', label: 'Quizzeur',       description: 'Terminer un premier quiz',          earned: totalQuizzes >= 1 },
    { id: 'quiz_perfect', emoji: '🏆', label: 'Sans faute',     description: 'Réussir un quiz à 100 %',           earned: bestQuizScore >= 100 },
    { id: 'streak_3',     emoji: '🔥', label: 'Série de 3',     description: '3 jours de pratique d\'affilée',    earned: bestStreak >= 3 },
    { id: 'streak_7',     emoji: '⚡', label: 'Série de 7',     description: '7 jours de pratique d\'affilée',    earned: bestStreak >= 7 },
    { id: 'streak_30',    emoji: '🏔️', label: 'Série de 30',    description: '30 jours de pratique d\'affilée',   earned: bestStreak >= 30 },
    { id: 'vocab_25',     emoji: '📖', label: '25 mots',        description: 'Maîtriser 25 mots',                 earned: totalVocab >= 25 },
    { id: 'vocab_50',     emoji: '📚', label: '50 mots',        description: 'Maîtriser 50 mots',                 earned: totalVocab >= 50 },
    { id: 'vocab_100',    emoji: '🧠', label: '100 mots',       description: 'Maîtriser 100 mots',                earned: totalVocab >= 100 },
    { id: 'intermediate', emoji: '⭐', label: 'Intermédiaire',  description: 'Atteindre 300 XP dans une langue',  earned: bestXP >= 300 },
    { id: 'advanced',     emoji: '🌟', label: 'Avancé',         description: 'Atteindre 1000 XP dans une langue', earned: bestXP >= 1000 },
    { id: 'polyglot',     emoji: '🌍', label: 'Polyglotte',     description: 'Commencer une deuxième langue',     earned: languagesStarted >= 2 },
  ];
}
