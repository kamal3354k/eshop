import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  imageUrl: { type: String },
  price: { type: Number, required: true },
});

export default mongoose.model("product", productSchema);
