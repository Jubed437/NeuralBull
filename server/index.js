import "dotenv/config";
import express from 'express';
import {connectDB} from "./config/db.js";

const app = express();
app.use(express.json());
connectDB();


app.listen(3000, () => {
    console.log(`Server running on port http://localhost:3000`)
})