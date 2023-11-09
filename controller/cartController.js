import cartModel from "../models/cartModel.js";
//posting cart
export const postCartController = async (req, res) => {
  const { userId, products } = await req.body;

  try {
    if (!userId || !products) {
      return res.status(200).send({
        message: "please provide the data",
      });
    }
    const newCart = new cartModel({
      userId,
      products,
    });
    await newCart.save();
    return res.status(201).send({
      success: true,
      message: "Item added to cart",
      newCart,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "failed to add items to cart",
      error,
    });
  }
};
export const getCartController = async (req, res) => {
    const {id} =await req.params;
  try {
    const cart = await cartModel
      .find({userId:id})
      .populate({ path: "products", select: "-photo -description" });
    console.log(cart)
    
    return res.status(200).send({
      success: true,
      message: "getting cart results",
      cart,
      
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "failed to getting cart results",
      error,
    });
  }
};


export const deleteSingleCartController = async (req, res) => {
    const {id} =await req.params;
  try {
   await cartModel.findOneAndDelete({products:id})
      
    
    return res.status(200).send({
      success: true,
      message: "one item deleted",
      
      
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "failed to delete cart...",
      error,
    });
  }
};