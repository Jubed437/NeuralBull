import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://localhost:11434' });

export const analyzeSentimentOllama = async (articleText) => {
    const prompt = `You are a crypto market analyst. Analyze this news article and extract:

1. All cryptocurrency tickers mentioned (e.g. BTC, ETH, SOL). Use standard symbols. Return empty array if none found.
2. Overall sentiment: "bullish" (positive for crypto prices), "bearish" (negative), or "neutral"
3. Confidence score between 0 and 1 for the sentiment
4. A single-sentence summary (max 20 words)

Article:
${articleText}

Respond ONLY with valid JSON in this exact format:
{
  "tickers": ["BTC", "ETH"],
  "sentiment": {
    "label": "bullish",
    "score": 0.85
  },
  "summary": "Bitcoin surged past $65K as institutions resumed buying."
}`;

    const response = await ollama.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: prompt }],
        stream: false,
        format: 'json'
    });

    const text = response.message.content;
    const parsed = JSON.parse(text);
    return parsed;
};
