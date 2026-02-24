const mongoose = require("mongoose");

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

const Category = mongoose.model("category", categorySchema);

module.exports = Category;