// Modules
const mongoose = require("mongoose");

// Schema for data base collection
const categorySchema = new mongoose.Schema({
    categori: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    productCount: {
        type: Number,
        required: true
    }
})

// Create category model for communicate with collection
const Category = mongoose.model("category", categorySchema);

module.exports = Category;