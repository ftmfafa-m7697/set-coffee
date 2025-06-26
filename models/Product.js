const mongoose = require('mongoose')
require('models/Comment')

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    suitableFor: {
        type: Boolean,
        required: true,
    },
    smell: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 5,
    },
    date: {
        type: Date,
        required: true,
        default: () => Date.now(),
        Immutable: false, //قابل تغییر نباشد
    },
    tags: {
        type: [String], //چندتا تگ وجود دارد

        required: true,
    },
    comments: { //نام پاپیولیت
        type: [{ //ارتباط یک به چند
            type: mongoose.Types.ObjectId,
            ref: 'comment',
        }],
    }


})


const model = mongoose.models.product || mongoose.model("product", schema)


module.exports = model;



