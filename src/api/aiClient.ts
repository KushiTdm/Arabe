import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_KEY_STORAGE = '@maa_gemini_api_key';
export const MODEL_STORAGE = '@maa_gemini_model';

export const DEFAULT_MODEL = 'gemini-1.5-flash';

export const GEMINI_FREE_MODELS = [
  {
    id: 'gemini-1.5-flash',
    label: 'Gemini 1.5 Flash',
    description: '1500 req/jour · Recommandé ✅',
  },
  {
    id: 'gemini-1.5-flash-8b',
    label: 'Gemini 1.5 Flash-8B',
    description: '1500 req/jour · Plus léger & rapide',
  },
  {
    id: 'gemini-2.0-flash-lite',
    label: 'Gemini 2.0 Flash Lite',
    description: '1500 req/jour · Plus récent',
  },
];

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

function getApiUrl(apiKey: string, model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
}

export async function getApiKey(): Promise<string> {
  try {
    const stored = await AsyncStorage.getItem(API_KEY_STORAGE);
    if (stored && stored.trim().length > 0) return stored.trim();
  } catch {}
  const envKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';
  return envKey;
}

export async function saveApiKey(key: string): Promise<void> {
  await AsyncStorage.setItem(API_KEY_STORAGE, key.trim());
}

export async function clearApiKey(): Promise<void> {
  await AsyncStorage.removeItem(API_KEY_STORAGE);
}

export async function invokeAI<T = Record<string, unknown>>(
  prompt: string,
  maxTokens: number = 2048,
): Promise<T> {
  const apiKey = await getApiKey();

  if (!apiKey) {
    throw new Error(
      'Clé API manquante. Ajoutez votre clé Gemini dans Profil → Paramètres API.',
    );
  }

  const model = await getModel();

  const response = await fetch(getApiUrl(apiKey, model), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text:
                prompt +
                '\n\nRéponds UNIQUEMENT avec un objet JSON valide et COMPLET. Pas de balises markdown, pas de texte avant ou après le JSON. Le JSON doit être bien fermé avec toutes les accolades et crochets.',
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    if (response.status === 400) {
      throw new Error(
        'Clé API invalide. Vérifiez votre clé dans Profil → Paramètres API.',
      );
    }
    if (response.status === 403) {
      throw new Error(
        "Clé API refusée. Activez l'API Gemini dans Google Cloud Console.",
      );
    }
    if (response.status === 429) {
      throw new Error(
        `Quota dépassé pour le modèle "${model}". Essayez un autre modèle dans Profil → ⚙️ ou attendez quelques secondes.`,
      );
    }
    throw new Error(`Erreur Gemini (${response.status}): ${err}`);
  }

  const data = await response.json();
  const text: string =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
  const clean = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

  try {
    return JSON.parse(clean) as T;
  } catch {
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]) as T;
      } catch {
        const lastBrace = match[0].lastIndexOf('}');
        if (lastBrace > 0) {
          const truncated = match[0].substring(0, lastBrace + 1);
          try {
            return JSON.parse(truncated) as T;
          } catch {}
        }
      }
    }
    throw new Error('Réponse IA invalide (JSON malformé). Réessayez.');
  }
}

export async function invokeAIWithAudio<T = Record<string, unknown>>(
  prompt: string,
  audioBase64: string,
  mimeType: string = 'audio/m4a',
): Promise<T> {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error(
      'Clé API manquante. Ajoutez votre clé Gemini dans Profil → Paramètres API.',
    );
  }

  const model = await getModel();

  const response = await fetch(getApiUrl(apiKey, model), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { inlineData: { mimeType, data: audioBase64 } },
            {
              text:
                prompt +
                '\n\nRéponds UNIQUEMENT avec un objet JSON valide et COMPLET. Pas de balises markdown.',
            },
          ],
        },
      ],
      generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    if (response.status === 429) {
      throw new Error(
        `Quota dépassé pour le modèle "${model}". Essayez un autre modèle dans Profil → ⚙️.`,
      );
    }
    throw new Error(`Erreur Gemini audio (${response.status}): ${err}`);
  }

  const data = await response.json();
  const text: string =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
  const clean = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  try {
    return JSON.parse(clean) as T;
  } catch {
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]) as T; } catch {}
    }
    throw new Error('Réponse IA invalide');
  }
}