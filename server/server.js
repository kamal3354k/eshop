import dotenv from "dotenv";
import express from "express";
import productRouter from "./routes/productRoute.js";
import connectMongoFunction from "./mongo/db.js";
import handleError from "./middlewares/handleError.js";
import handleCors from "./middlewares/handleCors.js";
import bodyParser from "body-parser"
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.use(express.json());

// Enable CORS middleware
app.use(handleCors);

app.use("/product", productRouter);

app.use(handleError);
app.listen(5000, connectMongoFunction);
