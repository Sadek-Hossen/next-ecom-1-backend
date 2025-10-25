import { model, Schema } from "mongoose";
import { IProduct } from "../interface/product-Interface";


const productSchema = new Schema <IProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
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
    type: [String], // Array of color hex codes
    default: [],
  },
  imageDefault: {
    type: String,
    required: true,
  },
  imageHover: {
    type: String,
    required: true,
  }
  //,

  // image:{
  //   type: String,
  //   required: true,
  // }
}, { timestamps: true });

 const Product = model<IProduct>("Product", productSchema);
 export default Product;