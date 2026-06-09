import {GoogleGenerativeAI} from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

export const analyzeSentiment = async (articleText) => {
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

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Gemini sometimes wraps JSON in markdown code blocks, strip them
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
    const cleanJson = jsonMatch[1].trim();
    
    const parsed = JSON.parse(cleanJson);
    return parsed;
}