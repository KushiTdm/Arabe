import { Zap } from 'lucide-react';
import { MAX_AI_CREDITS } from '@/lib/useUserProgress';
import { cn } from '@/lib/utils';

export default function CreditsBadge({ creditsRemaining }) {
  const percent = (creditsRemaining / MAX_AI_CREDITS) * 100;
  const isLow = percent < 20;
  const isEmpty = creditsRemaining <= 0;

  return (
    <div className={cn(
      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
      isEmpty ? "bg-destructive/10 text-destructive" :
      isLow ? "bg-secondary/20 text-secondary-foreground" :
      "bg-primary/10 text-primary"
    )}>
      <Zap className="w-3.5 h-3.5" />
      <span>{creditsRemaining} crédits IA</span>
    </div>
  );
}