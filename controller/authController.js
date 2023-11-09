import { comparedPassword, hashPassword } from "../helper/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

//user registration....
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, adress, answer } = await req.body;
    //validate whether those are empty or not
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone no is required" });
    }
    if (!adress) {
      return res.send({ message: "adress is required" });
    }
    if (!answer) {
      return res.send({ message: "adress is required" });
    }

    //check user
    const existingUser = await userModels.findOne({ email });

    //existing user
    if (existingUser)
      return res
        .status(404)
        .send({ message: "email is aready Registered please login." });

    //register user
    const hashedPassword = await hashPassword(password);
    const newUser = new userModels({
      name,
      email,
      phone,
      adress,
      password: hashedPassword,
      answer,
    });
    await newUser.save();
    return res.status(201).send({
      success: true,
      message: "User Register successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed in registration",
    });
  }
};

//login controll
export const loginController = async (req, res) => {
  try {
    const { email, password } = await req.body;
    //check if the email or password length > 0
    if (!email || !password) {
      return res.status(404).send({
        message: "Please enter email or password",
      });
    }
    //check whether a user is present or not from that perticular email
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "Email is not register..",
      });
    }
    //if email is present then match the password
    const match = await comparedPassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        message: "Wrong password entered..",
      });
    }

    //creating token for login user
    const token = JWT.sign({ _id: user._id }, "JWT_SECRET_TOKEN", {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "Login Successfully..",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        adress: user.adress,
        role: user.role,
        userId:user._id
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed in Login..",
      success: false,
    });
  }
};
// export default {registerController};

//reset password
export const resetController = async (req, res) => {
  try {
    const { email, newpassword, answer } = await req.body;
    if (!email) {
      res.send({
        message: "Email required",
      });
    }
    if (!newpassword) {
      res.send({
        message: "password required",
      });
    }
    if (!answer) {
      res.send({
        message: "answer required",
      });
    }

    const user = await userModels.findOne({ email, answer });
    // console.log(user)
    const hashNewPass = await hashPassword(newpassword);
    if (user) {
      const updateuser = await userModels.findByIdAndUpdate(
        { _id: user._id },
        {
          email,
          answer,
          password: hashNewPass,
        }
      );
      await updateuser.save();
    }

    res.status(200).send({
      success: true,
      message: "Password reset Successfully...",
    });
  } catch (error) {
    res.status(500).send(error, {
      message: "Failed in password reset...",
    });
  }
};

