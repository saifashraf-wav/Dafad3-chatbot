const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "gemini-3.5-flash-lite";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export async function generateContent(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY is not defined");
  }

  // Stop waiting after 20 seconds so the loader never hangs
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000); // 60s instead of 20s

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 400, // shorter, faster replies
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.error?.message ||
          `Request failed with status ${response.status}`,
      );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("No response text returned from Gemini");

    return text;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("The AI took too long to respond. Please try again.", {
        cause: error,
      });
    }
    console.error("Gemini API error:", error);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
