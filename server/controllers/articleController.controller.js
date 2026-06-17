import Article from '../models/Article.model.js';

export const getAllArticles = async(req, res)=>{
    try {
        const {ticker} = req.query;
        const filter = {status: 'processed' };

        if(ticker) filter.tickers = ticker;

        const articles = await Article.find(filter).sort({publishedAt: -1}).limit(50);
        res.json(articles);
    } catch(err) {
        res.status(500).json({ error: 'Failed to fetch articles', message: err.message });
    }
}

export const getArticleById = async(req, res)=>{
    try {
        const article = await Article.findById(req.params.id);
        if(!article) return res.status(404).json({error: 'Article not found'});
        res.json(article);
    } catch (err) {
        res.status(400).json({ error: 'Invalid article ID', message: err.message });
    }
}