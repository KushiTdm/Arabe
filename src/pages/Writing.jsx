import { useState } from 'react';
import { ArrowLeft, CheckCircle, Loader2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useUserProgress } from '@/lib/useUserProgress';
import CreditsBadge from '@/components/CreditsBadge';
import DrawingCanvas from '@/components/DrawingCanvas';
import AudioButton from '@/components/AudioButton';

const WRITING_EXERCISES = [
  {
    id: 'copy',
    title: 'Recopiez le mot',
    description: 'Dessinez le mot arabe avec le doigt',
    words: [
      { arabic: 'كتاب', french: 'Livre', transliteration: 'kitab' },
      { arabic: 'مدرسة', french: 'École', transliteration: 'madrasa' },
      { arabic: 'قلم', french: 'Stylo', transliteration: 'qalam' },
      { arabic: 'بيت', french: 'Maison', transliteration: 'bayt' },
      { arabic: 'ماء', french: 'Eau', transliteration: "ma'" },
      { arabic: 'شمس', french: 'Soleil', transliteration: 'shams' },
      { arabic: 'قمر', french: 'Lune', transliteration: 'qamar' },
      { arabic: 'ولد', french: 'Garçon', transliteration: 'walad' },
    ]
  },
  {
    id: 'translate',
    title: 'Traduisez en arabe',
    description: 'Dessinez la traduction arabe du mot français',
    words: [
      { arabic: 'سلام', french: 'Paix', transliteration: 'salam' },
      { arabic: 'حب', french: 'Amour', transliteration: 'hub' },
      { arabic: 'يوم', french: 'Jour', transliteration: 'yawm' },
      { arabic: 'ليل', french: 'Nuit', transliteration: 'layl' },
      { arabic: 'طعام', french: 'Nourriture', transliteration: "ta'am" },
      { arabic: 'سمك', french: 'Poisson', transliteration: 'samak' },
    ]
  }
];

export default function Writing() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [canvasKey, setCanvasKey] = useState(0);
  const { incrementCredits, canUseAI, creditsRemaining, addXP, updateProgress, progress } = useUserProgress();

  const checkDrawing = async (imageDataUrl) => {
    if (isChecking) return;
    const word = selectedExercise.words[currentIndex];
    setIsChecking(true);

    if (canUseAI()) {
      const ok = await incrementCredits();
      if (ok) {
        // Upload the drawing first
        const blob = await (await fetch(imageDataUrl)).blob();
        const file = new File([blob], 'drawing.png', { type: 'image/png' });
        const { file_url } = await base44.integrations.Core.UploadFile({ file });

        const res = await base44.integrations.Core.InvokeLLM({
          prompt: `L'élève apprend à écrire l'arabe. Il devait écrire le mot arabe "${word.arabic}" (${word.french}, translitération: ${word.transliteration}).
Regarde l'image de ce qu'il a dessiné et évalue son écriture.
Est-ce que les lettres ressemblent au mot arabe cible? Donne un feedback encourageant et des conseils d'amélioration en français.`,
          model: 'gemini_3_flash',
          file_urls: [file_url],
          response_json_schema: {
            type: "object",
            properties: {
              score: { type: "number", description: "Score de 0 à 10" },
              is_good: { type: "boolean" },
              feedback: { type: "string" },
              tip: { type: "string" }
            }
          }
        });
        setFeedback(res);
        if (res.is_good || res.score >= 6) setScore(s => s + 1);
      }
    } else {
      setFeedback({
        score: null,
        is_good: true,
        feedback: "Crédits IA insuffisants pour l'évaluation. Comparez visuellement avec le mot affiché.",
        tip: ''
      });
    }
    setIsChecking(false);
  };

  const nextWord = async () => {
    if (currentIndex < selectedExercise.words.length - 1) {
      setCurrentIndex(i => i + 1);
      setFeedback(null);
      setCanvasKey(k => k + 1);
    } else {
      await addXP(score * 10);
      await updateProgress({
        writing_exercises_count: (progress?.writing_exercises_count || 0) + 1,
        lessons_completed: (progress?.lessons_completed || 0) + 1
      });
      setSelectedExercise(null);
      setCurrentIndex(0);
      setScore(0);
      setFeedback(null);
      setCanvasKey(k => k + 1);
    }
  };

  if (!selectedExercise) {
    return (
      <div className="px-5 pt-14 pb-4 space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 rounded-xl hover:bg-muted transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Écriture arabe</h1>
            <p className="text-xs text-muted-foreground">Écrivez avec le doigt sur l'écran</p>
          </div>
          <CreditsBadge creditsRemaining={creditsRemaining()} />
        </div>

        <div className="space-y-3">
          {WRITING_EXERCISES.map(ex => (
            <button
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              className="w-full p-5 rounded-2xl bg-card border border-border text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{ex.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{ex.description}</p>
                  <p className="text-xs text-primary mt-2">{ex.words.length} mots</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const word = selectedExercise.words[currentIndex];
  const isLastWord = currentIndex === selectedExercise.words.length - 1;

  return (
    <div className="px-5 pt-14 pb-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => { setSelectedExercise(null); setCurrentIndex(0); setScore(0); setFeedback(null); }} className="p-2 rounded-xl hover:bg-muted transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-sm font-bold">{selectedExercise.title}</h1>
          <p className="text-[10px] text-muted-foreground">{currentIndex + 1} / {selectedExercise.words.length}</p>
        </div>
        <div className="text-sm font-bold text-primary">Score: {score}</div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / selectedExercise.words.length) * 100}%` }} />
      </div>

      {/* Word to reproduce */}
      <div className="p-6 rounded-3xl bg-card border border-border text-center space-y-2">
        {selectedExercise.id === 'copy' ? (
          <>
            <div className="flex items-center justify-center gap-3">
              <p className="font-arabic text-4xl font-bold" dir="rtl">{word.arabic}</p>
              <AudioButton text={word.arabic} size="md" />
            </div>
            <p className="text-sm text-muted-foreground">{word.french}</p>
            <p className="text-xs text-primary italic">{word.transliteration}</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold">{word.french}</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-muted-foreground italic">{word.transliteration}</p>
              <AudioButton text={word.arabic} size="sm" />
            </div>
          </>
        )}
      </div>

      {/* Instructions */}
      <p className="text-xs text-center text-muted-foreground">
        ✍️ Dessinez le mot arabe avec votre doigt ci-dessous
      </p>

      {/* Drawing canvas */}
      {!feedback ? (
        <DrawingCanvas
          key={canvasKey}
          onSubmit={checkDrawing}
          disabled={isChecking}
          placeholder="Dessinez ici avec le doigt..."
        />
      ) : (
        <div className="space-y-3">
          {/* Show the canvas result + correct word */}
          <div className={`p-4 rounded-2xl ${feedback.is_good || (feedback.score >= 6) ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/10 border border-secondary/20'}`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">
                {feedback.is_good || (feedback.score >= 6) ? '✅ Bien joué !' : '📝 Continuez à pratiquer'}
              </p>
              {feedback.score != null && (
                <span className="text-xs font-bold text-primary">{feedback.score}/10</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{feedback.feedback}</p>
            {feedback.tip && <p className="text-xs text-primary mt-1.5">💡 {feedback.tip}</p>}
          </div>

          {/* Correct answer reminder */}
          <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Mot correct :</p>
              <p className="font-arabic text-2xl font-bold" dir="rtl">{word.arabic}</p>
            </div>
            <AudioButton text={word.arabic} size="md" />
          </div>

          <Button onClick={nextWord} className="w-full h-12 rounded-2xl text-sm">
            {isLastWord ? 'Terminer' : 'Mot suivant'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      {isChecking && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground py-4">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <p className="text-sm">Analyse de votre écriture...</p>
        </div>
      )}
    </div>
  );
}