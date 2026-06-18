import { GoogleGenerativeAI } from '@google/generative-ai';
import { Ollama } from 'ollama';

const provider = (process.env.AI_PROVIDER || 'ollama').toLowerCase();
const ollamaHost = process.env.OLLAMA_HOST || 'http://localhost:11434';
const geminiModelName = process.env.GEMINI_MODEL || 'gemini-pro';

const ollama = new Ollama({ host: ollamaHost });
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

const buildPrompt = (articleText) => `You are a crypto market analyst. Analyze this news article and extract:

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

const parseJsonResponse = (text) => {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
  const cleanJson = jsonMatch[1].trim();
  return JSON.parse(cleanJson);
};

const analyzeWithOllama = async (articleText) => {
  const response = await ollama.chat({
    model: process.env.OLLAMA_MODEL || 'llama3.2',
    messages: [{ role: 'user', content: buildPrompt(articleText) }],
    stream: false,
    format: 'json'
  });

  return parseJsonResponse(response.message.content);
};

const analyzeWithGemini = async (articleText) => {
  if (!genAI) {
    throw new Error('GEMINI_API_KEY is required when AI_PROVIDER=gemini');
  }

  const model = genAI.getGenerativeModel({ model: geminiModelName });
  const result = await model.generateContent(buildPrompt(articleText));
  return parseJsonResponse(result.response.text());
};

export const analyzeSentimentOllama = async (articleText) => {
  if (provider === 'gemini') {
    return analyzeWithGemini(articleText);
  }

  return analyzeWithOllama(articleText);
};
