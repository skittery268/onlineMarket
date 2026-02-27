const express = require("express");
const getAllIcons = require("../controllers/icons.controller");

const iconRouter = express.Router();

iconRouter.get("/", getAllIcons);

module.exports = iconRouter;