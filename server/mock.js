import 'dotenv/config';
import { connectDB } from './config/db.js';
import Article from './models/Article.model.js';

await connectDB();

const mockArticles = [
  {
    guid: 'mock-btc-rally-1',
    title: 'Bitcoin Surges Past $65K as Institutional Demand Returns',
    url: 'https://example.com/btc-rally',
    source: 'mock',
    rawContent: 'Bitcoin prices climbed above $65,000 today as institutional investors renewed their interest in the cryptocurrency market. Major firms announced increased BTC holdings.',
    publishedAt: new Date(),
    status: 'pending',
  },
  {
    guid: 'mock-eth-upgrade-2',
    title: 'Ethereum Network Upgrade Promises 50% Gas Fee Reduction',
    url: 'https://example.com/eth-upgrade',
    source: 'mock',
    rawContent: 'The upcoming Ethereum Dencun upgrade is expected to reduce transaction costs by up to 50% through improved layer-2 scaling solutions.',
    publishedAt: new Date(),
    status: 'pending',
  },
  {
    guid: 'mock-sol-hack-3',
    title: 'Solana DeFi Protocol Exploited for $20M in Flash Loan Attack',
    url: 'https://example.com/sol-hack',
    source: 'mock',
    rawContent: 'A major Solana-based DeFi protocol suffered a $20 million exploit today via a sophisticated flash loan attack. The team has paused withdrawals.',
    publishedAt: new Date(),
    status: 'pending',
  },
];

for (const article of mockArticles) {
  await Article.create(article);
  console.log(`✓ Created: ${article.title}`);
}

console.log('\nMock articles ready. Moving to Gemini integration...');
process.exit(0);
