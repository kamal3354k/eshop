import Joi from "joi";
import { validCategories, validSelect } from "../constants/product.js";

export const searchAndFilterSchema = Joi.object({
  search: Joi.string().min(3).max(100),

  category: Joi.string()
    ?.valid(...validCategories)
    .insensitive()
    .messages({
      "any.only": "Invalid category. Please select a valid category.",
    }),
  min_price: Joi.number(),
  max_price: Joi.number().when("min_price", {
    is: true,
    then: Joi.number().greater(Joi.ref("min_price")),
  }),
  limit: Joi.number(),
  offset: Joi.number(),
  select: Joi.string().valid(...validSelect),
});
