import express from "express";
const app = express();
import cors from "cors"
import morgan from "morgan";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import { router } from "./routes/authRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import { wishlistRouter } from "./routes/wishListRoutes.js";
import { searchRouter } from "./routes/searchRouter.js";

//.env file configure
dotenv.config();

//mongodb connection
dbConnect();

//middleware
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static('public'))

//routes
app.use("/api/v1/auth", router);

app.use('/api/v1/catagory',categoryRouter);

app.use("/api/v1/product", productRouter)
//cart routes

app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/wishlist", wishlistRouter)


//search routes
app.use('/api/v1/search/',searchRouter)


const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
