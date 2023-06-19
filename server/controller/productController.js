import { APP_CONFIG } from "../constants/app-config.js";
import product from "../models/product.js";
import { searchAndFilterSchema } from "../schemas/product.js";
import ProductValidationFunction from "./validation/productValidation.js";
import _ from "lodash";

// Post API controller
export const createProduct = async (req, res, next) => {
  try {
    const validObj = await ProductValidationFunction(req.body);
    const { value, error } = validObj;
    const image = (await req?.file) ? req.file.buffer.toString("base64") : null;
    value.image = await `data:${req?.file?.mimetype};base64,${image}`;

    if (error) throw new Error(error);
    const findData = await product.find({
      $and: [
        { name: { $regex: req?.body?.name, $options: "i" } },
        { category: { $regex: req?.body?.category, $options: "i" } },
      ],
    });

    if (findData?.length) {
      throw new Error("Product already exist!");
    } else {
      const createProductData = await product.create(value);
      return res.status(200).json({
        status: 200,
        message: "Successfully Added!",
      });
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

// Get API controller
export const getAllProduct = async (req, res, next) => {
  try {
    const getProductData = await product.find();

    getProductData?.map((item) => {
      if (item.quantity < 10) {
        item.inventoryStatus = "LOWSTOCK";
      } else if (item.quantity > 10) {
        item.inventoryStatus = "INSTOCK";
      } else {
        item.inventoryStatus = "OUTSTOCK";
      }
      return item;
    });
    return res.status(200).json({ status: 200, data: getProductData });
  } catch (err) {
    next(err);
  }
};

// Update API controller
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req?.params;
    const value = JSON.parse(JSON.stringify(req.body));
    
    if (Object.keys(req.body).length||req.file) {
      const image = (await req?.file)
        ? req.file.buffer.toString("base64")
        : null;
      value.image = (await image)
        ? `data:${req?.file?.mimetype};base64,${image}`
        : "";
      const getProductData = await product.findByIdAndUpdate(id, value);

      return res.status(200).json({
        status: 200,
        message: "Successfully Updated!",
      });
    } else {
      throw new Error("No value passed in body!");
    }
  } catch (err) {
    next(err);
  }
};

//Delete Api controller
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req?.params;
    const getData = await product.findByIdAndRemove(id);
    res.status(200).json({
      status: 200,
      message: "Successfully Delete!",
    });
  } catch (err) {
    next(err);
  }
};

// search and filter
export const searchAndFilter = async (req, res, next) => {
  try {
    const { value: payload } = searchAndFilterSchema.validate(req.query, {
      abortEarly: true,
    });

    const offset = parseInt(payload?.offset) || 0;
    const limit = parseInt(payload?.limit) || 10;
    const search = payload?.search || "";

    const filterableFields = _.pick(
      _.omit(payload, APP_CONFIG.nonFilterableFields),
      searchAndFilterSchema.describe().keys
    );

    const defaultQuery = {
      $or: [
        {
          name: { $regex: search, $options: "i" },
        },
        {
          category: { $regex: search, $options: "i" },
        },
      ],
    };

    const query = _.isEmpty(filterableFields)
      ? defaultQuery
      : {
          ...defaultQuery,
          $and: Object.entries(filterableFields).map(([k, v]) => {
            if (k === "min_price") {
              return { price: { $gte: v } };
            } else if (k === "max_price") {
              return { price: { $lte: v } };
            } else {
              return { [k]: { $regex: v, $options: "i" } };
            }
          }),
        };

    const searchDataCount = await product.countDocuments(query);

    const searchedData = await product
      .find(query)
      .select(payload?.select ? payload?.select.split(",") : false)
      .skip(offset)
      .limit(limit);
    // searchedData

    searchedData?.map((item) => {
      if (item.quantity < 10) {
        item.inventoryStatus = "LOWSTOCK";
      } else if (item.quantity > 10) {
        item.inventoryStatus = "INSTOCK";
      } else {
        item.inventoryStatus = "OUTSTOCK";
      }
      return item;
    });
    const data = {
      data: searchedData,
      currentPage: offset / limit + 1,
      totalData: searchDataCount,
    };

    res.status(200).json(data);
  } catch (err) {
    if (err.constructor.name === "CastError") {
      return res.status(400).json({
        message: err.message,
      });
    }
    // if(err.constructor)

    next(err);
  }
};
