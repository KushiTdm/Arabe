import AsyncStorage from '@react-native-async-storage/async-storage';

const MODEL = 'gemini-2.0-flash';
export const API_KEY_STORAGE = '@maa_gemini_api_key';

function getApiUrl(apiKey: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
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

  const response = await fetch(getApiUrl(apiKey), {
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
      throw new Error('Trop de requêtes. Réessayez dans quelques secondes.');
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
    // Try to extract JSON from the text
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]) as T;
      } catch {
        // Try to fix truncated JSON by finding last complete object
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

  const response = await fetch(getApiUrl(apiKey), {
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