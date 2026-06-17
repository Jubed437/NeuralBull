import Article from "../models/Article.model.js";
import {analyzeSentimentOllama} from "./ollamaSentiment.js";

export const processArticle = async(articleId)=>{
    try {
        const article = await Article.findById(articleId);
        if (!article || article.status !== 'pending') return;

        try{
            const analysis = await analyzeSentimentOllama(article.rawContent);
            article.tickers = analysis.tickers;
            article.sentiment = analysis.sentiment;
            article.summary = analysis.summary;
            article.status = "processed";
            await article.save();
            console.log(`✓ Article processed By Ollama: ${article.title?.substring(0, 30)}...`);
        }catch(err){
            article.status = "failed";
            await article.save();
            console.error(`✗ Ollama Article error:`, err.message);
        }
    } catch(err) {
        console.error(`✗ Process error for Article ${articleId}:`, err.message);
    }
}