const express = require("express");
const getAllIcons = require("../controllers/icons.controller");

const iconRouter = express.Router();

// Get all icons
iconRouter.get("/", getAllIcons);

module.exports = iconRouter;