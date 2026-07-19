import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_KEY_STORAGE = '@maa_gemini_api_key';
export const MODEL_STORAGE = '@maa_gemini_model';

// ── Modèles confirmés disponibles sur v1beta (Google AI Studio, mai 2026) ──
// Source: https://ai.google.dev/gemini-api/docs/models
export const DEFAULT_MODEL = 'gemini-2.5-flash-lite';

export const GEMINI_FREE_MODELS = [
  {
    id: 'gemini-2.5-flash-lite',
    label: 'Gemini 2.5 Flash Lite',
    description: '30 req/min · Le plus rapide & généreux ✅ Recommandé',
  },
  {
    id: 'gemini-2.5-flash',
    label: 'Gemini 2.5 Flash',
    description: '15 req/min · Plus intelligent',
  },
  {
    id: 'gemini-2.0-flash',
    label: 'Gemini 2.0 Flash',
    description: '15 req/min · Stable & fiable',
  },
  {
    id: 'gemini-2.0-flash-lite',
    label: 'Gemini 2.0 Flash Lite',
    description: '30 req/min · Léger & rapide',
  },
];

// Instruction JSON courte pour économiser les tokens
const JSON_INSTRUCTION = '\n\nJSON uniquement, pas de markdown.';

export async function getModel(): Promise<string> {
  try {
    const stored = await AsyncStorage.getItem(MODEL_STORAGE);
    if (stored && stored.trim().length > 0) return stored.trim();
  } catch {}
  return DEFAULT_MODEL;
}

export async function saveModel(modelId: string): Promise<void> {
  await AsyncStorage.setItem(MODEL_STORAGE, modelId);
}

// v1beta fonctionne pour tous ces modèles sur Google AI Studio
function getApiUrl(apiKey: string, model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
}

export async function getApiKey(): Promise<string> {
  try {
    const stored = await AsyncStorage.getItem(API_KEY_STORAGE);
    if (stored && stored.trim().length > 0) return stored.trim();
  } catch {}
  return process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';
}

export async function saveApiKey(key: string): Promise<void> {
  await AsyncStorage.setItem(API_KEY_STORAGE, key.trim());
}

export async function clearApiKey(): Promise<void> {
  await AsyncStorage.removeItem(API_KEY_STORAGE);
}

function parseJSON<T>(text: string): T {
  const clean = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  try {
    return JSON.parse(clean) as T;
  } catch {
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]) as T; } catch {}
      const lastBrace = match[0].lastIndexOf('}');
      if (lastBrace > 0) {
        try { return JSON.parse(match[0].substring(0, lastBrace + 1)) as T; } catch {}
      }
    }
    throw new Error('Réponse IA invalide (JSON malformé). Réessayez.');
  }
}

const OFFLINE_MESSAGE =
  'Pas de connexion Internet. Les fonctions IA nécessitent le réseau — '
  + 'le vocabulaire, les quiz, les révisions et l\'alphabet fonctionnent hors ligne.';

async function fetchOrOffline(url: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch {
    // fetch ne rejette que sur erreur réseau (pas sur status HTTP)
    throw new Error(OFFLINE_MESSAGE);
  }
}

function handleHttpError(status: number, model: string, body: string): never {
  if (status === 400) {
    const isNotFound = body.includes('not found') || body.includes('NOT_FOUND');
    if (isNotFound) {
      throw new Error(
        `Modèle "${model}" non disponible. Changez de modèle dans Profil → ⚙️.`,
      );
    }
    throw new Error('Clé API invalide. Vérifiez votre clé dans Profil → ⚙️.');
  }
  if (status === 403) {
    throw new Error("Clé API refusée. Vérifiez qu'elle est bien activée sur AI Studio.");
  }
  if (status === 404) {
    throw new Error(
      `Modèle "${model}" introuvable. Changez de modèle dans Profil → ⚙️.`,
    );
  }
  if (status === 429) {
    throw new Error(
      `Quota dépassé pour "${model}". Changez de modèle dans Profil → ⚙️ ou attendez 1 min.`,
    );
  }
  throw new Error(`Erreur Gemini (${status}). Réessayez.`);
}

export async function invokeAI<T = Record<string, unknown>>(
  prompt: string,
  maxTokens: number = 1024, // Réduit de 2048 → 1024 pour économiser les tokens
): Promise<T> {
  const [apiKey, model] = await Promise.all([getApiKey(), getModel()]);

  if (!apiKey) {
    throw new Error('Clé API manquante. Ajoutez votre clé dans Profil → ⚙️.');
  }

  const response = await fetchOrOffline(getApiUrl(apiKey, model), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt + JSON_INSTRUCTION }] }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    handleHttpError(response.status, model, body);
  }

  const data = await response.json();
  const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
  return parseJSON<T>(text);
}

export async function invokeAIWithAudio<T = Record<string, unknown>>(
  prompt: string,
  audioBase64: string,
  mimeType: string = 'audio/m4a',
): Promise<T> {
  const [apiKey, model] = await Promise.all([getApiKey(), getModel()]);

  if (!apiKey) {
    throw new Error('Clé API manquante. Ajoutez votre clé dans Profil → ⚙️.');
  }

  const response = await fetchOrOffline(getApiUrl(apiKey, model), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { inlineData: { mimeType, data: audioBase64 } },
          { text: prompt + JSON_INSTRUCTION },
        ],
      }],
      generationConfig: { maxOutputTokens: 1024, temperature: 0.7, responseMimeType: 'application/json' },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    handleHttpError(response.status, model, body);
  }

  const data = await response.json();
  const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
  return parseJSON<T>(text);
}