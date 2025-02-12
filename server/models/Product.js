import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
    },
  description: {
    type: String 
    },
  category: {
    type: String,
    required: true
    },
  variations: [
    {
      color: { type: String, required: true },
      orignal_price: { type: Number},
      sell_price: { type: Number, required: true },
      stock: { type: Number, required: true },
      image: { type: String },
    },
  ],
},
{timestamps: true}
);

const Product = mongoose.model("Product", productSchema);
export default Product;
