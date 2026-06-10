import express from 'express';
import { getAllRedditPosts, getRedditPostById } from '../controllers/redditController.controller.js';


const router = express.Router();

router.get('/', getAllRedditPosts);
router.get('/:id', getRedditPostById);

export default router; 