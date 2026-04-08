import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function LessonCard({ title, subtitle, icon: Icon, to, color = "primary", locked = false }) {
  const colorMap = {
    primary: "from-primary/10 to-primary/5 border-primary/20",
    secondary: "from-secondary/10 to-secondary/5 border-secondary/20",
    accent: "from-accent to-accent/50 border-accent-foreground/10",
  };

  if (locked) {
    return (
      <div className="relative p-5 rounded-2xl bg-muted/50 border border-border opacity-60 cursor-not-allowed">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-muted">
            <Icon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-muted-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className="absolute top-3 right-3 text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
          🔒 Bientôt
        </div>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn(
        "block p-5 rounded-2xl bg-gradient-to-br border transition-all duration-200",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 active:translate-y-0",
        colorMap[color]
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-card shadow-sm">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}