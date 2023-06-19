import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    category: { type: String },
    description: { type: String },
    image: { type: String },
    quantity: { type: Number },
    inventoryStatus: { type: String },
    price: { type: Number },
    // rating: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
