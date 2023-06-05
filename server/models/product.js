import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    category: { type: String },
    description: { type: String },
    date: { type: String },
    imageUrl: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
