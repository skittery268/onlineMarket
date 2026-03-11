// Modules
const mongoose = require("mongoose");

// Schema for data base collection
const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    img: {
        type: String,
        required: [true, "Image is required"]
    },
    productCount: {
        type: Number,
        required: [true, "Product count is required"]
    }
})

// Create category model for communicate with collection
const Category = mongoose.model("category", categorySchema);

module.exports = Category;