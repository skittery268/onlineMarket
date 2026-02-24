const express = require('express');
const { getAllProducts, createProduct, deleteProduct, editProduct } = require('../controllers/products.controller');

const productsRouter = express.Router();

// get all products
productsRouter.get("/", getAllProducts);

// create new product
productsRouter.post("/:authorId", createProduct);

// delete product
productsRouter.delete("/:id", deleteProduct);

// edit product
productsRouter.patch("/:id", editProduct);

module.exports = productsRouter;