import mongoose from 'mongoose';

const auctionItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    itemImage: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    currentPrice: {
        type: String,
        required: true
    },
    category:{
        type:String,
        // required:true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    biddings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bid"
        }
    ],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, {timestamps: true});

export const AuctionItem = mongoose.model("AuctionItem", auctionItemSchema);
