import { cn } from '@/lib/utils';

const levelThresholds = {
  beginner: { min: 0, max: 300, label: 'Débutant' },
  intermediate: { min: 300, max: 1000, label: 'Intermédiaire' },
  advanced: { min: 1000, max: 2000, label: 'Avancé' },
};

export default function XPBar({ xp = 0, level = 'beginner' }) {
  const threshold = levelThresholds[level] || levelThresholds.beginner;
  const progress = Math.min(((xp - threshold.min) / (threshold.max - threshold.min)) * 100, 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-primary">{threshold.label}</span>
        <span className="text-muted-foreground">{xp} / {threshold.max} XP</span>
      </div>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}