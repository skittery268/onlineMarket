const express = require('express');
const { getCategories } = require('../controllers/category.controller');

const categoryRouter = express.Router();

// Get all categories
categoryRouter.get("/", getCategories);

module.exports = categoryRouter;