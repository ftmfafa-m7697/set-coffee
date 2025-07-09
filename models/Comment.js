const mongoose = require('mongoose')
require("./Product"); //مربوط به ref

const schema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        required: true
    },
    isAccept: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true,
        default: () => Date.now(),
        Immutable: false,
    },
    productID: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    }

})


const model = mongoose.models.Comment || mongoose.model("Comment", schema)


module.exports = model;