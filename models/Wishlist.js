const mongoose = require("mongoose");


const schema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
    },

}, {timestamps: true})


const wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", schema);

module.exports = wishlist