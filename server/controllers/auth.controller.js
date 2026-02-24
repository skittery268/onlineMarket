const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// login user
const login = async (req, res) => {
    try {
        const userInfo = req.body;
    
        const user = await User.findOne({ "email": userInfo.email });

        if (!user) {
            return res.status(404).json({ message: "Password or email incorrect!" });
        }

        const isCorrect = await bcrypt.compare(userInfo.password, user.password);

        if (!isCorrect) {
            return res.status(404).json({ message: "Password or email incorrect!" });
        }

        res.status(200).json({ ...user._doc, password: undefined });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// register new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!password || !email) {
            return res.status(400).json({ message: "Password and email are required to register!" });
        }

        const isExist = await User.findOne({ "email": email });

        if (isExist) {
            return res.status(400).json({ message: "This user already exist!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ ...user._doc, password: undefined });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// edit user info
const editInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        if (body.name) await User.updateOne({ _id: id }, { name: body.name });
        if (body.email) await User.updateOne({ _id: id }, { email: body.email });
        if (body.image) await User.updateOne({ _id: id }, { image: body.image });

        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (err) {        
        res.status(500).json({ message: err.message });
    }
}

module.exports = { login, register, editInfo };