const express = require("express");
const { getAllUsers, deleteUser, createCategory, changeRole } = require("../controllers/admin.controller");

const adminRouter = express.Router();

adminRouter.post("/users", getAllUsers);

adminRouter.delete("/deleteuser/:id", deleteUser);

adminRouter.patch("/changerole/:id/:userId", changeRole);

module.exports = adminRouter;