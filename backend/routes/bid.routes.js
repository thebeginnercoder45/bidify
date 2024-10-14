import express from 'express';
import { getAllMyBids, getBids, placeBid } from '../controllers/bid.controller.js';
import { authenticate } from '../middlewares/Authenticate.js';

const router = express.Router();

router.post('/place-bid/:userId/:auctionId', authenticate, placeBid)
router.get('/get-all-my-bidds/:userId', authenticate, getAllMyBids)
router.get('/get-bids/:itemId', authenticate,getBids)

export default router