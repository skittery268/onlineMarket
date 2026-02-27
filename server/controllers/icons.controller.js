const Icon = require("../models/icons.model");

const getAllIcons = async (req, res) => {
    try {
        const icons = await Icon.find();

        console.log(icons);

        res.status(200).json(icons);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = getAllIcons;