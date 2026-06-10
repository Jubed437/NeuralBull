import 'dotenv/config';
import { connectDB } from './config/db.js';
import { fetchRedditPosts } from './utils/redditFetcher.js';

await connectDB();
await fetchRedditPosts();
console.log('\nDone — check MongoDB to see Reddit posts');
process.exit(0);
