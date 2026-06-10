import axios from 'axios';
import RedditPost from '../models/RedditPost.model.js';

const subreddits = ['CryptoCurrency', 'Bitcoin'];

export const fetchRedditPosts = async () => {
  for (const sub of subreddits) {
    const url = `https://www.reddit.com/r/${sub}/top.json?limit=20&t=day`;
    
    try {
      const response = await axios.get(url, {
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        timeout: 10000
      });
      
      const posts = response.data.data.children;
      
      for (const { data: post } of posts) {
        // Skip if no text content
        if (!post.selftext || post.selftext.trim() === '') continue;
        
        const postData = {
          postId: post.id,
          title: post.title,
          content: post.selftext,
          score: post.score,
          url: `https://reddit.com${post.permalink}`,
          subreddit: post.subreddit,
          publishedAt: new Date(post.created_utc * 1000),  // convert to milliseconds
          status: 'pending',
        };
        
        try {
          await RedditPost.create(postData);
          console.log(`✓ Saved: ${post.title.substring(0, 50)}...`);
        } catch (err) {
          if (err.code === 11000) continue;  // duplicate
          console.error('Save error:', err.message);
        }
      }
    } catch (err) {
      console.error(`Failed to fetch r/${sub}:`, err.message);
      continue;
    }
  }
};

