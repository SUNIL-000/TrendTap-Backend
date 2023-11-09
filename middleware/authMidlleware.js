import JWT from "jsonwebtoken";
import userModels from "../models/userModels.js";

//REQUIRE signIn
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, "JWT_SECRET_TOKEN");
    req.user = decode;
    if(decode){
      console.log("user details")
      console.log(req.user)
      next()
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
        message:"Sign in first.."
    })
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModels.findById(req.user._id);

    if (user.role !== 1) {
      
      return res.status(500).send({
        success: true,
        message: " UnAthourized Acesss..",
      });
    } else {
     next();
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "error in admin middleware",
    });
  }
};
