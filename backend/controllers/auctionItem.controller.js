import { AuctionItem } from "../models/auction.model.js";
import { Bid } from "../models/bid.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../services/cloudinay.js";

export const createAuctionItems = async (req, res) => {
    try {

        const { userId } = req.params;
        if (!userId) {
            return res.status(404).json({
                message: "UserId is required",
                success: false
            })
        }

        const { name, description, startTime, endTime, currentPrice, category } = req.body;

        console.log(name)
        if (!name || !description || !startTime || !endTime || !currentPrice || !category) {
            return res.status(401).json({
                message: "All feilds are required",
                success: false
            })
        }

        // Alowing user to create items if the user is seller

        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            })
        }

        if (!user.seller) {
            return res.status(401).json({
                message: "Please create seller account",
                success: false,
                redirectURL: '/register-seller'
            })
        }

        const item = await AuctionItem.findOne({ name })
        if (item) {
            return res.status(401).json({
                message: "Item already exists",
                success: false
            })
        }

        const imagePath = req.file.path;

        const uploadedImagePath = await uploadOnCloudinary(imagePath);

        const newItem = await AuctionItem.create({
            name,
            description,
            startTime,
            endTime,
            currentPrice,
            category,
            createdBy: userId,
            itemImage: uploadedImagePath.url
        })

        const updateMyItems = await User.findByIdAndUpdate(userId, {
            $push: { myItems: newItem._id }
        })

        await updateMyItems.save()

        return res.status(200).json({
            message: "created auction items",
            success: true,
            item: newItem
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create auction items",
            success: false,
        });
    }
};


export const getMyItems = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate('myItems')
        if (!user) {
            return res.status(403).json({
                message: "User not found with this user id"
            })
        }

        if (user.myItems.length <= 0) {
            return res.status(404).json({
                message: "You dont have any items",
                success: false
            })
        }

        return res.status(200).json({
            message: "Items found",
            items: user.myItems
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to find items",
            success: false
        })
    }
}
export const getSingleItems = async (req, res) => {
    try {
        const { category } = req.query;

        const items = await AuctionItem.find({ category }).populate("category");

        if (!items || items.length === 0) {
            return res.status(404).json({
                message: `No items found for the category: ${category}`,
                success: false
            });
        }

        return res.status(200).json({
            message: "Items found",
            success: true,
            auctionItems: items
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to find items",
            success: false
        });
    }
}


export const getAllItems = async (req, res) => {
    try {
        const items = await AuctionItem.find().populate({
            path: "biddings",
            populate: {
                path: "user", 
                select: "name email", 
            }
        })
        .populate({
            path: "winner",
            select: "name email",
        });

        if (!items) {
            return res.status(402).json({
                message: "Items not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Items found",
            success: true,
            auctionItems: items
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to find Items",
            success: false
        })
    }
}

export const getItemsById = async (req, res) => {
    try {
        const { itemId } = req.params;

        const findItem = await AuctionItem.findById(itemId).populate("biddings")
        if (!findItem) {
            return res.status(405).json({
                message: "Item not found by this id",
                success: false
            })
        }

        return res.status(200).json({
            message: "One item found by this id",
            success: true,
            item: findItem
        })
    } catch (error) {
        return res.status(500).json({
            message: "Cannot get items with given id",
            success: false
        })
    }
}


export const declareWinner = async (req, res) => {
    try {
        const { itemId } = req.body;

        const item = await AuctionItem.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        const now = new Date();
        if (now < item.endTime) {
            return res.status(400).json({
                message: "Bidding has not ended yet",
                success: false,
            });
        }

        const lastBid = await Bid.findOne({ auctionItem: itemId })
            .sort({ bidTime: -1 })
            .populate('user', '_id fullName email');

        if (!lastBid) {
            return res.status(400).json({ message: "No bids placed for this item" });
        }

        item.winner = lastBid.user._id;
        await item.save();

        res.json({
            message: "Winner declared",
            success: true,
            winner: {
                userId: lastBid.user._id,
                email: lastBid.user.email,
                fullName: lastBid.user.fullName
            },
            winningAmount: lastBid.bidAmount,
        });
    } catch (error) {
        console.error("Error declaring winner:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


export const deleteAuctionItem = async (req, res) => {
    try {
        const {itemId} = req.params;

        const item = await AuctionItem.findByIdAndDelete(itemId);
        if (!item) {
            return res.status(404).json({
                message: "Item not exists",
                success: false
            })
        }

        return res.status(200).json({
            message: "Auction item deleted successfully!",
            success: true
        })
    } catch (error) {
        return res.status(200).json({
            message: "Failed to delete auction item!",
            success: false
        })
    }
}