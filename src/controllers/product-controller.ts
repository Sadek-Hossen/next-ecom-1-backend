import { Request, Response } from "express";
import Product from "../models/product-model";
import TopProduct from "../models/top-product";


export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, rating, reviews, colors, imageDefault, imageHover } = req.body;

    if (!name || !price || rating === undefined || !imageDefault || !imageHover) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = new Product({
      name,
      price,
      rating,
      reviews: reviews || 0,
      colors: colors || [],
      imageDefault,
      imageHover,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message || error,
    });
  }
};

  export const getProduct = async (_req:Request, res:Response)=>{
   try {
     const products = await Product.find();
 res.status(200).json({
    message:"user get successfully",
    products
   });

   console.log(products);
} catch (error) {
 return res.status(400).json({
    message:"product not found",
    error:error
})   
}
}

export const topProductCreate = async (req:Request, res:Response)=>{
  try {
    const {name,price,rating, reviews, colors, image, category} = req.body;
    if(!name || !price || rating===undefined || !image || !category){
      return res.status(400).json({message:"all fields are required"});
    }
    const topProduct = new TopProduct({
      name,
      price,
      rating,
      reviews: reviews || 0,
      colors: colors || [],
      image,
      category
    });
    console.log("Top Product Created:", topProduct);
    const savedTopProduct = await topProduct.save();
    res.status(201).json({
      message:"top product created successfully",
      savedTopProduct
    })


  } catch (error) {
    res.status(500).json({
      message:"Failed to create top product",
      error:error
    });
  }


}

export const getAllTopProducts = async (_req: Request, res: Response) => {
  try {
    const topProducts = await TopProduct.find();
    res.status(200).json({
      message: "top products fetching successfully",
      topProducts
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch top products",
      error: error.message || error
    });
  }
};
export const filterProducts = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice } = req.query as {
      category?: string;
      minPrice?: string;
      maxPrice?: string;
    };

    let filter: Record<string, unknown> = {};

    // Case-insensitive category filter
    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") }; // "i" = ignore case
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) (filter.price as { $gte?: number }).$gte = Number(minPrice);
      if (maxPrice) (filter.price as { $lte?: number }).$lte = Number(maxPrice);
    }

    const products = await TopProduct.find(filter);

    res.json({
      message: "Products filtered successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to filter products",
      error,
    });
  }
};


export const serchProducts = async (req:Request,res:Response)=>{
  try {
    const {keyword} = req.query as {keyword?:string};
     const serchProducts = await TopProduct.find({
      name: { $regex:keyword, $options:"i"}
         })

      res.status(200).json({
        message:"products serch successfully",
        serchProducts
      })
  } catch (error) {
    res.status(500).json({
      message:"Failed to search products",
      error:error
    });
  }
}