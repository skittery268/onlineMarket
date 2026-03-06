const express = require("express");
const { login, register, editInfo } = require("../controllers/auth.controller");

const authRouter = express.Router();

// login user
authRouter.post("/login", login);

// Register new user
authRouter.post("/register", register);

// Edit user info
authRouter.post("/edit/:id", editInfo)

module.exports = authRouter;