const express = require('express');
const { getAllProducts, createProduct, deleteProduct, editProduct } = require('../controllers/products.controller');

const productsRouter = express.Router();

// Get all products
productsRouter.get("/", getAllProducts);

// Create new product
productsRouter.post("/:authorId", createProduct);

// Delete product
productsRouter.delete("/:id", deleteProduct);

// Edit product
productsRouter.patch("/:id", editProduct);

module.exports = productsRouter;