const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';
const MODEL   = 'gemini-2.0-flash';

function getApiUrl() {
  return `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
}

export async function invokeAI<T = Record<string, unknown>>(
  prompt: string,
): Promise<T> {
  if (!API_KEY) {
    throw new Error(
      "Clé API manquante. Ajoutez EXPO_PUBLIC_GEMINI_API_KEY dans votre fichier .env puis redémarrez Metro (npx expo start -c)",
    );
  }

  const response = await fetch(getApiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text:
                prompt +
                '\n\nRéponds UNIQUEMENT avec un objet JSON valide, sans balises markdown, sans explication.',
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    if (response.status === 400) {
      throw new Error("Clé API invalide. Vérifiez EXPO_PUBLIC_GEMINI_API_KEY dans .env");
    }
    if (response.status === 403) {
      throw new Error("Clé API refusée. Activez l'API Gemini dans Google Cloud Console.");
    }
    if (response.status === 429) {
      throw new Error("Trop de requêtes. Réessayez dans quelques secondes.");
    }
    throw new Error(`Erreur Gemini (${response.status}): ${err}`);
  }

  const data = await response.json();
  const text: string =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean) as T;
}

export async function invokeAIWithAudio<T = Record<string, unknown>>(
  prompt: string,
  audioBase64: string,
  mimeType: string = 'audio/m4a',
): Promise<T> {
  if (!API_KEY) {
    throw new Error("Clé API manquante.");
  }

  const response = await fetch(getApiUrl(), {
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
                '\n\nRéponds UNIQUEMENT avec un objet JSON valide, sans balises markdown, sans explication.',
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Erreur Gemini audio (${response.status}): ${err}`);
  }

  const data = await response.json();
  const text: string =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean) as T;
}
