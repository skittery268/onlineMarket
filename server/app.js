require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const productsRouter = require("./routers/products.router");
const authRouter = require("./routers/auth.router");
const categoriRouter = require("./routers/categori.router");
const cartRouter = require("./routers/cart.router");
const whishListRouter = require("./routers/whishlist.router");
const adminRouter = require("./routers/admin.router");
const iconRouter = require("./routers/icons.router");

const app = express();

app.use(express.json());

app.use(cors({ origin: ["https://online-market-cyan.vercel.app", "http://localhost:5173"] }))

app.use(morgan("dev"));

app.use("/api/products", productsRouter);

app.use("/api/users", authRouter);

app.use("/api/categories", categoriRouter);

app.use("/api/cart", cartRouter);

app.use("/api/whishlist", whishListRouter);

app.use("/api/admin", adminRouter);

app.use("/api/icons", iconRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("FATAL: MONGO_URI environment variable is not set.");
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connection to the database was successful");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });
