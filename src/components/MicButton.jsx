import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MicButton({ onResult, lang = 'ar-SA', className }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);
  // Always call the latest version of onResult, avoids stale closure bug
  const onResultRef = useRef(onResult);
  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || '';
      if (transcript) onResultRef.current(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;

    // Cleanup: stop recognition if component unmounts while listening
    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      try { recognition.abort(); } catch {}
    };
  }, [lang]);

  const toggle = () => {
    if (!supported || !recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch (err) {
        console.error('Erreur microphone:', err);
        setListening(false);
      }
    }
  };

  if (!supported) {
    return (
      <div
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center bg-muted text-muted-foreground',
          className,
        )}
        title="Reconnaissance vocale non supportée"
      >
        <MicOff className="w-5 h-5" />
      </div>
    );
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200',
        listening
          ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 scale-110 animate-pulse'
          : 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-105 active:scale-95',
        className,
      )}
      title={listening ? 'Arrêter' : 'Parler en arabe'}
    >
      {listening ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </button>
  );
}