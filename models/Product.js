import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    seller:mongoose.Types.ObjectId,
    name: String,
    price: Number,
    stock: Number,
    imageUrl: String,
    category: String,
    description: String,
    sold:Number,
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
