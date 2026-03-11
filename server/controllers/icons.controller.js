// Models
const Icon = require("../models/icons.model");

// Utils
const CatchAsync = require("../utils/CatchAsync");

// Function to get all icons
const getAllIcons = CatchAsync(async (req, res, next) => {
    const icons = await Icon.find();

    res.status(200).json(icons);
})

module.exports = getAllIcons;