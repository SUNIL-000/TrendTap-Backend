
import express  from "express";
import { isAdmin, requireSignIn } from "../middleware/authMidlleware.js";
import { categoryController, deletecategoryController, getSinglecategoryController, getcategoryController, updatecategoryController } from "../controller/catagoryController.js";

export const categoryRouter=express.Router();


//category router
categoryRouter.post('/create-catagory',categoryController)
categoryRouter.put('/update-catagory/:id',updatecategoryController)
categoryRouter.get('/get-catagory',getcategoryController)
categoryRouter.get('/get-single-cat/:slug',getSinglecategoryController)
categoryRouter.delete('/delete-catagory/:id',deletecategoryController)




