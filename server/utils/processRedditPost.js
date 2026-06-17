import RedditPost from '../models/RedditPost.model.js';
import {analyzeSentimentOllama} from './ollamaSentiment.js';

export const processRedditPost = async(postId)=>{
    try {
        const post = await RedditPost.findById(postId);
        if(!post || post.status !== 'pending') return;

        try{
            const fullText = `${post.title}\n\n${post.content}`;
            const analysis = await analyzeSentimentOllama(fullText);

            post.tickers = analysis.tickers;
            post.sentiment = analysis.sentiment;
            post.status = 'processed';
            await post.save();
            console.log(`✓ Reddit processed By Ollama: ${post.title.substring(0, 30)}...`); 
        }catch(err){
            post.status = 'failed';
            await post.save();
            console.error(`✗ Ollama Reddit error:`, err.message);
        }
    } catch(err) {
        console.error(`✗ Process error for Reddit ${postId}:`, err.message);
    }
}