import express from "express";
import { createProduct, getAllProduct } from "../controller/productController.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getAllProduct);

export default router;
