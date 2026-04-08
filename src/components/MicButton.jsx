import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MicButton({ onResult, lang = 'ar-SA', className }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);

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
      if (transcript) onResult(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, [lang]);

  const toggle = () => {
    if (!supported) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    } else {
      recognitionRef.current?.start();
      setListening(true);
    }
  };

  if (!supported) {
    return (
      <div className={cn("w-14 h-14 rounded-full flex items-center justify-center bg-muted text-muted-foreground text-xs text-center", className)}>
        <MicOff className="w-5 h-5" />
      </div>
    );
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200",
        listening
          ? "bg-red-500 text-white shadow-lg shadow-red-500/40 scale-110 animate-pulse"
          : "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-105 active:scale-95",
        className
      )}
    >
      {listening ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </button>
  );
}