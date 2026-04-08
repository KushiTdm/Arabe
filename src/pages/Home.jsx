import { useState, useEffect } from 'react';
import { MessageCircle, PenTool, BookOpen, Type, Flame, Star, Trophy } from 'lucide-react';
import { useUserProgress } from '@/lib/useUserProgress';
import CreditsBadge from '@/components/CreditsBadge';
import XPBar from '@/components/XPBar';
import LessonCard from '@/components/LessonCard';

export default function Home() {
  const { progress, loading, creditsRemaining } = useUserProgress();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-5 pt-14 pb-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            مرحباً
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Bienvenue dans votre cours d'arabe</p>
        </div>
        <CreditsBadge creditsRemaining={creditsRemaining()} />
      </div>

      {/* XP Progress */}
      <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
        <XPBar xp={progress?.xp_points || 0} level={progress?.level || 'beginner'} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={Flame} value={progress?.streak_days || 0} label="Jours" color="text-secondary" />
        <StatCard icon={Star} value={progress?.lessons_completed || 0} label="Leçons" color="text-primary" />
        <StatCard icon={Trophy} value={progress?.vocab_learned || 0} label="Mots" color="text-chart-4" />
      </div>

      {/* Lessons */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight">Apprendre</h2>
        
        <LessonCard
          title="Conversation IA"
          subtitle="Pratiquez l'arabe parlé avec l'IA"
          icon={MessageCircle}
          to="/conversation"
          color="primary"
        />
        <LessonCard
          title="Écriture arabe"
          subtitle="Apprenez l'alphabet et l'écriture"
          icon={PenTool}
          to="/writing"
          color="secondary"
        />
        <LessonCard
          title="Vocabulaire"
          subtitle="Enrichissez votre vocabulaire"
          icon={BookOpen}
          to="/vocabulary"
          color="accent"
        />
        <LessonCard
          title="Alphabet arabe"
          subtitle="Maîtrisez les 28 lettres"
          icon={Type}
          to="/alphabet"
          color="primary"
        />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div className="p-4 rounded-2xl bg-card border border-border text-center">
      <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
      <div className="text-xl font-bold">{value}</div>
      <div className="text-[10px] text-muted-foreground font-medium">{label}</div>
    </div>
  );
}