import product from "../models/product.js";

// Post API controller
export const createProduct = async (req, res, next) => {
  const date = new Date();
  try {
    const createProductData = await product.create({ ...req.body, date: date });
    return res.status(200).json(createProductData);
  } catch (err) {
    next(err);
  }
};

// Get API controller
export const getAllProduct = async (req, res, next) => {
  try {
    const getProductData = await product.find();
    return res.status(200).json(getProductData);
  } catch (err) {
    next(err);
  }
};
