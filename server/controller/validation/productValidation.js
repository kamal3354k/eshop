import Joi from "joi";

const ProductValidation = Joi.object({
  name: Joi.string()?.required(),
  category: Joi.string()?.required(),
  price: Joi.number()?.required(),
  imageUrl: Joi.string(),
  description: Joi.string()?.required(),
});

export default function ProductValidationFunction(obj) {
  const options = {
    abortEarly: false,
  };
  try {
    const validObj = ProductValidation.validate(obj, options);
    return validObj;
  } catch (err) {
    console.log(err);
  }
}
