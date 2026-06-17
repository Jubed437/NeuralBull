import { Worker } from 'bullmq';
import connection from '../config/redis.js';
import { processArticle } from '../utils/processArticle.js';
import { processRedditPost } from '../utils/processRedditPost.js';

export const articleWorker = new Worker('article-processing', async (job) => {
    console.log(`Processing article job ${job.id}`);
    await processArticle(job.data.articleId);
}, {
    connection,
    limiter: {
        max: 4,
        duration: 60000
    }
});

export const redditWorker = new Worker('reddit-processing', async (job) => {
    console.log(`Processing reddit job ${job.id}`);
    await processRedditPost(job.data.postId);
}, {
    connection,
    limiter: {
        max: 4,
        duration: 60000
    }
});

articleWorker.on('completed', (job) => {
    console.log(`✓ Article job ${job.id} completed`);
});

articleWorker.on('failed', (job, err) => {
    console.log(`✗ Article job ${job.id} failed: ${err.message}`);
});

redditWorker.on('completed', (job) => {
    console.log(`✓ Reddit job ${job.id} completed`);
});

redditWorker.on('failed', (job, err) => {
    console.log(`✗ Reddit job ${job.id} failed: ${err.message}`);
});

console.log('Workers started with rate limit: 4 jobs/minute');
