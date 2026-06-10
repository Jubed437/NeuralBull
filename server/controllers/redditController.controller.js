import RedditPost from "../models/RedditPost.model.js";

export const getAllRedditPosts = async(req, res)=>{
    const {ticker} = req.query;
    const filter = {status: 'processed'};
    if(ticker) filter.tickers = ticker;

    const posts = await RedditPost.find(filter).sort({publishedAt: -1}).limit(50);
    res.json(posts);
}

export const getRedditPostById = async(req, res)=>{
    const post = await RedditPost.findById(req.params.id);
    if(!post) return res.status(404).json({error: 'Reddit post not found'});
    res.json(post);
}