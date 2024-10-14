import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    seller: {
        type: Boolean,
        default: false
    },
    contact: {
        type: String
    },
    myBidds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid"
    }],
    myItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuctionItem",
        default: null
    }]
}, { timestamps: true })

export const User = mongoose.model("User", userSchema);