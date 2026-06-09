import Article from "../models/Article.model.js";
import {analyzeSentiment} from "./gemini.js";

export const processArticle = async(articleId)=>{
    const article = await Article.findById(articleId);
    if (!article || article.status !== 'pending') return;

    try{
        const analysis = await analyzeSentiment(article.rawContent);
        article.tickers = analysis.tickers;
        article.sentiment = analysis.sentiment;
        article.summary = analysis.summary;
        article.status = "processed";
        await article.save();
        console.log(`Article ${articleId} processed successfully.`);
    }catch(err){
        article.status = "failed";
        await article.save();
        console.error(`Error processing article ${articleId}:`, err);
    }
}