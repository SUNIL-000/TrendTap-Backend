import  express  from "express";
import { deleteSingleWishlistController, getWishlistController, postWishlistController } from "../controller/wishController.js";

export const wishlistRouter=express.Router();

wishlistRouter.post("/create-wishlist",postWishlistController)
wishlistRouter.get("/get-wishlist/:id",getWishlistController)
wishlistRouter.delete("/delete-wishlist/:id",deleteSingleWishlistController)

