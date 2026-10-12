import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProfile } from '../lib/ProfileContext';
import { useSpeaker } from '../lib/useSpeaker';
import { markStepDone, pathStorageKey } from '../lib/usePathProgress';
import { getLesson } from '../content';
import { getLexiconForUnit, getLessonCover } from '../content/lexicon';
import { LEVEL_LABEL } from '../data/learningPath';
import { UNIT_XP } from '../lib/usePathProgress';
import { LessonIntroMotion, CelebrationMotion, AnswerMotion, SpeakingWaves, AnimatedBar, LetterRevealMotion, WordRevealMotion } from '../components/motion';
import { useReviewDeck, reviewStorageKey } from '../lib/useReviewDeck';
import { PART_PASS_RATIO, type Activity, type Word } from '../content/types';
import { VOCAB_IMAGES } from '../content/images';
import { LETTER_IMG } from '../content/imageKeys';
import { WordPic } from '../components/WordPic';
import { PressableScale } from '../components/anim';
import { colors, borderRadius, fontSize } from '../theme';

// ─── Lecteur de leçon intégrée ───────────────────────────────────────────────
// Joue une partie (≈ 5 min) d'une leçon de content/ : cartes de découverte,
// écoute, lecture, paires proches, appariement, phrases à remettre en ordre,
// répliques et répétition orale. Aucune IA, aucun réseau, aucun crédit.
//
// Une réponse fausse est reposée en fin de partie. La note est la part des
// activités réussies du premier coup ; la partie est validée à PART_PASS_RATIO.

const SCORED: Activity['type'][] = ['listen', 'read', 'pick', 'pair', 'match', 'order', 'reply', 'restore'];

/** Mélange déterministe (graine = texte) pour que l'ordre ne saute pas à chaque rendu. */
function shuffled<T>(items: T[], seed: string): T[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    h = (h * 1664525 + 1013904223) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface Verdict { ok: boolean; answer?: string }

export default function LessonScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { language, activeProfile } = useProfile();
  const speaker = useSpeaker();
  const deck = useReviewDeck(reviewStorageKey(activeProfile?.id, language.code));

  const lessonId: string = route.params?.lessonId;
  const partIdx: number = route.params?.part ?? 0;
  const pathStep: { unitId: string; stepIdx: number } | undefined = route.params?.pathStep;
  const lesson = getLesson(language.code, lessonId);
  const part = lesson?.parts[partIdx];

  // File d'activités : les ratées reviennent en fin de partie (une fois).
  const [queue, setQueue] = useState<{ act: Activity; retry: boolean }[]>(
    () => (part?.activities ?? []).map(act => ({ act, retry: false })),
  );
  const [pos, setPos] = useState(0);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [firstTry, setFirstTry] = useState(0);
  const [scoredTotal, setScoredTotal] = useState(0);
  const saved = useRef(false);
  const [intro, setIntro] = useState(true);

  useEffect(() => () => speaker.stop(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const current = queue[pos];
  const done = pos >= queue.length;
  const total = part?.activities.length ?? 0;
  const pct = scoredTotal === 0 ? 100 : Math.round((firstTry / scoredTotal) * 100);
  const passed = pct >= PART_PASS_RATIO * 100;

  // Fin de partie : validation de l'étape du parcours.
  useEffect(() => {
    if (!done || !passed || saved.current || !pathStep) return;
    saved.current = true;
    // Les mots de l'unité entrent dans la révision espacée dès la 1re partie réussie.
    if (partIdx === 0) deck.addWords(getLexiconForUnit(language.code, lessonId));
    markStepDone(pathStorageKey(activeProfile?.id, language.code), pathStep.unitId, pathStep.stepIdx);
  }, [done, passed]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lesson || !part) {
    return (
      <View style={[styles.root, styles.center]}>
        <Text style={styles.muted}>Leçon introuvable.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.link}>Retour</Text></TouchableOpacity>
      </View>
    );
  }

  const resolve = (ok: boolean, answer?: string) => {
    if (!current) return;
    const scored = SCORED.includes(current.act.type);
    if (scored && !current.retry) {
      setScoredTotal(n => n + 1);
      if (ok) setFirstTry(n => n + 1);
    }
    if (!ok && scored && !current.retry) setQueue(q => [...q, { act: current.act, retry: true }]);
    if (scored) setVerdict({ ok, answer });
    else next();
  };

  const next = () => {
    setVerdict(null);
    speaker.stop();
    setPos(p => p + 1);
  };

  const restart = () => {
    saved.current = false;
    setQueue(part.activities.map(act => ({ act, retry: false })));
    setPos(0); setFirstTry(0); setScoredTotal(0); setVerdict(null);
  };

  // ─── Fin de partie ─────────────────────────────────────────────────────────
  if (done) {
    const nextPart = lesson.parts[partIdx + 1];
    const cover = getLessonCover(language.code, lesson.id);
    const lastPart = partIdx === lesson.parts.length - 1;
    return (
      <View style={[styles.root, styles.center, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}>
        <CelebrationMotion
          title={lesson.title}
          message={passed ? 'Partie réussie' : 'Presque !'}
          score={pct}
          passed={passed}
          img={cover.img}
          emoji={cover.emoji}
          xp={lastPart ? UNIT_XP : undefined}
        />
        <Text style={[styles.muted, { marginTop: 14 }]}>
          {passed
            ? (nextPart ? `Suite : ${nextPart.title}` : 'Unité terminée, bravo.')
            : `Il faut ${Math.round(PART_PASS_RATIO * 100)} % pour valider. Réécoute et recommence.`}
        </Text>
        <View style={styles.endActions}>
          {!passed && (
            <PressableScale style={[styles.cta, { backgroundColor: colors.secondary }]} onPress={restart}>
              <Text style={styles.ctaText}>Recommencer</Text>
            </PressableScale>
          )}
          <PressableScale style={[styles.cta, !passed && styles.ctaGhost]} onPress={() => navigation.goBack()}>
            <Text style={[styles.ctaText, !passed && { color: colors.text }]}>{passed ? 'Continuer' : 'Quitter'}</Text>
          </PressableScale>
        </View>
      </View>
    );
  }

  const act = current.act;
  const key = `${partIdx}-${pos}`;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="close" size={26} color={colors.text} />
        </TouchableOpacity>
        <AnimatedBar style={{ flex: 1 }} height={10} value={pos / Math.max(queue.length, total, 1)} />
        <Text style={styles.partTag}>{part.title}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        {current.retry && <Text style={styles.retry}>↻ On la refait</Text>}
        {!intro && <ActivityView key={key} act={act} lang={language.code} speaker={speaker}
          locked={!!verdict} onResolve={resolve} onNext={next} />}
      </ScrollView>

      {intro && (
        <LessonIntroMotion
          title={lesson.title}
          goal={lesson.goal}
          tag={`${LEVEL_LABEL[lesson.level].cefr} · ${part.title} (${partIdx + 1}/${lesson.parts.length})`}
          {...getLessonCover(language.code, lesson.id)}
          onDone={() => setIntro(false)}
        />
      )}

      {verdict && (
        <View style={[styles.feedback, verdict.ok ? styles.fbOk : styles.fbKo, { paddingBottom: insets.bottom + 12 }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.fbTitle, { color: verdict.ok ? '#065f46' : '#991b1b' }]}>
              {verdict.ok ? 'Bien !' : 'Pas tout à fait'}
            </Text>
            {!verdict.ok && !!verdict.answer && <Text style={styles.fbAnswer}>{verdict.answer}</Text>}
          </View>
          <PressableScale style={[styles.fbBtn, { backgroundColor: verdict.ok ? colors.success : colors.destructive }]} onPress={next}>
            <Text style={styles.ctaText}>Continuer</Text>
          </PressableScale>
        </View>
      )}
    </View>
  );
}

// ─── Rendu d'une activité ────────────────────────────────────────────────────

type Speaker = ReturnType<typeof useSpeaker>;
interface ViewProps {
  act: Activity; lang: string; speaker: Speaker; locked: boolean;
  onResolve: (ok: boolean, answer?: string) => void; onNext: () => void;
}

function Listen({ word, speaker, big }: { word: Word; speaker: Speaker; big?: boolean }) {
  return (
    <View style={styles.listenRow}>
      <TouchableOpacity style={[styles.speakBtn, big && styles.speakBig]} onPress={() => speaker.say(word.ar, { id: word.ar })}>
        <Ionicons name="volume-high" size={big ? 34 : 22} color={colors.white} />
      </TouchableOpacity>
      <SpeakingWaves active={speaker.speakingId === word.ar || speaker.speakingId === word.ar + '-slow'} bars={4} height={big ? 34 : 22} />
      <TouchableOpacity style={styles.slowBtn} onPress={() => speaker.saySlow(word.ar, word.ar + '-slow')}>
        <Ionicons name="walk" size={18} color={colors.primaryLight} />
        <Text style={styles.slowText}>Lent</Text>
      </TouchableOpacity>
    </View>
  );
}

const Pic = ({ word, size }: { word: Word; size: number }) => <WordPic img={word.img} emoji={word.emoji} size={size} />;

function optionLabel(o: Word, as: 'fr' | 'tr' | 'ar'): { main: string; arabic: boolean } {
  if (as === 'ar') return { main: o.show ?? o.ar, arabic: true };
  if (as === 'tr') return { main: o.tr, arabic: false };
  return { main: o.fr, arabic: false };
}

function ActivityView({ act, speaker, locked, onResolve, onNext }: ViewProps) {
  const [picked, setPicked] = useState<number | null>(null);

  // Lecture automatique de l'énoncé audio (écoute, paire proche).
  useEffect(() => {
    if (act.type === 'listen') speaker.say(act.target.ar, { id: act.target.ar });
    if (act.type === 'pair') speaker.say(act.heard === 'a' ? act.a.ar : act.b.ar);
    if (act.type === 'repeat') speaker.say(act.target.ar, { id: act.target.ar });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const options = useMemo(() => {
    if (act.type === 'listen' || act.type === 'read' || act.type === 'pick') return shuffled(act.options, act.target.ar + act.type);
    if (act.type === 'reply') return act.options.map((o, i) => ({ o, i }));
    return [];
  }, [act]);

  switch (act.type) {
    case 'teach':
      return <Teach act={act} speaker={speaker} onNext={onNext} />;

    case 'listen':
    case 'read':
    case 'pick': {
      const as: 'fr' | 'tr' | 'ar' = act.type === 'pick' ? 'ar' : act.as;
      const ask = act.type === 'listen' ? (as === 'ar' ? 'Quel mot as-tu entendu ?' : 'Que signifie ce que tu entends ?')
        : act.type === 'read' ? (as === 'tr' ? 'Comment se lit ce mot ?' : 'Que signifie ce mot ?')
        : 'Comment dit-on…';
      const ok = (o: Word) => o.ar === act.target.ar;
      const correctLabel = (() => {
        const l = optionLabel(act.target, as);
        return as === 'ar' ? `${act.target.ar}  ·  ${act.target.tr}` : l.main;
      })();
      return (
        <View>
          <Text style={styles.ask}>{ask}</Text>
          {act.type === 'listen' && <Listen word={act.target} speaker={speaker} big />}
          {act.type === 'read' && (
            <View style={styles.stage}>
              {as === 'tr' && <View style={{ marginBottom: 8 }}><Pic word={act.target} size={110} /></View>}
              <Text style={styles.arabicBig}>{act.target.show ?? act.target.ar}</Text>
              <TouchableOpacity onPress={() => speaker.say(act.target.ar, { id: act.target.ar })} style={styles.miniSpeak}>
                <Ionicons name="volume-medium" size={20} color={colors.primaryLight} />
              </TouchableOpacity>
            </View>
          )}
          {act.type === 'pick' && (
            <View style={styles.stage}>
              <View style={{ marginBottom: 8 }}><Pic word={act.target} size={140} /></View>
              <Text style={styles.frBig}>{act.target.fr}</Text>
            </View>
          )}
          {(options as Word[]).map((o, i) => {
            const label = optionLabel(o, as);
            const state = picked === null ? 0 : ok(o) ? 1 : picked === i ? 2 : 0;
            return (
              <AnswerMotion key={o.ar + i} status={state === 1 ? 'correct' : state === 2 ? 'wrong' : null}>
<PressableScale disabled={locked} style={[styles.option, state === 1 && styles.optOk, state === 2 && styles.optKo]}
                onPress={() => { setPicked(i); if (as === 'ar') speaker.say(o.ar); onResolve(ok(o), correctLabel); }}>
                <Text style={[label.arabic ? styles.optArabic : styles.optText]}>{label.main}</Text>
                {label.arabic && picked !== null && <Text style={styles.optSub}>{o.tr}</Text>}
              </PressableScale>
</AnswerMotion>
            );
          })}
        </View>
      );
    }

    case 'pair': {
      const heardWord = act.heard === 'a' ? act.a : act.b;
      const items = shuffled([{ k: 'a' as const, w: act.a }, { k: 'b' as const, w: act.b }], act.a.ar + act.b.ar);
      return (
        <View>
          <Text style={styles.ask}>Quel est le mot que tu entends ?</Text>
          <Listen word={heardWord} speaker={speaker} big />
          <View style={styles.pairRow}>
            {items.map((it, i) => {
              const right = it.k === act.heard;
              const state = picked === null ? 0 : right ? 1 : picked === i ? 2 : 0;
              return (
                <AnswerMotion key={it.k} status={state === 1 ? 'correct' : state === 2 ? 'wrong' : null}>
<PressableScale disabled={locked} style={[styles.pairCard, state === 1 && styles.optOk, state === 2 && styles.optKo]}
                  onPress={() => { setPicked(i); onResolve(right, `${heardWord.ar}  ·  ${heardWord.tr}`); }}>
                  <Text style={styles.arabicBig}>{it.w.ar}</Text>
                  {picked !== null && <Text style={styles.optSub}>{it.w.tr}</Text>}
                </PressableScale>
</AnswerMotion>
              );
            })}
          </View>
          {!!act.note && picked !== null && <Text style={styles.note}>{act.note}</Text>}
        </View>
      );
    }

    case 'match':
      return <Match act={act} speaker={speaker} onResolve={onResolve} locked={locked} />;

    case 'order':
      return <Order act={act} speaker={speaker} onResolve={onResolve} locked={locked} />;

    case 'reply': {
      return (
        <View>
          <Text style={styles.ask}>{act.prompt}</Text>
          <View style={styles.bubble}>
            {act.context.map((c, i) => (
              <View key={i}>
                {c.tr ? (
                  <TouchableOpacity onPress={() => speaker.say(c.ar)} style={styles.bubbleLine}>
                    <Ionicons name="volume-medium" size={20} color={colors.primaryLight} />
                    <View>
                      <Text style={styles.arabicMid}>{c.show ?? c.ar}</Text>
                      <Text style={styles.optSub}>{c.tr}</Text>
                    </View>
                  </TouchableOpacity>
                ) : <Text style={styles.frBig}>{c.fr}</Text>}
              </View>
            ))}
          </View>
          {(options as { o: Word; i: number }[]).map(({ o, i }) => {
            const state = picked === null ? 0 : i === act.answer ? 1 : picked === i ? 2 : 0;
            const answerText = act.options[act.answer];
            return (
              <AnswerMotion key={i} status={state === 1 ? 'correct' : state === 2 ? 'wrong' : null}>
<PressableScale disabled={locked} style={[styles.option, state === 1 && styles.optOk, state === 2 && styles.optKo]}
                onPress={() => { setPicked(i); if (o.tr) speaker.say(o.ar); onResolve(i === act.answer, answerText.tr ? `${answerText.ar}  ·  ${answerText.fr}` : answerText.fr); }}>
                {o.tr ? (
                  <>
                    <Text style={styles.optArabic}>{o.show ?? o.ar}</Text>
                    <Text style={styles.optSub}>{o.tr} — {o.fr}</Text>
                  </>
                ) : <Text style={styles.optText}>{o.fr}</Text>}
              </PressableScale>
</AnswerMotion>
            );
          })}
        </View>
      );
    }

    case 'restore': {
      const opts = shuffled(act.options, act.target.ar + 'restore');
      return (
        <View>
          <Text style={styles.ask}>Quelle est la bonne lecture ?</Text>
          <View style={styles.stage}>
            <Text style={styles.arabicBig}>{act.target.show}</Text>
            <Text style={styles.hint}>Voyelles retirées — retrouve le mot.</Text>
          </View>
          {opts.map((o, i) => {
            const right = o.ar === act.target.ar;
            const state = picked === null ? 0 : right ? 1 : picked === i ? 2 : 0;
            return (
              <AnswerMotion key={o.ar} status={state === 1 ? 'correct' : state === 2 ? 'wrong' : null}>
<PressableScale disabled={locked} style={[styles.option, state === 1 && styles.optOk, state === 2 && styles.optKo]}
                onPress={() => { setPicked(i); speaker.say(o.ar); onResolve(right, `${act.target.ar}  ·  ${act.target.tr} — ${act.target.fr}`); }}>
                <Text style={styles.optArabic}>{o.ar}</Text>
                {picked !== null && <Text style={styles.optSub}>{o.tr} — {o.fr}</Text>}
              </PressableScale>
</AnswerMotion>
            );
          })}
        </View>
      );
    }

    case 'repeat':
      return (
        <View>
          <Text style={styles.ask}>Écoute, puis répète à voix haute</Text>
          <View style={styles.stage}>
            <WordRevealMotion native={act.target.ar} translit={act.target.tr} meaning={act.target.fr}
              img={act.target.img} emoji={act.target.emoji} rtl picSize={110} nativeSize={40} replayKey={act.target.ar} />
          </View>
          <Listen word={act.target} speaker={speaker} big />
          <PressableScale style={styles.cta} onPress={() => onResolve(true)}>
            <Text style={styles.ctaText}>Je l'ai répété</Text>
          </PressableScale>
        </View>
      );
  }
  return null;
}

// ─── Découverte ──────────────────────────────────────────────────────────────

function Teach({ act, speaker, onNext }: { act: Extract<Activity, { type: 'teach' }>; speaker: Speaker; onNext: () => void }) {
  const { language } = useProfile();
  const letter = act.letter ? language.alphabet.find(l => l.letter === act.letter) : undefined;
  const example = letter?.example?.split(' (')[0];

  return (
    <View>
      {letter ? (
        <View style={styles.stage}>
          <Text style={styles.kicker}>{act.title}</Text>
          <LetterRevealMotion
            letter={letter.letter}
            name={letter.name}
            sound={letter.sound}
            forms={([['Isolée', letter.isolated], ['Début', letter.initial], ['Milieu', letter.medial], ['Fin', letter.final]] as [string, string | undefined][])
              .map(([k, v]) => [k, v ?? letter.letter] as [string, string])}
            img={language.code === 'ar' ? LETTER_IMG[letter.letter] : undefined}
            keyword={example ? letter.example : undefined}
            replayKey={letter.letter}
          />
          {!!letter.tips && <Text style={styles.note}>{letter.tips}</Text>}
          {!!example && (
            <TouchableOpacity style={styles.exampleBtn} onPress={() => speaker.say(example, { id: example })}>
              <Ionicons name="volume-high" size={20} color={colors.white} />
              <Text style={styles.exampleText}>Écouter le mot</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View>
          <Text style={styles.teachTitle}>{act.title}</Text>
          {!!act.body && <Text style={styles.teachBody}>{act.body}</Text>}
          {act.words?.map(wd => (
            <TouchableOpacity key={wd.ar} style={styles.wordCard} onPress={() => speaker.say(wd.ar, { id: wd.ar })}>
              <Pic word={wd} size={64} />
              <View style={{ flex: 1 }}>
                <Text style={styles.arabicMid}>{wd.show ?? wd.ar}</Text>
                <Text style={styles.trLine}>{wd.tr}</Text>
                <Text style={styles.frLine}>{wd.fr}</Text>
              </View>
              <Ionicons name="volume-high" size={22} color={colors.primaryLight} />
            </TouchableOpacity>
          ))}
        </View>
      )}
      <PressableScale style={[styles.cta, { marginTop: 20 }]} onPress={onNext}>
        <Text style={styles.ctaText}>J'ai compris</Text>
      </PressableScale>
    </View>
  );
}

// ─── Appariement ─────────────────────────────────────────────────────────────

function Match({ act, speaker, onResolve, locked }: {
  act: Extract<Activity, { type: 'match' }>; speaker: Speaker; locked: boolean; onResolve: (ok: boolean) => void;
}) {
  const right = useMemo(() => shuffled(act.words.map((w, i) => ({ w, i })), act.words.map(x => x.ar).join('')), [act]);
  const [sel, setSel] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [bad, setBad] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const tapRight = (i: number) => {
    if (sel === null || locked) return;
    if (i === sel) {
      const m = [...matched, i];
      setMatched(m); setSel(null);
      if (m.length === act.words.length) onResolve(mistakes === 0);
    } else {
      setMistakes(n => n + 1); setBad(i);
      setTimeout(() => setBad(null), 500);
    }
  };

  return (
    <View>
      <Text style={styles.ask}>Associe chaque mot à son sens</Text>
      <View style={styles.matchCols}>
        <View style={styles.matchCol}>
          {act.words.map((wd, i) => (
            <PressableScale key={wd.ar} disabled={matched.includes(i) || locked}
              style={[styles.matchCell, sel === i && styles.matchSel, matched.includes(i) && styles.matchDone]}
              onPress={() => { setSel(i); speaker.say(wd.ar); }}>
              <Text style={styles.arabicMid}>{wd.show ?? wd.ar}</Text>
            </PressableScale>
          ))}
        </View>
        <View style={styles.matchCol}>
          {right.map(({ w: wd, i }) => (
            <PressableScale key={wd.ar} disabled={matched.includes(i) || locked}
              style={[styles.matchCell, matched.includes(i) && styles.matchDone, bad === i && styles.optKo]}
              onPress={() => tapRight(i)}>
              <Text style={styles.matchText}>{act.as === 'fr' ? wd.fr : wd.tr}</Text>
            </PressableScale>
          ))}
        </View>
      </View>
    </View>
  );
}

// ─── Remise en ordre ─────────────────────────────────────────────────────────

function Order({ act, speaker, onResolve, locked }: {
  act: Extract<Activity, { type: 'order' }>; speaker: Speaker; locked: boolean;
  onResolve: (ok: boolean, answer?: string) => void;
}) {
  const bank = useMemo(() => shuffled(act.words.map((w, i) => ({ w, i })), act.fr), [act]);
  const [chosen, setChosen] = useState<number[]>([]);
  const sentence = act.words.map(x => x.ar).join(' ');

  const check = () => {
    const ok = chosen.every((c, k) => c === k) && chosen.length === act.words.length;
    speaker.say(sentence);
    onResolve(ok, `${sentence}  ·  ${act.words.map(x => x.tr).join(' ')}`);
  };

  return (
    <View>
      <Text style={styles.ask}>Remets la phrase dans l'ordre</Text>
      <View style={styles.stage}><Text style={styles.frBig}>{act.fr}</Text></View>
      <Text style={styles.hint}>L'arabe se lit de droite à gauche</Text>
      <View style={styles.answerRow}>
        {chosen.map((c, k) => (
          <TouchableOpacity key={k} disabled={locked} style={styles.tile} onPress={() => setChosen(chosen.filter((_, j) => j !== k))}>
            <Text style={styles.arabicMid}>{act.words[c].show ?? act.words[c].ar}</Text>
          </TouchableOpacity>
        ))}
        {chosen.length === 0 && <Text style={styles.placeholder}>Touche les mots ci-dessous</Text>}
      </View>
      <View style={styles.bankRow}>
        {bank.map(({ w: wd, i }) => (
          <TouchableOpacity key={i} disabled={chosen.includes(i) || locked}
            style={[styles.tile, chosen.includes(i) && styles.tileUsed]}
            onPress={() => { setChosen([...chosen, i]); speaker.say(wd.ar); }}>
            <Text style={styles.arabicMid}>{wd.show ?? wd.ar}</Text>
            <Text style={styles.optSub}>{wd.tr}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <PressableScale style={[styles.cta, { marginTop: 18 }, chosen.length !== act.words.length && styles.ctaOff]}
        disabled={chosen.length !== act.words.length || locked} onPress={check}>
        <Text style={styles.ctaText}>Vérifier</Text>
      </PressableScale>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  center: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 10 },
  barBg: { flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.border, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.accent, borderRadius: 5 },
  partTag: { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: '600' },
  body: { padding: 20, paddingBottom: 140 },
  retry: { color: colors.secondary, fontWeight: '700', marginBottom: 8 },
  ask: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: 16 },
  muted: { color: colors.textMuted, textAlign: 'center', fontSize: fontSize.base },
  link: { color: colors.accent, marginTop: 12, fontWeight: '700' },
  stage: { alignItems: 'center', backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  stageEmoji: { fontSize: 64, marginBottom: 6 },
  arabicBig: { fontSize: 44, color: colors.arabicText, textAlign: 'center', fontWeight: '600' },
  arabicMid: { fontSize: 26, color: colors.arabicText, fontWeight: '600' },
  frBig: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, textAlign: 'center' },
  trLine: { color: colors.primaryLight, fontStyle: 'italic', fontSize: fontSize.base },
  frLine: { color: colors.textMuted, fontSize: fontSize.sm },
  note: { color: colors.textMuted, fontSize: fontSize.sm, textAlign: 'center', marginTop: 10, lineHeight: 20 },
  hint: { color: colors.textLight, fontSize: fontSize.xs, textAlign: 'center', marginBottom: 6 },
  listenRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 18 },
  speakBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  speakBig: { width: 84, height: 84, borderRadius: 42 },
  slowBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  slowText: { color: colors.primaryLight, fontWeight: '600', fontSize: fontSize.sm },
  miniSpeak: { marginTop: 6, padding: 6 },
  option: { backgroundColor: colors.card, borderRadius: borderRadius.lg, borderWidth: 2, borderColor: colors.border, paddingVertical: 14, paddingHorizontal: 16, marginBottom: 10, alignItems: 'center' },
  optOk: { borderColor: colors.success, backgroundColor: colors.successLight },
  optKo: { borderColor: colors.destructive, backgroundColor: colors.destructiveLight },
  optText: { fontSize: fontSize.base, color: colors.text, fontWeight: '600', textAlign: 'center' },
  optArabic: { fontSize: 30, color: colors.arabicText, fontWeight: '600' },
  optSub: { color: colors.textMuted, fontSize: fontSize.xs, marginTop: 2, textAlign: 'center' },
  pairRow: { flexDirection: 'row', gap: 12 },
  pairCard: { flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.xl, borderWidth: 2, borderColor: colors.border, paddingVertical: 28, alignItems: 'center' },
  bubble: { backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  bubbleLine: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  kicker: { color: colors.accent, fontWeight: '700', marginBottom: 4 },
  letterPic: { width: 130, height: 130, borderRadius: 20, marginVertical: 10 },
  letterHuge: { fontSize: 110, color: colors.arabicText, lineHeight: 140 },
  letterName: { fontSize: fontSize.lg, color: colors.text, fontWeight: '700' },
  formsRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  formCell: { alignItems: 'center', backgroundColor: colors.background, borderRadius: borderRadius.md, paddingVertical: 8, paddingHorizontal: 10, minWidth: 62 },
  formGlyph: { fontSize: 30, color: colors.arabicText },
  formKey: { fontSize: 10, color: colors.textMuted },
  exampleBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 22, marginTop: 14 },
  exampleText: { color: colors.white, fontWeight: '600' },
  teachTitle: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text, marginBottom: 8 },
  teachBody: { fontSize: fontSize.base, color: colors.text, lineHeight: 24, marginBottom: 14 },
  wordCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  wordEmoji: { fontSize: 34 },
  matchCols: { flexDirection: 'row', gap: 12 },
  matchCol: { flex: 1, gap: 10 },
  matchCell: { minHeight: 58, backgroundColor: colors.card, borderRadius: borderRadius.lg, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8, paddingVertical: 8 },
  matchSel: { borderColor: colors.secondary, backgroundColor: '#fffbeb' },
  matchDone: { opacity: 0.35, borderColor: colors.success },
  matchText: { fontSize: fontSize.sm, color: colors.text, textAlign: 'center', fontWeight: '600' },
  answerRow: { minHeight: 76, flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8, padding: 10, borderRadius: borderRadius.lg, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.border, marginBottom: 16, alignItems: 'center' },
  placeholder: { color: colors.textLight, fontSize: fontSize.sm },
  bankRow: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  tile: { backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 2, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center' },
  tileUsed: { opacity: 0.25 },
  cta: { backgroundColor: colors.accent, borderRadius: borderRadius.xl, paddingVertical: 15, alignItems: 'center', paddingHorizontal: 28 },
  ctaOff: { opacity: 0.4 },
  ctaGhost: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  ctaText: { color: colors.white, fontWeight: '800', fontSize: fontSize.base },
  feedback: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderTopWidth: 1 },
  fbOk: { backgroundColor: colors.successLight, borderTopColor: colors.success },
  fbKo: { backgroundColor: colors.destructiveLight, borderTopColor: colors.destructive },
  fbTitle: { fontSize: fontSize.lg, fontWeight: '800' },
  fbAnswer: { color: colors.text, marginTop: 2, fontSize: fontSize.sm },
  fbBtn: { paddingHorizontal: 22, paddingVertical: 12, borderRadius: borderRadius.xl },
  bigEmoji: { fontSize: 72 },
  endTitle: { fontSize: 28, fontWeight: '800', color: colors.text, marginTop: 8 },
  endScore: { fontSize: 56, fontWeight: '800', color: colors.accent, marginVertical: 8 },
  endActions: { marginTop: 28, gap: 10, alignSelf: 'stretch' },
});
