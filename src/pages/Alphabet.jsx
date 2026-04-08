import { useState } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ARABIC_LETTERS = [
  { letter: 'ا', name: 'Alif', sound: 'a', isolated: 'ا', initial: 'ا', medial: 'ـا', final: 'ـا' },
  { letter: 'ب', name: 'Ba', sound: 'b', isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب' },
  { letter: 'ت', name: 'Ta', sound: 't', isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت' },
  { letter: 'ث', name: 'Tha', sound: 'th', isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث' },
  { letter: 'ج', name: 'Jim', sound: 'j', isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج' },
  { letter: 'ح', name: 'Ha', sound: 'ḥ', isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح' },
  { letter: 'خ', name: 'Kha', sound: 'kh', isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ' },
  { letter: 'د', name: 'Dal', sound: 'd', isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد' },
  { letter: 'ذ', name: 'Dhal', sound: 'dh', isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ' },
  { letter: 'ر', name: 'Ra', sound: 'r', isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر' },
  { letter: 'ز', name: 'Zay', sound: 'z', isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز' },
  { letter: 'س', name: 'Sin', sound: 's', isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس' },
  { letter: 'ش', name: 'Shin', sound: 'sh', isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش' },
  { letter: 'ص', name: 'Sad', sound: 'ṣ', isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص' },
  { letter: 'ض', name: 'Dad', sound: 'ḍ', isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض' },
  { letter: 'ط', name: 'Tah', sound: 'ṭ', isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط' },
  { letter: 'ظ', name: 'Dhah', sound: 'ẓ', isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ' },
  { letter: 'ع', name: 'Ayn', sound: "'", isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع' },
  { letter: 'غ', name: 'Ghayn', sound: 'gh', isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ' },
  { letter: 'ف', name: 'Fa', sound: 'f', isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف' },
  { letter: 'ق', name: 'Qaf', sound: 'q', isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق' },
  { letter: 'ك', name: 'Kaf', sound: 'k', isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك' },
  { letter: 'ل', name: 'Lam', sound: 'l', isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل' },
  { letter: 'م', name: 'Mim', sound: 'm', isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم' },
  { letter: 'ن', name: 'Nun', sound: 'n', isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن' },
  { letter: 'ه', name: 'Ha', sound: 'h', isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه' },
  { letter: 'و', name: 'Waw', sound: 'w/u', isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو' },
  { letter: 'ي', name: 'Ya', sound: 'y/i', isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي' },
];

export default function Alphabet() {
  const [selectedLetter, setSelectedLetter] = useState(null);

  return (
    <div className="px-5 pt-14 pb-4 space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/" className="p-2 rounded-xl hover:bg-muted transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">Alphabet arabe</h1>
          <p className="text-xs text-muted-foreground">Les 28 lettres</p>
        </div>
      </div>

      {selectedLetter ? (
        <LetterDetail letter={selectedLetter} onBack={() => setSelectedLetter(null)} />
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {ARABIC_LETTERS.map((item) => (
            <button
              key={item.name}
              onClick={() => setSelectedLetter(item)}
              className="p-3 rounded-2xl bg-card border border-border text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <p className="font-arabic text-2xl font-bold">{item.letter}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{item.name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LetterDetail({ letter, onBack }) {
  return (
    <div className="space-y-5">
      <button onClick={onBack} className="text-sm text-primary font-medium flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Retour aux lettres
      </button>

      <div className="p-8 rounded-3xl bg-card border border-border text-center">
        <p className="font-arabic text-7xl font-bold">{letter.letter}</p>
        <p className="text-xl font-semibold mt-3">{letter.name}</p>
        <p className="text-sm text-muted-foreground mt-1">Son : <span className="text-primary font-mono">{letter.sound}</span></p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold">Formes de la lettre</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Isolée', form: letter.isolated },
            { label: 'Début', form: letter.initial },
            { label: 'Milieu', form: letter.medial },
            { label: 'Fin', form: letter.final },
          ].map(f => (
            <div key={f.label} className="p-4 rounded-xl bg-muted text-center">
              <p className="font-arabic text-2xl font-bold">{f.form}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}