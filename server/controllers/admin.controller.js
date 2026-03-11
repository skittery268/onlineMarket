// Models
const User = require("../models/user.model");

// Utils
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");

// Function to get all users
const getAllUsers = CatchAsync(async (req, res, next) => {
    const { role } = req.params;

    if (role !== "admin") {
        return next(new AppError("You are not authorized to perform this action.", 403))
    }

    const users = await User.find();

    res.status(200).json(users);
})

// Function to delete user
const deleteUser = CatchAsync(async (req, res, next) => {
    const user = req.body;
    const { id } = req.params;

    if (user.role !== "admin") {
        return next(new AppError("You are not authorized to perform this action.", 403))
    }

    await User.deleteOne({ _id: id });

    const users = await User.find();

    res.status(200).json(users);
})

// Function to change role user (admin / user)
const changeRole = CatchAsync(async (req, res, next) => {
    const { id, userId } = req.params;
    const { role } = req.body;

    const admin = await User.findById(userId);

    if (admin.role !== "admin") {
        return next(new AppError("You are not authorized to perform this action.", 403))
    }

    await User.updateOne({ _id: id }, { $set: { role: role } });

    const users = await User.find();

    res.status(200).json(users);
})

module.exports= { getAllUsers, deleteUser, changeRole };