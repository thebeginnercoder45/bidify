import express from 'express'
import { authenticate } from '../middlewares/Authenticate.js'
import { createAuctionItems, declareWinner, deleteAuctionItem, getAllItems, getItemsById, getMyItems, getSingleItems, updateItems } from '../controllers/auctionItem.controller.js'
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/create-auction-item/:userId', authenticate, upload.single('itemImage'), createAuctionItems)


router.get('/get-my-items/:userId', authenticate, getMyItems)

router.get('/get-all-items', getAllItems)
router.get('/get-single-items', getSingleItems)

router.get('/get-item-details/:itemId', getItemsById)

router.post('/declare-winner', declareWinner);

router.delete('/delete-auction-item/:itemId', authenticate, deleteAuctionItem)

router.patch('/update-item/:itemid', updateItems)

export default router;