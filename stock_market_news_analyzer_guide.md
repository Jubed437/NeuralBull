# Stock Market News Analyzer
### Full Project Guide — MERN + Google Gemini AI
**For:** Final Year B.Tech CSE | REVA University, Bangalore
**Stack:** MongoDB · Express · React · Node.js · Google Generative AI

---

## 1. PROJECT OVERVIEW

A full-stack web application that continuously pulls financial news from
multiple sources (RSS feeds, Finnhub, Marketaux), runs each article through
Google Gemini to extract ticker symbols, generate a sentiment score
(bullish / bearish / neutral), and surface the results on a real-time
dashboard with per-stock sentiment trend charts overlaid against actual
price history.

### What makes it resume-worthy
- Implements RAG (Retrieval-Augmented Generation) with MongoDB Atlas
  Vector Search for semantic news queries
- Real-time updates via WebSockets (Socket.io)
- Async job processing with BullMQ + Redis — production-grade architecture
- Sentiment-vs-price correlation chart — a visual that hooks interviewers
- Deployed live with a public URL you can put on your resume

### Resume bullet (copy this)
"Built a full-stack MERN + Gemini AI application that ingests 200+ financial
news articles daily from RSS feeds and APIs, generates per-ticker sentiment
scores using RAG, and surfaces bull/bear signals with a 7-day
sentiment-vs-price correlation dashboard."

---

## 2. SYSTEM ARCHITECTURE

```
DATA SOURCES
  ├── RSS Feeds (Reuters, Moneycontrol, ET Markets, LiveMint, Yahoo Finance)
  ├── Finnhub News API        — financial headlines + built-in sentiment
  ├── Marketaux API           — 80+ markets, entity-tagged articles
  └── Reddit API (optional)   — r/IndiaInvestments social sentiment

        ↓ every 20 min (node-cron)

BACKEND — Node.js + Express
  ├── Cron Job                — fetch + deduplicate → MongoDB
  ├── BullMQ + Redis          — async queue for Gemini processing
  ├── Gemini AI Worker        — sentiment, ticker extraction, summary
  ├── MongoDB                 — articles, embeddings, price cache, users
  └── REST API + Socket.io    — serve data + push live updates

        ↓

AI LAYER — Google Gemini API
  ├── Sentiment Analysis      — bullish / bearish / neutral + confidence
  ├── Ticker Extraction       — "Apple earnings" → AAPL
  ├── Daily Digest (RAG)      — "Why is HDFC down today?" answered from DB
  └── Embedding Generation    — for semantic vector search

        ↓

FRONTEND — React
  ├── Sentiment Dashboard     — bull/bear donut + trend line per ticker
  ├── Live News Feed          — WebSocket-powered, tagged by sentiment
  ├── Watchlist               — user-defined stocks, email alerts
  ├── Correlation Chart       — 7-day sentiment score vs price overlay
  └── Semantic Search         — "show me EV stock news" → RAG results
```

---

## 3. IMPLEMENTATION PHASES

### Phase 1 — Foundation (Weekend 1, ~12 hrs)
Goal: working data pipeline with basic dashboard

Tasks:
  [ ] Scaffold MERN project (Vite + React frontend, Express backend)
  [ ] Set up MongoDB Atlas (free M0 cluster)
  [ ] Build RSS fetcher for 4–5 feeds using rss-parser
  [ ] Article model with guid-based deduplication
  [ ] Basic cron job (node-cron, every 20 min)
  [ ] Simple Gemini call: sentiment + ticker per article
  [ ] REST API: GET /api/articles?ticker=AAPL
  [ ] React dashboard: list of articles with color-coded sentiment

Deliverable: A working page showing live financial news with AI sentiment tags.

### Phase 2 — Intelligence Layer (Weekend 2, ~14 hrs)
Goal: the features that make it impressive

Tasks:
  [ ] BullMQ + Redis queue for async Gemini processing
  [ ] MongoDB Atlas Vector Search setup
  [ ] Generate + store embeddings per article (Gemini embeddings API)
  [ ] Semantic search endpoint: POST /api/search { query: "EV stocks" }
  [ ] Integrate Alpha Vantage / Polygon for daily price data
  [ ] Price sync cron (daily after market close)
  [ ] Correlation chart: Recharts dual-axis (sentiment score + price)
  [ ] Socket.io: push new articles to connected clients in real time

Deliverable: Semantic search + live chart + real-time feed.

### Phase 3 — Polish & Deploy (Weekend 3, ~8 hrs)
Goal: live URL on your resume

Tasks:
  [ ] JWT auth + user watchlist (saved tickers)
  [ ] Email alerts via Nodemailer when sentiment crosses threshold
  [ ] Gemini RAG endpoint: "Why is Reliance down today?"
  [ ] Loading skeletons, error boundaries, mobile responsive layout
  [ ] Deploy backend on Render (free tier)
  [ ] Deploy frontend on Vercel (free tier)
  [ ] Connect MongoDB Atlas to deployed backend
  [ ] Upstash Redis (free tier) for BullMQ in production

Deliverable: Live app at your-project.vercel.app

---

## 4. COMPLETE TECH STACK

### Backend
| Package          | Version   | Purpose                                  |
|------------------|-----------|------------------------------------------|
| express          | ^4.18     | REST API framework                       |
| mongoose         | ^8.x      | MongoDB ODM                              |
| node-cron        | ^3.x      | Scheduled jobs (news fetch, price sync)  |
| rss-parser       | ^3.13     | Parse RSS/Atom feeds to JSON             |
| axios            | ^1.x      | HTTP client for external APIs            |
| bullmq           | ^5.x      | Job queue for async Gemini processing    |
| ioredis          | ^5.x      | Redis client (BullMQ dependency)         |
| socket.io        | ^4.x      | WebSocket server for live updates        |
| jsonwebtoken     | ^9.x      | JWT authentication                       |
| bcryptjs         | ^2.x      | Password hashing                         |
| nodemailer       | ^6.x      | Email alerts                             |
| dotenv           | ^16.x     | Environment variable management          |
| cors             | ^2.x      | Cross-origin request handling            |
| helmet           | ^7.x      | Security headers                         |
| express-rate-limit| ^7.x     | API rate limiting                        |
| morgan           | ^1.x      | HTTP request logging                     |

### Frontend
| Package          | Version   | Purpose                                  |
|------------------|-----------|------------------------------------------|
| react            | ^18.x     | UI framework                             |
| react-router-dom | ^6.x      | Client-side routing                      |
| axios            | ^1.x      | API calls to backend                     |
| socket.io-client | ^4.x      | WebSocket connection                     |
| recharts         | ^2.x      | Sentiment trend + correlation charts     |
| @tanstack/react-query | ^5.x | Server state, caching, refetching      |
| tailwindcss      | ^3.x      | Utility-first styling                    |
| zustand          | ^4.x      | Lightweight client state (watchlist etc) |
| react-hot-toast  | ^2.x      | Notification toasts                      |
| date-fns         | ^3.x      | Date formatting                          |
| lucide-react     | ^0.3x     | Icon library                             |

### AI & Data
| Service              | Free Tier          | Used For                          |
|----------------------|--------------------|-----------------------------------|
| Google Gemini API    | 1500 req/day       | Sentiment, extraction, embeddings |
| Finnhub              | 60 req/min         | Financial news + sentiment scores |
| Marketaux            | 100 req/day        | Entity-tagged financial news      |
| Alpha Vantage        | 25 req/day         | Historical price data             |
| Polygon.io           | 5 req/min          | Current price snapshots           |
| RSS Feeds            | Unlimited (free)   | Reuters, ET Markets, LiveMint etc |
| Reddit API           | Free (read-only)   | r/IndiaInvestments sentiment      |

### Infrastructure (all free tiers)
| Service          | Use Case                                         |
|------------------|--------------------------------------------------|
| MongoDB Atlas M0 | Primary database + Vector Search                 |
| Upstash Redis    | BullMQ job queue in production                   |
| Render           | Node.js backend hosting (free tier)              |
| Vercel           | React frontend hosting                           |
| GitHub Actions   | CI/CD — auto deploy on push                      |

---

## 5. FOLDER STRUCTURE

```
stock-news-analyzer/
├── client/                          # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   │   ├── SentimentCard.jsx
│   │   │   │   ├── CorrelationChart.jsx
│   │   │   │   └── LiveNewsFeed.jsx
│   │   │   ├── Watchlist/
│   │   │   └── Search/
│   │   ├── hooks/
│   │   │   ├── useSocket.js
│   │   │   └── useWatchlist.js
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Ticker.jsx        # Per-stock detail page
│   │   │   └── Auth.jsx
│   │   ├── store/                # Zustand stores
│   │   └── api/                  # Axios instance + API functions
│   └── package.json
│
├── server/                          # Node.js + Express backend
│   ├── models/
│   │   ├── Article.js
│   │   ├── PriceHistory.js
│   │   └── User.js
│   ├── routes/
│   │   ├── articles.js
│   │   ├── prices.js
│   │   ├── search.js
│   │   └── auth.js
│   ├── jobs/
│   │   ├── rssCron.js            # RSS fetch every 20 min
│   │   └── priceCron.js          # Price sync daily
│   ├── queues/
│   │   ├── aiQueue.js            # BullMQ queue definition
│   │   └── aiWorker.js           # Gemini processing worker
│   ├── utils/
│   │   ├── rssFetcher.js
│   │   ├── gemini.js             # Gemini API wrapper
│   │   ├── alphaVantage.js
│   │   └── polygon.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── rateLimit.js
│   ├── socket/
│   │   └── index.js              # Socket.io setup
│   └── index.js                  # Express app entry point
│
├── .env.example
├── docker-compose.yml             # Local Redis via Docker
└── README.md
```

---

## 6. KEY CODE PATTERNS

### Gemini AI Worker (aiWorker.js)
```js
import { Worker } from 'bullmq';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Article from '../models/Article.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const worker = new Worker('ai-analysis', async (job) => {
  const { articleId } = job.data;
  const article = await Article.findById(articleId);
  if (!article || article.sentiment?.label) return; // already processed

  const prompt = `
    Analyze this financial news article and respond ONLY with JSON.
    Title: "${article.title}"
    Description: "${article.description}"

    Return: {
      "tickers": ["AAPL", "MSFT"],
      "sentiment": "bullish" | "bearish" | "neutral",
      "confidence": 0.0 to 1.0,
      "summary": "one sentence explanation"
    }
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(text);

  // Generate embedding for vector search
  const embModel = genAI.getGenerativeModel({ model: 'embedding-001' });
  const embResult = await embModel.embedContent(article.title + ' ' + article.description);

  await Article.findByIdAndUpdate(articleId, {
    sentiment: { label: parsed.sentiment, score: parsed.confidence },
    tickers: parsed.tickers,
    summary: parsed.summary,
    embedding: embResult.embedding.values,
  });
}, { connection: redisConnection, concurrency: 3 });
```

### RAG Search (search.js route)
```js
router.post('/semantic', async (req, res) => {
  const { query } = req.body;

  // 1. Embed the user's query
  const embModel = genAI.getGenerativeModel({ model: 'embedding-001' });
  const result = await embModel.embedContent(query);
  const queryVector = result.embedding.values;

  // 2. MongoDB Atlas Vector Search
  const articles = await Article.aggregate([{
    $vectorSearch: {
      index: 'article_embedding_index',
      path: 'embedding',
      queryVector,
      numCandidates: 100,
      limit: 10,
    }
  }]);

  // 3. Feed top results + query to Gemini for a synthesized answer
  const context = articles.map(a => `- ${a.title}: ${a.summary}`).join('\n');
  const answerResult = await model.generateContent(
    `Based on these recent news articles:\n${context}\n\nAnswer: ${query}`
  );

  res.json({ articles, answer: answerResult.response.text() });
});
```

### Correlation Chart data endpoint
```js
router.get('/correlation/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);

  const [sentimentData, priceData] = await Promise.all([
    // Average sentiment score per day (bullish=1, neutral=0, bearish=-1)
    Article.aggregate([
      { $match: { tickers: symbol, publishedAt: { $gte: sevenDaysAgo } } },
      { $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$publishedAt' } },
        avgSentiment: { $avg: {
          $switch: { branches: [
            { case: { $eq: ['$sentiment.label', 'bullish'] }, then: 1 },
            { case: { $eq: ['$sentiment.label', 'bearish'] }, then: -1 }
          ], default: 0 }
        }},
        articleCount: { $sum: 1 }
      }},
      { $sort: { _id: 1 } }
    ]),
    PriceHistory.find({ symbol, date: { $gte: sevenDaysAgo } }).sort({ date: 1 })
  ]);

  res.json({ sentimentData, priceData });
});
```

---

## 7. ENVIRONMENT VARIABLES

Create a `.env` file in the `server/` directory:

```
# Database
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/stocknews

# Redis (local: redis://localhost:6379 | prod: Upstash URL)
REDIS_URL=redis://localhost:6379

# AI
GEMINI_API_KEY=your_gemini_api_key

# News APIs
FINNHUB_KEY=your_finnhub_key
MARKETAUX_KEY=your_marketaux_key

# Price APIs
ALPHA_VANTAGE_KEY=your_alpha_vantage_key
POLYGON_KEY=your_polygon_key

# Auth
JWT_SECRET=a_long_random_string_here
JWT_EXPIRES_IN=7d

# Email alerts (optional)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password

# App
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## 8. LOCAL DEVELOPMENT SETUP

### Prerequisites
- Node.js v20+
- Docker Desktop (for local Redis)
- MongoDB Atlas account (free)
- Git

### Steps
```bash
# 1. Clone and install dependencies
git clone https://github.com/yourusername/stock-news-analyzer
cd stock-news-analyzer

cd server && npm install
cd ../client && npm install

# 2. Start Redis locally via Docker
docker run -d -p 6379:6379 --name redis redis:alpine

# 3. Copy and fill environment variables
cp server/.env.example server/.env
# Edit .env with your API keys

# 4. Start the backend (runs server + cron + BullMQ worker)
cd server && npm run dev

# 5. Start the frontend
cd client && npm run dev

# App runs at http://localhost:5173
# API runs at http://localhost:5000
# BullMQ dashboard (optional): install @bull-board/express
```

---

## 9. MONGODB ATLAS VECTOR SEARCH SETUP

After your first articles are inserted with embeddings:

1. Go to MongoDB Atlas → your cluster → Search Indexes
2. Click "Create Index" → JSON Editor
3. Paste this config:

```json
{
  "fields": [{
    "type": "vector",
    "path": "embedding",
    "numDimensions": 768,
    "similarity": "cosine"
  }]
}
```

4. Name it: `article_embedding_index`
5. Select collection: `articles`
6. Click Create — takes ~2 minutes

This enables the `$vectorSearch` aggregation stage used in the RAG endpoint.

---

## 10. FREE RSS FEEDS (NO API KEY NEEDED)

```
Reuters Business:   https://feeds.reuters.com/reuters/businessNews
Yahoo Finance:      https://finance.yahoo.com/news/rssindex
MarketWatch:        https://feeds.content.dowjones.io/public/rss/mw_topstories

# India-specific
Moneycontrol:       https://www.moneycontrol.com/rss/latestnews.xml
Economic Times:     https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms
LiveMint Markets:   https://www.livemint.com/rss/markets
Business Standard:  https://www.business-standard.com/rss/markets-106.rss
NDTV Profit:        https://feeds.feedburner.com/ndtvprofit-latest
```

---

## 11. API QUICK REFERENCE

### Alpha Vantage
- Base URL: https://www.alphavantage.co/query
- Key endpoints:
  - Daily prices:  ?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=KEY
  - News+sentiment:?function=NEWS_SENTIMENT&tickers=AAPL&apikey=KEY
  - Quote:         ?function=GLOBAL_QUOTE&symbol=AAPL&apikey=KEY
- Free limit: 25 req/day → always cache in MongoDB

### Polygon.io (now "Massive")
- Base URL: https://api.polygon.io
- Key endpoints:
  - Daily bars:    /v2/aggs/ticker/AAPL/range/1/day/2026-01-01/2026-06-05
  - Snapshot:      /v2/snapshot/locale/us/markets/stocks/tickers/AAPL
  - Ticker details:/v3/reference/tickers/AAPL
- Free limit: 5 req/min, 2 years history → throttle with 13s delay

### Finnhub
- Base URL: https://finnhub.io/api/v1
- Key endpoints:
  - Company news:  /company-news?symbol=AAPL&from=2026-06-01&to=2026-06-05
  - Market news:   /news?category=general
  - Quote:         /quote?symbol=AAPL
- Free limit: 60 req/min → generous for news fetching

### Marketaux
- Base URL: https://api.marketaux.com/v1
- Key endpoint:   /news/all?symbols=AAPL,MSFT&api_token=KEY
- Free limit: 100 req/day → use for Indian market news
- Bonus: returns entity-tagged sentiment scores out of the box

---

## 12. DEPLOYMENT CHECKLIST

### Backend → Render
- [ ] Push code to GitHub
- [ ] Create Render Web Service → connect repo → select server/ dir
- [ ] Add all .env variables in Render dashboard
- [ ] Set build command: npm install
- [ ] Set start command: node index.js
- [ ] Add Upstash Redis: create free DB → copy REDIS_URL → paste in Render env

### Frontend → Vercel
- [ ] Create Vercel project → connect repo → select client/ dir
- [ ] Add env var: VITE_API_URL=https://your-backend.onrender.com
- [ ] Deploy → auto-deploys on every git push

### MongoDB Atlas
- [ ] Whitelist 0.0.0.0/0 in Network Access (allows Render's dynamic IPs)
- [ ] Create Vector Search index (see Section 9)
- [ ] Enable Atlas free tier monitoring

---

## 13. WHAT TO HIGHLIGHT IN INTERVIEWS

1. RAG implementation — "I used MongoDB Atlas Vector Search with Gemini
   embeddings so users can ask natural language questions about recent news
   and get synthesized answers, not just search results."

2. Async architecture — "Gemini API calls are expensive and slow, so I
   decoupled ingestion from AI processing using BullMQ. The cron job saves
   raw articles instantly; the worker processes them in the background."

3. The correlation chart — "I overlaid Gemini-generated sentiment scores
   against real price data from Alpha Vantage. Even a weak correlation is
   interesting to visualize — it shows I think about validation, not just
   feature building."

4. Rate limit strategy — "With only 25 Alpha Vantage calls/day free, I
   built a MongoDB cache layer so repeated requests for the same ticker
   serve from DB, not the API. One cron call per ticker per day."

5. Real-time updates — "Socket.io pushes newly analyzed articles to all
   connected clients the moment Gemini finishes processing, without polling."

---

## 14. USEFUL LEARNING RESOURCES

### Documentation
- Gemini API (Node.js):  https://ai.google.dev/gemini-api/docs
- MongoDB Atlas Vector:  https://www.mongodb.com/docs/atlas/atlas-vector-search/
- BullMQ:                https://docs.bullmq.io
- Socket.io:             https://socket.io/docs/v4
- Recharts:              https://recharts.org/en-US/api

### Tutorials to watch
- "BullMQ + Redis job queues in Node.js" — Traversy Media / Fireship
- "RAG with MongoDB Atlas" — MongoDB official YouTube
- "Socket.io real-time app" — Fireship
- "React Query v5 crash course" — TkDodo blog

### Reference projects (GitHub)
- github.com/adrianhajdin/stock_market_app  (React + Finnhub)
- github.com/mongodb-developer/vector-search-nodejs

---

*Generated for: Stock Market News Analyzer — MERN + Gemini AI*
*Estimated build time: 3 weekends (34 hrs total)*
*Difficulty: Advanced | High resume impact*
