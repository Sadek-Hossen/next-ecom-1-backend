
import express from "express";
import { createProduct, filterProducts, getAllTopProducts, getProduct, serchProducts, topProductCreate } from "../controllers/product-controller";
//import { checkAdmin } from "../middilwer/authontication";

const router = express.Router();


router.post('/createProduct',createProduct)
router.get('/getProduct',getProduct)
//router.post("/topProductCreate", checkAdmin ,topProductCreate)
router.post("/topProductCreate" ,topProductCreate)
router.get("/getTopProducts",getAllTopProducts)
router.get("/filterProducts",filterProducts)
router.get("/searchProducts",serchProducts)
export default router;