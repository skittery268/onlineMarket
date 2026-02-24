const Category = require("../models/categories.model");
const Product = require("../models/product.model");

// get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// create new product
const createProduct = async (req, res) => {
    try {
        const { title, description, img, category, price, productCount } = req.body;
        const authorId = req.params.authorId;
    
        if (!title || !description || !img || !category || !price || !productCount) {
            return res.status(400).json({ message: "Product title, description, image, category, price and product count are required!" });
        }

        const newProduct = await Product.create({ authorId, title, description, img, category, price, productCount });

        await Category.updateOne({ categori: category }, { $inc: { productCount: +1 } });

        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

// delete product
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const prod = await Product.findById(id);

        await Category.updateOne({ categori: prod.category }, { $inc: { productCount: -1 } });

        await Product.deleteOne({ _id: id });

        const products = await Product.find();

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// edit product
const editProduct = async (req, res) => {
    const { title, description, img, category, price, productCount } = req.body;
    const id = parseInt(req.params.id);

    if (title) await Product.updateOne({ _id: id }, { $set: { title: title } });
    if (description) await Product.updateOne({ _id: id }, { $set: { description: description } });
    if (img) await Product.updateOne({ _id: id }, { $set: { img: img } });
    if (category) await Product.updateOne({ _id: id }, { $set: { category: category } });
    if (price) await Product.updateOne({ _id: id }, { $set: { price: price } });
    if (productCount) await Product.updateOne({ _id: id }, { $set: { productCount: productCount } });

    const products = await Product.find();

    res.status(200).json(products);
}

module.exports = { getAllProducts, createProduct, deleteProduct, editProduct };