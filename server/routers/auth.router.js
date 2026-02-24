const express = require("express");
const { login, register, editInfo } = require("../controllers/auth.controller");

const authRouter = express.Router();

// login user
authRouter.post("/login", login);

// register new user
authRouter.post("/register", register);

// edit user info
authRouter.post("/edit/:id", editInfo)

module.exports = authRouter;