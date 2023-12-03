import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.models("Cart", CartSchema);

export default Cart;
