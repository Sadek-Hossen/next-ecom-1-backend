import { model, Schema } from "mongoose";
import { IProduct } from "../interface/product-Interface";

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    required: true,
    default: 0,
  },
  colors: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const topProduct = model<IProduct>("TopProduct", productSchema);
export default topProduct;
