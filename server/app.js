const dotenv = require("dotenv");

dotenv.config();

// configs
const connectDB = require("./configs/mongo.config");

// modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// routers
const productsRouter = require("./routers/products.router");
const authRouter = require("./routers/auth.router");
const categoryRouter = require("./routers/category.router");
const cartRouter = require("./routers/cart.router");
const whishListRouter = require("./routers/whishlist.router");
const adminRouter = require("./routers/admin.router");
const iconRouter = require("./routers/icons.router");
const globalErrorHandler = require("./controllers/error.controller");

// Create application
const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: ["https://online-market-cyan.vercel.app", "http://localhost:5173"] }))
app.use(morgan("dev"));

// routers
app.use("/api/products", productsRouter);
app.use("/api/users", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/whishlist", whishListRouter);
app.use("/api/admin", adminRouter);
app.use("/api/icons", iconRouter);

// Global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    connectDB();
});