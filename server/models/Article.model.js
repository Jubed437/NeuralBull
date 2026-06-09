import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    guid: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    summary: String,
    url: String,
    source: String,
    publishedAt: {
        type: Date,
        default: Date.now
    },
    tickers: [String],
    sentiment:{
        label: String,
        score: Number
    },
    embedding: [Number],
    status:{
        type: String,
        enum: ['pending', 'processed', 'failed'],
        default: 'pending',
    },
    rawContent: String

}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

export default Article;