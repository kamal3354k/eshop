import Joi from "joi";
import { validCategories } from "../../constants/product.js";

const ProductValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(5).max(200).required(),
  category: Joi.string()
  ?.valid(...validCategories)
  .insensitive()
  .required()
  .messages({
    "any.required": "Category is required. Please select a category.",
    "any.only": "Invalid category. Please select a valid category.",
  }),
  price: Joi.number().min(10).required(),
  quantity: Joi.number().min(1).required(),
  image: Joi.string(),
    // code: Joi.string().min(3).max(30),
  // image: Joi.string().min(3).max(30).required(),
  inventoryStatus: Joi.string().min(3).max(10),
  // rating: Joi.number().max(10),
});

export default function ProductValidationFunction(obj) {
  const options = {
    abortEarly: true,
  };
  return ProductValidation.validate(obj, options);
}
