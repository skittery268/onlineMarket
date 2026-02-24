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

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(morgan("dev"));

app.use("/api/products", productsRouter);

app.use("/api/users", authRouter);

app.use("/api/categories", categoriRouter);

app.use("/api/cart", cartRouter);

app.use("/api/whishlist", whishListRouter);

app.use("/api/admin", adminRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connection to the database was successful");

        app.listen(3000, () => {
            console.log("Server Started!");
        })
    })
    .catch((err) => console.log(err))
