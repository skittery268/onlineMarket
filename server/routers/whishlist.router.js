const express = require("express");
const { getWhishList, addToWhishList, deleteFromWhishList } = require("../controllers/whishlist.controller");

const whishListRouter = express.Router();

// Get all products in whish list (Router)
whishListRouter.get("/:id", getWhishList);

// Add product in whish list (Router)
whishListRouter.post("/:id", addToWhishList);

// Delete product from whish list (Router)
whishListRouter.delete("/:id/:productId", deleteFromWhishList);

module.exports = whishListRouter;