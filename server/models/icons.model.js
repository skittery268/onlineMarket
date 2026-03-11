// Modules
const mongoose = require("mongoose");

// Schema for data base collection
const iconsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    url: {
        type: String,
        required: [true, "Icon Url is required"]
    }
})

// Create icons model for communicate with collection
const Icon = mongoose.model("icons", iconsSchema);

module.exports = Icon;