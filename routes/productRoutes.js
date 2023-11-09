import express from "express";
import { createProductController, deleteProductController, filterProductController, getCatProductController, getPhotoProductController, getProductController, getSingleProductController, searchProductController, updateProductController } from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMidlleware.js";
import formidableMiddleware from "express-formidable";
export const productRouter=express.Router();
const formidable=formidableMiddleware();


productRouter.post("/create-product",formidable,createProductController)
productRouter.put("/update-product/:pid",formidable,updateProductController)

productRouter.get("/get-product",getProductController)
productRouter.get("/get-product/:slug",getSingleProductController)
productRouter.get("/product-photo/:pid",getPhotoProductController)
productRouter.delete("/delete-product/:pid",deleteProductController)
productRouter.post("/filter-products",filterProductController)
productRouter.get("/search-products/:keyword",searchProductController)
productRouter.get("/get-cat-products/:cid",getCatProductController)



