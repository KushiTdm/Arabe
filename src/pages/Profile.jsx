import { useState, useEffect } from 'react';
import { ArrowLeft, Award, BookOpen, MessageCircle, PenTool, Zap, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { base44 } from '@/api/base44Client';
import { useUserProgress, MAX_AI_CREDITS } from '@/lib/useUserProgress';
import XPBar from '@/components/XPBar';

const levelLabels = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
};

export default function Profile() {
  const { progress, loading } = useUserProgress();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
      } catch (err) {
        console.error('Erreur chargement utilisateur:', err);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const creditsUsed = progress?.ai_credits_used || 0;
  const creditsPercent = (creditsUsed / MAX_AI_CREDITS) * 100;

  return (
    <div className="px-5 pt-14 pb-4 space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/" className="p-2 rounded-xl hover:bg-muted transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold">Profil</h1>
      </div>

      {/* Carte utilisateur */}
      <div className="p-6 rounded-2xl bg-card border border-border text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
          <span className="font-arabic text-2xl font-bold text-primary">
            {user?.full_name?.[0]?.toUpperCase() || '?'}
          </span>
        </div>
        <div>
          <p className="font-semibold text-lg">{user?.full_name || 'Apprenant'}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          {levelLabels[progress?.level] || 'Débutant'}
        </div>
      </div>

      {/* XP */}
      <div className="p-5 rounded-2xl bg-card border border-border">
        <XPBar xp={progress?.xp_points || 0} level={progress?.level || 'beginner'} />
      </div>

      {/* Statistiques */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold">Statistiques</h3>
        <div className="grid grid-cols-2 gap-3">
          <StatItem icon={MessageCircle} label="Conversations" value={progress?.conversations_count || 0} />
          <StatItem icon={PenTool} label="Exercices écrits" value={progress?.writing_exercises_count || 0} />
          <StatItem icon={BookOpen} label="Leçons" value={progress?.lessons_completed || 0} />
          <StatItem icon={Award} label="Mots appris" value={progress?.vocab_learned || 0} />
        </div>
      </div>

      {/* Crédits IA */}
      <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold">Crédits IA</h3>
          </div>
          <span className="text-xs text-muted-foreground">
            {creditsUsed} / {MAX_AI_CREDITS}
          </span>
        </div>
        <Progress value={creditsPercent} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {MAX_AI_CREDITS - creditsUsed} crédits restants (
          {((MAX_AI_CREDITS - creditsUsed) / MAX_AI_CREDITS * 100).toFixed(0)}%)
        </p>
      </div>

      {/* Déconnexion — passe l'URL courante pour redirection correcte */}
      <Button
        variant="outline"
        className="w-full h-12 rounded-2xl"
        onClick={() => base44.auth.logout(window.location.href)}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Déconnexion
      </Button>
    </div>
  );
}

function StatItem({ icon: Icon, label, value }) {
  return (
    <div className="p-4 rounded-xl bg-muted/50 flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-lg font-bold">{value}</p>
        <p className="text-[10px] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}