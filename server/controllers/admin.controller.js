const Category = require("../models/categories.model");
const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
    try {
        const user = req.body;

        if (user.role !== "admin") {
            return res.status(403).json("You are not authorized to perform this action.");
        }

        const users = await User.find();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = req.body;
        const { id } = req.params;

        if (user.role !== "admin") {
            return res.status(403).json("You are not authorized to perform this action.");
        }

        await User.deleteOne({ _id: id });

        const users = await User.find();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const changeRole = async (req, res) => {
    try {
        const { id, userId } = req.params;
        const { role } = req.body;

        const admin = await User.findById(userId);

        if (admin.role !== "admin") {
            return res.status(403).json("You are not authorized to perform this action.");
        }

        await User.updateOne({ _id: id }, { $set: { role: role } });

        const users = await User.find();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports= { getAllUsers, deleteUser, changeRole };