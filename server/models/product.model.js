// Modules
const mongoose = require("mongoose");

// Schema for data base collection
const productSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: [true, "Author Id is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    img: {
        type: String,
        required: [true, "Image is required"]
    },
    category: {
        type: String,
        required: [true, "Product Category is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    productCount: {
        type: Number,
        required: [true, "Product count is required"]
    },
    quantity: {
        type: Number,
        default: 1
    }
})

// Create product model for communicate with collection
const Product = mongoose.model("products", productSchema);

module.exports = Product;