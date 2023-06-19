import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  searchAndFilter,
  updateProduct,
} from "../controller/productController.js";
import multer from "multer"

const router = express.Router();
const upload = multer()


router.post("/create", upload.single('image'), createProduct);
router.put("/:id", upload.single('image'),updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getAllProduct);
router.get("/search", searchAndFilter);

export default router;
