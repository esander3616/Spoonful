import { useState } from "react";
import type { FormEvent } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

type HistoryItem = {
  prompt: string;
  answer: string;
};

function SpoonBot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return; // empty prompts rejected before any request fires

    setIsLoading(true);
    setResponse("");
    setError("");

    let fullText = "";
    let buffer = "";

    try {
      const res = await fetch(`${BASE_URL}/api/ai/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok || !res.body) {
        const errorBody = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorBody.error || `Server error: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Gemini's SSE stream can split one JSON object across chunks,
        // so buffer and only process complete lines.
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.replace(/^data:\s*/, "").trim();
          if (!data) continue;

          try {
            const parsed = JSON.parse(data);
            const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              fullText += text;
              setResponse(fullText); // renders progressively, token by token
            }
          } catch {
            // incomplete chunk — wait for more data before parsing again
          }
        }
      }

      setHistory((prev) => [{ prompt, answer: fullText }, ...prev].slice(0, 3));
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="spoonbot-page">
      <h1>SpoonBot</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask SpoonBot anything..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !prompt.trim()}>
          {isLoading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {isLoading && !response && <p>SpoonBot is thinking...</p>}
      {response && <p className="spoonbot-response">{response}</p>}

      {history.length > 0 && (
        <div className="spoonbot-history">
          <h3>Recent</h3>
          {history.map((h, i) => (
            <div key={i} className="history-item">
              <p>
                <strong>Q:</strong> {h.prompt}
              </p>
              <p>
                <strong>A:</strong> {h.answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SpoonBot;
