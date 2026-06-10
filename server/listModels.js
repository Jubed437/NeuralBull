import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log('Listing available models...\n');

try {
  const models = await genAI.listModels();
  
  models.forEach(model => {
    console.log(`Model: ${model.name}`);
    console.log(`Display Name: ${model.displayName}`);
    console.log(`Supported methods: ${model.supportedGenerationMethods.join(', ')}`);
    console.log('---');
  });
} catch (err) {
  console.error('Error:', err.message);
}

process.exit(0);
