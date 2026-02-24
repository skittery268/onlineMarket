const express = require('express');
const { getCategories } = require('../controllers/categori.controller');

const categoriRouter = express.Router();

categoriRouter.get("/", getCategories);

module.exports = categoriRouter;