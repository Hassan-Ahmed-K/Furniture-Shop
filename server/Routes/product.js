import express from "express";
import { getProducts, getCategoryProduct, getProduct} from "../Controller/product.js";

const router = express.Router();


router.get("/",getProducts);

router.get("/category/:category", getCategoryProduct);

router.get("/:productId",getProduct);

export default router;