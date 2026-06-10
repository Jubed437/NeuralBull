import RedditPost from '../models/RedditPost.model.js';
import {analyzeSentiment} from './gemini.js';

export const processRedditPost = async(postId)=>{
    const post = await RedditPost.findById(postId);
    if(!post || post.status !== 'pending') return;

    try{
        const fullText = `${post.title}\n\n${post.content}`;
        const analysis = await analyzeSentiment(fullText);

        post.tickers = analysis.tickers;
        post.sentiment = analysis.sentiment;
        post.status = 'processed';
        await post.save();
        console.log(` Processed: ${post.title.substring(0, 50)}...\n\n`); 
    }catch(err){
        post.status = 'failed';
        await post.save();
        console.error(`Failed to process ${post.title.substring(0, 50)}...:`, err.message);
    }
}