import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
  }],
  amount: Number,
  paymentStatus: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
  paymentMethod: { type: String, default: "Khalti" },
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
