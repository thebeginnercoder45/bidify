import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
    auctionItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuctionItem",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bidAmount: {
        type: Number,
        required: true
    },
    bidTime: {
        type: Date,
        default: Date.now
    }
});

export const Bid = mongoose.model("Bid", bidSchema);
