const express = require("express");
const { getUserCart, addToCart, deleteFromCart, changeQuantity, clearCart } = require("../controllers/cart.controller");

const cartRouter = express.Router();

cartRouter.get("/:id", getUserCart);

cartRouter.post("/:id", addToCart);

cartRouter.delete("/:id/:productId", deleteFromCart);

cartRouter.patch("/:id/:productId/:quantity", changeQuantity);

cartRouter.delete("/:id", clearCart);

module.exports = cartRouter;