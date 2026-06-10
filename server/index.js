import "dotenv/config";
import express from 'express';
import {connectDB} from "./config/db.js";
import articlesRouter from './routes/articles.route.js';
import redditRouter from './routes/reddit.route.js';

const app = express();
app.use(express.json());
connectDB();

app.use('/api/articles', articlesRouter);
app.use('/api/reddit', redditRouter);


app.listen(3000, () => {
    console.log(`Server running on port http://localhost:3000`)
})