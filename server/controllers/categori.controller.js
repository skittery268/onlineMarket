const Category = require("../models/categories.model");

// Function to get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getCategories };