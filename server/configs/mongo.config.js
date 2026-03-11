// Modules
const mongoose = require("mongoose");

// Function to connecting with mongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection to the database was successful")
    } catch (err) {
        console.log("Database connection error:", err);
    }
}

module.exports = connectDB;