import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      default: "pending",  // pending | completed
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
