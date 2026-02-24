const Product = require("../models/product.model");
const User = require("../models/user.model");

const getUserCart = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        res.status(200).json(user.cart);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const addToCart = async (req, res) => {
    try {
        const id = req.params.id;
        const product = req.body;

        const user = await User.findById(id);

        user.cart.push(product);

        await user.save();

        res.status(200).json(user.cart);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const deleteFromCart = async (req, res) => {
    try {
        const { id, productId } = req.params;

        const user = await User.findById(id);

        user.cart = user.cart.filter(p => p._id !== productId);

        await user.save();

        res.status(200).json(user.cart);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const changeQuantity = async (req, res) => {
    try {
        const { id, productId, quantity } = req.params;

        const user = await User.findOneAndUpdate(
            { _id: id, "cart._id": productId },
            { $set: { "cart.$.quantity": Number(quantity) } },
            { new: true }
        );

        res.status(200).json(user.cart);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const clearCart = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        await Promise.all(
            user.cart.map(p => {
                return Product.updateOne(
                    { _id: p._id },
                    { $inc: { productCount: -p.quantity } }
                )
            })
        )

        user.cart = [];
        await user.save();

        res.status(200).json(user.cart);
    } catch (err) {
        res.status(500).json(err.message)
        console.log(err);
    }
}

module.exports = { getUserCart, addToCart, deleteFromCart, changeQuantity, clearCart };