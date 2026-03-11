// Modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schema for data base collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    image: {
        type: String,
        default: ""
    },
    cart: {
        type: Array,
        default: []
    },
    whishList: {
        type: Array,
        default: []
    }
})

// Hashing user password before save it in data base
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
})

// Create function for check user password
userSchema.methods.comparePassword = async function(candidate) {
    return await bcrypt.compare(candidate, this.password);
}

// Create user model for communicate with collection
const User = mongoose.model("users", userSchema);

module.exports = User;