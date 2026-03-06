const express = require("express");
const { getUserCart, addToCart, deleteFromCart, changeQuantity, clearCart } = require("../controllers/cart.controller");

const cartRouter = express.Router();

// Router to get user cart
cartRouter.get("/:id", getUserCart);

// Router to add in user cart
cartRouter.post("/:id", addToCart);

// Router to delete from user cart
cartRouter.delete("/:id/:productId", deleteFromCart);

// Router to change product quantity in user cart
cartRouter.patch("/:id/:productId/:quantity", changeQuantity);

// Router to buy all products in cart
cartRouter.delete("/:id", clearCart);

module.exports = cartRouter;