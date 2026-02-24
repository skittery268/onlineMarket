const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productCount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const Product = mongoose.model("products", productSchema);

module.exports = Product;