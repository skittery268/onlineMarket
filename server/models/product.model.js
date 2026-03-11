// Modules
const mongoose = require("mongoose");

// Schema for data base collection
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

// Create product model for communicate with collection
const Product = mongoose.model("products", productSchema);

module.exports = Product;