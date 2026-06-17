import {Queue} from 'bullmq';
import connection from "../config/redis.js";

export const articleQueue = new Queue('article-processing', {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 30000
        },
        removeOnComplete: 100,
        removeOnFail: 50
    }
});


export const redditQueue = new Queue('reddit-processing', {
    connection, 
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 30000
        },
        removeOnComplete: 100,
        removeOnFail: 50
    },
});

console.log('Queues initialized');