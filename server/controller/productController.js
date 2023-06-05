import product from "../models/product.js";
import ProductValidationFunction from "./validation/productValidation.js";

// Post API controller
export const createProduct = async (req, res, next) => {
  try {
    const validObj = await ProductValidationFunction(req.body);
    const { value, error } = validObj;
    if (error) throw new Error(error);
    const createProductData = await product.create(value);
    return res.status(201).send("Successfully Added!");
  } catch (error) {
    next(error);
  }
};

// Get API controller
export const getAllProduct = async (req, res, next) => {
  try {
    const getProductData = await product.find();
    return res.status(200).json({ data: getProductData });
  } catch (err) {
    next(err);
  }
};

// Update API controller
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req?.params;
    console.log(req.body,"--body")
    if(!Object.keys(req.body).length) throw new Error("No value passed in body!")
    const getProductData = await product.findByIdAndUpdate(id, req.body);
    return res.status(200).json("Successfully Updated!");
  } catch (err) {
    next(err);
  }
};

//Delete Api controller
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req?.params;
    const getData = await product.findByIdAndRemove(id);
    res.status(200).json("Successfully Delete!");
  } catch (err) {
    console.log(err, "delete");
  }
};
