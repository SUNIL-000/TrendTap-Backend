import  express  from "express";
import { deleteSingleCartController, getCartController, postCartController } from "../controller/cartController.js";

export const cartRouter=express.Router();

cartRouter.post("/create-cart",postCartController)
cartRouter.get("/get-cart/:id",getCartController)
cartRouter.delete("/delete-cart/:id",deleteSingleCartController)

