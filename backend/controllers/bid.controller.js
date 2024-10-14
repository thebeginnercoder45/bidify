import { populate } from "dotenv";
import { AuctionItem } from "../models/auction.model.js";
import { Bid } from "../models/bid.model.js";
import { User } from "../models/user.model.js";


export const getBids = async (req, res) => {
    try {
        const { itemId } = req.params;

        const findItem = await AuctionItem.findById(itemId)
            .populate({
                path: 'biddings',
                populate: {
                    path: 'user',
                    select: 'fullName email'
                }
            });

        if (!findItem) {
            return res.status(404).json({
                message: "Item not found by this id",
                success: false
            });
        }

        const auctionItemDetails = {
            item: {
                id: findItem._id,
                name: findItem.name,
                currentPrice: findItem.currentPrice,
                // Add any other fields of auction item if needed
            },
            bids: findItem.biddings.map(bid => ({
                user: {
                    id: bid.user._id,
                    name: bid.user.fullName,
                    email: bid.user.email
                },
                bidAmount: bid.bidAmount,
            })),
        };

        // Return formatted response
        return res.status(200).json({
            message: "Auction item found with bids",
            success: true,
            itemDetails: auctionItemDetails
        });

    } catch (error) {
        console.error('Error retrieving auction item:', error);
        return res.status(500).json({
            message: "Cannot get item with given id",
            success: false
        });
    }
};


export const placeBid = async (req, res) => {
    try {
        const { userId, auctionId } = req.params;
        const { bidAmount } = req.body;

        if (!userId) {
            return res.status(401).json({
                message: "User id is required",
                success: false
            })
        }

        if (!auctionId) {
            return res.status(401).json({
                message: "auction id is required",
                success: false
            })
        }

        if (!bidAmount) {
            return res.status(401).json({
                message: "Bid amount is required",
                success: false
            })
        }

        const users = await User.findById(userId);
        if (!users) {
            return res.status(401).json({
                message: "User not found with provided user id",
                success: false
            })
        }

        const auction = await AuctionItem.findById(auctionId);
        if (!auction) {
            return res.status(401).json({
                message: "Auction item is not found with provided auction id",
                success: false
            })
        }

        if (bidAmount <= auction.currentPrice) {
            return res.status(401).json({
                message: "Bid price cannot be less then current price",
                success: false
            })
        }

        const newBid = await Bid.create({
            auctionItem: auctionId,
            user: userId,
            bidAmount,
        });


        const newAmount = Number(bidAmount)

        auction.currentPrice = newAmount
        auction.biddings.push(newBid._id)
        await auction.save()

        users.myBidds.push(newBid._id);
        await users.save()

        return res.status(200).json({
            message: "Bid placed successfully",
            success: true,
            bid: newBid
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to place bid"
        })
    }
}

export const getAllMyBids = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId)
    .populate({
        path: 'myBidds',
        populate: [
            {
                path: 'auctionItem', 
                populate: {
                    path: 'winner',
                    select: 'fullName email'
                }
            },
        ]
    });

        if (!user) {
            return res.status(404).json({
                message: "Bidds not found in user",
                success: false
            });
        }

        return res.status(200).json({
            message: "Bidds found in user",
            success: true,
            bidds: user.myBidds
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to find bidds",
            success: false
        });
    }
};
