// Models
const Category = require("../models/categories.model");

// Utils
const CatchAsync = require("../utils/CatchAsync");

// Function to get all categories
const getCategories = CatchAsync(async (req, res, next) => {
    const categories = await Category.find();

    res.status(200).json(categories);
})

module.exports = { getCategories };