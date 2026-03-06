const express = require("express");
const { getAllUsers, deleteUser, createCategory, changeRole } = require("../controllers/admin.controller");

const adminRouter = express.Router();

// Router to get all users
adminRouter.post("/users", getAllUsers);

// Router to delete user
adminRouter.delete("/deleteuser/:id", deleteUser);

// Router to change user role (admin / user)
adminRouter.patch("/changerole/:id/:userId", changeRole);

module.exports = adminRouter;