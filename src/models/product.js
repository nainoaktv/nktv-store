import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: String,
    description: String,
    price: Number,
    category: String,
    sizes: Array,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

const Product =
  mongoose.modelsProducts || mongoose.models("Products", ProductSchema);

export default Product;
