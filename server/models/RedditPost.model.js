import mongoose from 'mongoose';

const redditPostSchema = new mongoose.Schema({
    postId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    title: { 
        type: String, 
        required: true 
    },
        content: String,
    score: { 
        type: Number, 
        required: true 
    },
    subreddit: { 
        type: String, 
        required: true 
    },
    url: { 
        type: String, 
        required: true 
    },
    publishedAt: {
        type: Date,
        required: true
    },
    sentiment: {
        label: String,
        score: Number,
    },
    tickers:[String],
    status:{
        type: String,
        enum: ['pending', 'processed', 'failed'],
        default: 'pending'
    }
}, {timestamps: true});

const RedditPost = mongoose.model('RedditPost', redditPostSchema);

export default RedditPost;