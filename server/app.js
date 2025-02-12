import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";


import connectDB from "./connectDB.js";
import authRoute from "./Routes/auth.js";
import productRoute from "./Routes/product.js";
import paymentRouter from "./Routes/payment.js"
import orderRouter from "./Routes/order.js"

import products from "./data/index.js";
import Product from "./models/Product.js";

// Read env
dotenv.config();

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// APP 
const app = express();

// MIDDLEWARE 
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "*" }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));






app.use("/auth",authRoute);
app.use("/products",productRoute);
app.use("/payment", paymentRouter);
app.use("/order", orderRouter);



const PORT = process.env.PORT || 6001;

connectDB();

app.listen(PORT,()=>{
    console.log(`Server Listen on ${PORT}`)
    // Product.insertMany(products)
});