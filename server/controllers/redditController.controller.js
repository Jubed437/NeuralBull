import RedditPost from "../models/RedditPost.model.js";

export const getAllRedditPosts = async(req, res)=>{
    try {
        const {ticker} = req.query;
        const filter = {status: 'processed'};
        if(ticker) filter.tickers = ticker;

        const posts = await RedditPost.find(filter).sort({publishedAt: -1}).limit(50);
        res.json(posts);
    } catch(err) {
        res.status(500).json({ error: 'Failed to fetch posts', message: err.message });
    }
}

export const getRedditPostById = async(req, res)=>{
    try {
        const post = await RedditPost.findById(req.params.id);
        if(!post) return res.status(404).json({error: 'Reddit post not found'});
        res.json(post);
    } catch(err) {
        res.status(400).json({ error: 'Invalid post ID', message: err.message });
    }
}