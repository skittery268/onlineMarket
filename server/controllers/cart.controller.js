// Models
const Category = require("../models/categories.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

// Utils
const CatchAsync = require("../utils/CatchAsync");

// Function to get all products from user cart
const getUserCart = CatchAsync(async (req, res, next) => {
    const id = req.params.id;

    const user = await User.findById(id);

    res.status(200).json(user.cart);
})

// Function to add product in user cart
const addToCart = CatchAsync(async (req, res, next) => {
    const id = req.params.id;
    const product = req.body;

    const user = await User.findById(id);

    user.cart.push(product);

    await user.save();

    res.status(200).json(user.cart);
})

// Function to delete product from user cart
const deleteFromCart = CatchAsync(async (req, res, next) => {
    const { id, productId } = req.params;

    const user = await User.findById(id);

    user.cart = user.cart.filter(p => p._id !== productId);

    await user.save();

    res.status(200).json(user.cart);
})

// Function to change product quantity to user cart
const changeQuantity = CatchAsync(async (req, res, next) => {
    const { id, productId, quantity } = req.params;

    const user = await User.findOneAndUpdate(
        { _id: id, "cart._id": productId },
        { $set: { "cart.$.quantity": Number(quantity) } },
        { new: true }
    );

    res.status(200).json(user.cart);
})

// Function to buy all products in cart
const clearCart = CatchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id);

    await Promise.all(
        user.cart.map(async p => {
            const result = p.productCount - p.quantity;

            if (result <= 0) {
                await Category.updateOne(
                    { categori: p.category },
                    { $inc: { productCount: -1 } }
                );
                return Product.deleteOne({ _id: p._id });
            } else {
                return Product.updateOne(
                    { _id: p._id },
                    { $inc: { productCount: -p.quantity } }
                )
            }
        })
    )

    user.cart = [];
    await user.save();

    res.status(200).json(user.cart);
})

module.exports = { getUserCart, addToCart, deleteFromCart, changeQuantity, clearCart };