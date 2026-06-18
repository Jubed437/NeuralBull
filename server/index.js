import "dotenv/config";
import express from 'express';
import {connectDB} from "./config/db.js";
import articlesRouter from './routes/articles.route.js';
import redditRouter from './routes/reddit.route.js';
import './jobs/scheduler.js';  // Start cron jobs
import './queue/workers.js';  // Start BullMQ workers

const app = express();
app.use(express.json());
connectDB();

const port = process.env.PORT || 3000;

app.use('/api/articles', articlesRouter);
app.use('/api/reddit', redditRouter);


app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`)
})