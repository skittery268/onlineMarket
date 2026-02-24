const express = require("express");
const { getWhishList, addToWhishList, deleteFromWhishList } = require("../controllers/whishlist.controller");

const whishListRouter = express.Router();

whishListRouter.get("/:id", getWhishList);

whishListRouter.post("/:id", addToWhishList);

whishListRouter.delete("/:id/:productId", deleteFromWhishList);

module.exports = whishListRouter;