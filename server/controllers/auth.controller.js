// Models
const User = require("../models/user.model");

// Utils
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");

// Function to login user
const login = CatchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ "email": email });

    if (!user) {
        return next(new AppError("Password or email incorrect!", 400))
    }

    const isCorrect = user.comparePassword(password);

    if (!isCorrect) {
        return next(new AppError("Password or email incorrect!", 400))
    }

    res.status(200).json({ ...user._doc, password: undefined });
})

// Function to register new user
const register = CatchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!password || !email) {
        return next(new AppError("Password and email are required to register!", 400));
    }

    const isExist = await User.findOne({ "email": email });

    if (isExist) {
        return next(new AppError("This user already exist!", 400));
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({ ...user._doc, password: undefined });
})

// Function to edit user info
const editInfo = CatchAsync(async (req, res, next) => {
    const id = req.params.id;
    const { name, email, image } = req.body;

    const user = await User.findById(id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (image) user.image = image;

    await user.save();

    res.status(200).json(user);
})

module.exports = { login, register, editInfo };