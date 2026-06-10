import 'dotenv/config';
import { connectDB } from './config/db.js';
import RedditPost from './models/RedditPost.model.js';

await connectDB();
        
const mockPosts = [
  {
    postId: 'mock-reddit-1',
    title: 'Bitcoin just broke $70K resistance - is this the start of the next bull run?',
    content: 'After months of consolidation, BTC finally broke through the $70K resistance level with massive volume. Institutional money is flowing back in, and on-chain metrics show strong accumulation. What do you think - are we heading to $100K or is this a bull trap?',
    score: 2847,
    url: 'https://reddit.com/r/CryptoCurrency/mock1',
    subreddit: 'CryptoCurrency',
    publishedAt: new Date(),
    status: 'pending',
  },
  {
    postId: 'mock-reddit-2',
    title: 'Ethereum gas fees are insane right now. Layer 2s are the only way forward',
    content: 'Just tried to move some ETH and the gas fee was $45 for a simple transfer. This is unsustainable. Arbitrum and Optimism fees are under $0.50 for the same transaction. If Ethereum wants to stay relevant, everyone needs to migrate to L2s immediately.',
    score: 1923,
    url: 'https://reddit.com/r/CryptoCurrency/mock2',
    subreddit: 'CryptoCurrency',
    publishedAt: new Date(),
    status: 'pending',
  },
  {
    postId: 'mock-reddit-3',
    title: 'Major DeFi protocol hacked for $50M - another day in crypto',
    content: 'Yet another bridge exploit. Hackers drained $50M from a cross-chain protocol this morning. Team says funds are safu but blockchain shows otherwise. When will people learn that DeFi security is still immature? This is why I only hold BTC and ETH on cold storage.',
    score: 3156,
    url: 'https://reddit.com/r/Bitcoin/mock3',
    subreddit: 'Bitcoin',
    publishedAt: new Date(),
    status: 'pending',
  },
  {
    postId: 'mock-reddit-4',
    title: 'Solana network congestion is back. Transactions failing left and right',
    content: 'SOL network is struggling again under high load. My transactions have been pending for 20 minutes. This keeps happening every time there is a memecoin pump. How is this supposed to compete with Visa when it cant even handle a few thousand TPS?',
    score: 987,
    url: 'https://reddit.com/r/CryptoCurrency/mock4',
    subreddit: 'CryptoCurrency',
    publishedAt: new Date(),
    status: 'pending',
  },
  {
    postId: 'mock-reddit-5',
    title: 'Best day to DCA? Analysis of 5 years of Bitcoin price data',
    content: 'I analyzed 5 years of BTC price data to find the optimal DCA day. Turns out Mondays have the lowest average price, followed by Tuesdays. Weekends tend to pump. My strategy now is to DCA every Monday regardless of price. Sharing the spreadsheet in comments.',
    score: 4521,
    url: 'https://reddit.com/r/Bitcoin/mock5',
    subreddit: 'Bitcoin',
    publishedAt: new Date(),
    status: 'pending',
  },
];

for (const post of mockPosts) {
  try {
    await RedditPost.create(post);
    console.log(`✓ Created: ${post.title}`);
  } catch (err) {
    if (err.code === 11000) {
      console.log(`⊘ Duplicate: ${post.title}`);
      continue;
    }
    console.error('Error:', err.message);
  }
}

console.log('\nMock Reddit posts ready.');
process.exit(0);
