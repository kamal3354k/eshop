import dotenv from"dotenv";
import express from "express";
import productRouter from "./routes/productRoute.js";
import connectMongoFunction from "./mongo/db.js";
dotenv.config()

const app = express();
app.use(express.json())

app.use("/product", productRouter);

app.listen(5000,connectMongoFunction);
