// Modules
const mongoose = require("mongoose");

// Schema for data base collection
const iconsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

// Create icons model for communicate with collection
const Icon = mongoose.model("icons", iconsSchema);

module.exports = Icon;