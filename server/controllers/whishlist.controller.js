const User = require("../models/user.model");

// Function to get user whish list
const getWhishList = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        res.status(200).json(user.whishList);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

// Function to add new product in user whish list
const addToWhishList = async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;

        const user = await User.findById(id);

        user.whishList.push(product);

        await user.save();

        res.status(200).json(user.whishList);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

// Function to delete product from user whish list
const deleteFromWhishList = async (req, res) => {
    try {
        const { id, productId } = req.params;

        const user = await User.findById(id);

        user.whishList = user.whishList.filter(p => p._id !== productId);

        await user.save();

        res.status(200).json(user.whishList);
    } catch (err) {
        res.status(500).json(err.message);
        console.log(err);
    }
}

module.exports = { getWhishList, addToWhishList, deleteFromWhishList };