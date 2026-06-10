import "dotenv/config";
import { connectDB } from "./config/db.js";
import RedditPost from "./models/RedditPost.model.js";

await connectDB();

const result = await RedditPost.updateMany({ status: "failed" }, { status: "pending" });
console.log(`Reset ${result.modifiedCount} failed Reddit posts to pending.`);
process.exit(0);
