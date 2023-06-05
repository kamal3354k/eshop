import dotenv from"dotenv";
import express from "express";
import productRouter from "./routes/productRoute.js";
import connectMongoFunction from "./mongo/db.js";
import handleError from "./middlewares/handleError.js";
dotenv.config()

const app = express();
app.use(express.json())

app.use("/product", productRouter);

app.use(handleError)
app.listen(5000,connectMongoFunction);
