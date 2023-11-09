import  express  from "express";
import { searchProductController } from "../controller/productController.js";


export const searchRouter = express.Router();

searchRouter.get("/search-products/:keyword",searchProductController)
