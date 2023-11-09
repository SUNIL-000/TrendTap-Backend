import  express  from "express";
import {
  loginController,
  registerController,
  resetController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMidlleware.js";

export const router = express.Router();

//REGISTER ROUTE
router.post("/register", registerController);

//login router
router.post("/login", loginController);
router.post("/reset", resetController);


// router.get("/test",requireSignIn,isAdmin,testControl)

router.get("/user-auth", requireSignIn, (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(500).send({ message: "Error in middleware..." });
  }
});
router.get("/user-admin",requireSignIn,isAdmin,(req,res)=>{
    try {
        res.status(200).send( {ok: true })
    } catch (error) {

        res.status(500).send({message:"Error in admin middleware..."})
    }
})
