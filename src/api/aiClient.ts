const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';
const MODEL   = 'gemini-2.0-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

export async function invokeAI<T = Record<string, unknown>>(
  prompt: string,
): Promise<T> {
  if (!API_KEY) {
    throw new Error(
      "Clé API manquante. Ajoutez EXPO_PUBLIC_GEMINI_API_KEY dans votre fichier .env",
    );
  }

  const response = await fetch(API_URL, {
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
    throw new Error(`Gemini API ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text: string =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean) as T;
}
