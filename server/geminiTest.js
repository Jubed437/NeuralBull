import "dotenv/config";
import {analyzeSentiment} from "./utils/gemini.js";

const text = "Bitcoin prices climbed above $65,000 today as institutional investors renewed their interest in the cryptocurrency market. Major firms announced increased BTC holdings."

const result = await analyzeSentiment(text);
console.log(result);
process.exit(0);