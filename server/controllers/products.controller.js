// Models
const Category = require("../models/categories.model");
const Product = require("../models/product.model");

// Utils
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");

// Function to get all products
const getAllProducts = CatchAsync(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json(products);
})

// Function to create new product
const createProduct = CatchAsync(async (req, res, next) => {
    const { title, description, img, category, price, productCount } = req.body;
    const authorId = req.params.authorId;
    
    if (!title || !description || !img || !category || !price || !productCount) {
        return next(new AppError("Product title, description, image, category, price and product count are required!", 400));
    }

    const newProduct = await Product.create({ authorId, title, description, img, category, price, productCount });

    await Category.updateOne({ categori: category }, { $inc: { productCount: +1 } });

    res.status(201).json(newProduct);
})

// Function to delete product
const deleteProduct = CatchAsync(async (req, res, next) => {
    const id = req.params.id;

    const prod = await Product.findById(id);

    await Category.updateOne({ categori: prod.category }, { $inc: { productCount: -1 } });

    await Product.deleteOne({ _id: id });

    const products = await Product.find();

    res.status(200).json(products);
})

// Function to edit product
const editProduct = CatchAsync(async (req, res, next) => {
    const { title, description, img, category, price, productCount } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);

    if (title) product.title = title;
    if (description) product.description = description;
    if (img) product.img = img;
    if (category) product.category = category;
    if (price) product.price = price;
    if (productCount) product.productCount = productCount;

    await product.save();

    const products = await Product.find();

    res.status(200).json(products);
})

module.exports = { getAllProducts, createProduct, deleteProduct, editProduct };