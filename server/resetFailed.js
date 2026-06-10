import "dotenv/config";
import { connectDB } from "./config/db.js";
import Article from "./models/Article.model.js";

await connectDB();

const result = await Article.updateMany({ status: "failed" }, { status: "pending" });
console.log(`Reset ${result.modifiedCount} failed articles to pending.`);
process.exit(0);
