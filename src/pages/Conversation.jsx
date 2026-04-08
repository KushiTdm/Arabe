import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Loader2, AlertTriangle, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useUserProgress } from '@/lib/useUserProgress';
import CreditsBadge from '@/components/CreditsBadge';
import AudioButton, { speakArabic } from '@/components/AudioButton';
import MicButton from '@/components/MicButton';

// Gemini 2.0 Flash — identifiant correct pour base44/InvokeLLM
const GEMINI_MODEL = 'gemini_2_flash';

const TOPICS = [
  { id: 'greetings', label: 'التحيات', fr: 'Salutations', emoji: '👋' },
  { id: 'restaurant', label: 'المطعم', fr: 'Au restaurant', emoji: '🍽️' },
  { id: 'shopping', label: 'التسوق', fr: 'Shopping', emoji: '🛍️' },
  { id: 'travel', label: 'السفر', fr: 'Voyage', emoji: '✈️' },
  { id: 'family', label: 'العائلة', fr: 'Famille', emoji: '👨‍👩‍👧‍👦' },
  { id: 'daily', label: 'الحياة اليومية', fr: 'Vie quotidienne', emoji: '☀️' },
];

export default function Conversation() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { progress, incrementCredits, canUseAI, creditsRemaining, addXP, updateProgress } =
    useUserProgress();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startConversation = async (topic) => {
    setSelectedTopic(topic);
    setAiError(null);
    if (!canUseAI()) return;
    setIsLoading(true);

    try {
      const ok = await incrementCredits();
      if (!ok) return;

      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Tu es un professeur d'arabe patient et encourageant. Commence une conversation simple en arabe sur le thème "${topic.fr}". 
Donne une phrase d'accueil en arabe, sa translitération, et sa traduction en français.
Puis pose une question simple pour lancer la conversation. Utilise un arabe simple adapté aux débutants.`,
        model: GEMINI_MODEL,
        response_json_schema: {
          type: 'object',
          properties: {
            arabic_text: { type: 'string' },
            transliteration: { type: 'string' },
            french_translation: { type: 'string' },
            suggestion: { type: 'string' },
          },
        },
      });

      setMessages([
        {
          role: 'ai',
          arabic: res.arabic_text,
          transliteration: res.transliteration,
          french: res.french_translation,
          suggestion: res.suggestion,
        },
      ]);
      setTimeout(() => speakArabic(res.arabic_text), 300);
    } catch (err) {
      console.error('Erreur IA conversation:', err);
      setAiError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (spokenText) => {
    if (!spokenText?.trim() || isLoading || !canUseAI()) return;

    setMessages((prev) => [...prev, { role: 'user', text: spokenText }]);
    setAiError(null);
    setIsLoading(true);

    try {
      const ok = await incrementCredits();
      if (!ok) return;

      const history = messages
        .map((m) =>
          m.role === 'user'
            ? `Élève: ${m.text}`
            : `Prof: ${m.arabic} (${m.transliteration}) - ${m.french}`,
        )
        .join('\n');

      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Tu es un professeur d'arabe patient. Conversation sur le thème "${selectedTopic.fr}":
${history}
Élève (a parlé): ${spokenText}

Réponds en arabe avec translitération et traduction. Si l'élève a parlé en arabe, évalue brièvement sa prononciation/formulation. Corrige les erreurs gentiment. Continue la conversation.
Si l'élève a parlé en français, aide-le à dire la même chose en arabe.`,
        model: GEMINI_MODEL,
        response_json_schema: {
          type: 'object',
          properties: {
            arabic_text: { type: 'string' },
            transliteration: { type: 'string' },
            french_translation: { type: 'string' },
            pronunciation_feedback: { type: 'string' },
            correction: { type: 'string' },
            suggestion: { type: 'string' },
          },
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          arabic: res.arabic_text,
          transliteration: res.transliteration,
          french: res.french_translation,
          correction: res.correction,
          pronunciation_feedback: res.pronunciation_feedback,
          suggestion: res.suggestion,
        },
      ]);
      setTimeout(() => speakArabic(res.arabic_text), 300);

      await addXP(5);
      await updateProgress({
        conversations_count: (progress?.conversations_count || 0) + 1,
      });
    } catch (err) {
      console.error('Erreur IA réponse:', err);
      setAiError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedTopic) {
    return (
      <div className="px-5 pt-14 pb-4 space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 rounded-xl hover:bg-muted transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Conversation IA</h1>
            <p className="text-xs text-muted-foreground">Choisissez un thème</p>
          </div>
          <CreditsBadge creditsRemaining={creditsRemaining()} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => startConversation(topic)}
              disabled={!canUseAI() || isLoading}
              className="p-5 rounded-2xl bg-card border border-border text-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
            >
              <span className="text-3xl block mb-2">{topic.emoji}</span>
              <p className="font-arabic text-lg font-semibold">{topic.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{topic.fr}</p>
            </button>
          ))}
        </div>

        {!canUseAI() && (
          <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-destructive">Crédits IA épuisés</p>
              <p className="text-xs text-muted-foreground mt-1">
                Vous avez utilisé tous vos crédits IA.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <div className="px-5 pt-14 pb-3 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedTopic(null);
              setMessages([]);
              setAiError(null);
            }}
            className="p-2 rounded-xl hover:bg-muted transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-bold">
              {selectedTopic.emoji} {selectedTopic.fr}
            </h1>
            <p className="text-[10px] text-muted-foreground font-arabic">{selectedTopic.label}</p>
          </div>
          <CreditsBadge creditsRemaining={creditsRemaining()} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs">Le professeur réfléchit...</span>
          </div>
        )}
        {aiError && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-destructive/10 border border-destructive/20">
            <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
            <p className="text-xs text-destructive">{aiError}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Mic input */}
      <div className="px-5 pb-28 pt-4 border-t border-border bg-card/80 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-3 py-2">
          <p className="text-xs text-muted-foreground">Appuyez et parlez en arabe</p>
          <MicButton onResult={(text) => sendMessage(text)} lang="ar-SA" />
          <p className="text-[10px] text-muted-foreground">L'IA corrigera votre prononciation</p>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-primary text-primary-foreground">
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] space-y-2">
        <div className="px-4 py-3 rounded-2xl bg-card border border-border shadow-sm">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <p className="font-arabic text-xl leading-relaxed text-right" dir="rtl">
                {message.arabic}
              </p>
              <p className="text-xs text-primary mt-1.5 italic">{message.transliteration}</p>
              <p className="text-sm text-muted-foreground mt-1">{message.french}</p>
            </div>
            <AudioButton text={message.arabic} size="sm" className="mt-1 shrink-0" />
          </div>
        </div>
        {message.pronunciation_feedback && (
          <div className="px-3 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-primary">🗣️ {message.pronunciation_feedback}</p>
          </div>
        )}
        {message.correction && (
          <div className="px-3 py-2 rounded-xl bg-secondary/10 border border-secondary/20">
            <p className="text-xs text-secondary-foreground">💡 {message.correction}</p>
          </div>
        )}
        {message.suggestion && (
          <div className="px-3 py-2 rounded-xl bg-accent">
            <p className="text-xs text-accent-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {message.suggestion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}