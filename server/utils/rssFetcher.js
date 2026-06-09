import parser from 'rss-parser';
import Article from '../models/Article.model.js';

const rssParser = new parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  },
  timeout: 10000,  // 10 sec timeout
});


const feeds = [
  { url: 'https://www.reddit.com/r/CryptoCurrency/.rss', source: 'reddit_crypto' },
];

export const fetchAllFeeds = async()=>{
    for(const feed of feeds){
        try{
            const parsedFeed = await rssParser.parseURL(feed.url);
            for(const item of parsedFeed.items){
                const ArticleData = {
                    guid: item.guid || item.link,
                    title: item.title,
                    url: item.link,
                    source: feed.source,
                    rawContent: item.content || item.contentSnippet || item.summary || '',
                    publishedAt: item.pubDate? new Date(item.pubDate) : new Date(),
                    status: 'pending',
                }
                try{
                    await Article.create(ArticleData);
                    console.log(`Article ${ArticleData.guid} saved successfully.`);
                }catch(err){
                    if(err.code == 11000) continue; // Duplicate entry, skip
                    console.error("Save Error: ", err.message);
                }
            }
        }catch(err){
            console.error(`Error fetching feed ${feed.url}:`, err);
            continue;
        }
    }
}