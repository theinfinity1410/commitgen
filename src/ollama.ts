import fetch from 'node-fetch';

export async function askOllama(prompt: string, model = "llama3:8b") {
  try {
    const res = await fetch("http://127.0.0.1:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "Generate a one-line git commit message based on the given diff and tone. No explanations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        stream: false
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`HTTP ${res.status}: ${err}`);
    }

    const json = await res.json() as { message?: { content?: string } };
    const message = json?.message?.content;
    if (!message) throw new Error("Ollama returned no message.");
    return message.trim();
  } catch (err) {
    console.error("❌ Ollama fetch failed:", err);
    throw err;
  }
}
