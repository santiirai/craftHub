import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  stock: { type: Number, required: true },
  category: String,
  rating: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
