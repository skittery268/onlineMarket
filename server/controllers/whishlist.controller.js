// Models
const User = require("../models/user.model");

// Utils
const CatchAsync = require("../utils/CatchAsync");

// Function to get user whish list
const getWhishList = CatchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).json(user.whishList);
})

// Function to add new product in user whish list
const addToWhishList = CatchAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = req.body;

    const user = await User.findById(id);

    user.whishList.push(product);

    await user.save();

    res.status(200).json(user.whishList);
})

// Function to delete product from user whish list
const deleteFromWhishList = CatchAsync(async (req, res, next) => {
    const { id, productId } = req.params;

    const user = await User.findById(id);

    user.whishList = user.whishList.filter(p => p._id !== productId);

    await user.save();

    res.status(200).json(user.whishList);
})

module.exports = { getWhishList, addToWhishList, deleteFromWhishList };