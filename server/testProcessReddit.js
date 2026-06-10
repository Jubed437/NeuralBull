import 'dotenv/config';
import { connectDB } from './config/db.js';
import RedditPost from './models/RedditPost.model.js';
import { processRedditPost } from './utils/processRedditPost.js';

await connectDB();

const pendingPosts = await RedditPost.find({ status: 'pending' });
console.log(`Found ${pendingPosts.length} pending Reddit posts\n`);

for (const post of pendingPosts) {
  await processRedditPost(post._id);
  await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec delay
}

console.log('\nDone. Check MongoDB to see processed Reddit posts.');
process.exit(0);
