const mongoose = require("mongoose");

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

const Icon = mongoose.model("icons", iconsSchema);

module.exports = Icon;