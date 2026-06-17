import cron from 'node-cron';
import {fetchAllFeeds} from '../utils/rssFetcher.js'
import {fetchRedditPosts} from '../utils/redditFetcher.js';
import Article from '../models/Article.model.js';
import RedditPost from '../models/RedditPost.model.js';
import { articleQueue, redditQueue } from '../queue/processingQueue.js';

cron.schedule('*/20 * * * *', async()=>{
    console.log('Running scheduled job to fetch and process articles and reddit posts');
    try{
        await fetchAllFeeds();
        await fetchRedditPosts();
        console.log('Finished fetching articles and reddit posts');
    }catch(err){
        console.error('Error(FETCHING) in scheduled job:', err.message);
    }
});


cron.schedule('*/3 * * * *', async()=>{
    try{
        const articles = await Article.find({status: 'pending'}).limit(20);
        for(const article of articles){
            await articleQueue.add('process-article', { articleId: article._id });
        }
        console.log(`Added ${articles.length} articles to queue`);

        const pendingRedditPosts = await RedditPost.find({status: 'pending'}).limit(20);
        for(const redditPost of pendingRedditPosts){
            await redditQueue.add('process-reddit', { postId: redditPost._id });
        }
        console.log(`Added ${pendingRedditPosts.length} reddit posts to queue`);
    }catch(err){
        console.error('Error(PROCESSING) in scheduled job:', err.message);  
    }
})
console.log("CRON JOBS SCHEDULED");