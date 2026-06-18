import RedditPost from '../models/RedditPost.model.js';
import parser from 'rss-parser';

const subreddits = ['CryptoCurrency', 'Bitcoin'];
const rssParser = new parser({
  headers: {
    'User-Agent': 'NeuralBull/1.0 (+https://github.com/Jubed437/NeuralBull)'
  },
  timeout: 10000,
});

export const fetchRedditPosts = async () => {
  for (const sub of subreddits) {
    const url = `https://www.reddit.com/r/${sub}/top/.rss?t=day`;
    
    try {
      const feed = await rssParser.parseURL(url);
      const posts = feed.items || [];
      
      for (const post of posts) {
        const content = post.contentSnippet || post.content || '';
        if (!content.trim()) continue;

        const postId = post.guid || post.id || post.link;
        
        const postData = {
          postId,
          title: post.title,
          content,
          score: Number(post['re:score'] || 0),
          url: post.link,
          subreddit: sub,
          publishedAt: post.isoDate ? new Date(post.isoDate) : new Date(post.pubDate || Date.now()),
          status: 'pending',
        };
        
        try {
          await RedditPost.create(postData);
          console.log(`✓ Saved RedditPost: ${post.title.substring(0, 20)}...`);
        } catch (err) {
          if (err.code === 11000) continue;
          console.error('RedditPost Save error:', err.message);
        }
      }
    } catch (err) {
      console.error(`RedditPost Failed to fetch r/${sub}:`, err.message);
      continue;
    }
  }
};

