import "dotenv/config";
import { connectDB } from "./config/db.js";
import { processArticle } from "./utils/processArticle.js";
import Article from "./models/Article.model.js";

await connectDB();

const pendingArticles = await Article.find({status: "pending"});
console.log(`Found ${pendingArticles.length} pending articles.`);

for(const article of pendingArticles){
    await processArticle(article._id);
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec delay between API calls
}

console.log("All pending articles processed.");
process.exit(0);