import wishListModel from "../models/wishListModel.js";
//posting wishlist
export const postWishlistController = async (req, res) => {
  const { userId, products } = await req.body;

  try {
    if (!userId || !products) {
      return res.status(500).send({
        message: "please provide the data",
      });
    }
    const Wishlist = new wishListModel({
      userId,
      products,
    });
    await Wishlist.save();
    return res.status(201).send({
      success: true,
      message: "Item added to wishlist",
      Wishlist,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "failed to add items to wishlist",
      error,
    });
  }
};
export const getWishlistController = async (req, res) => {
  const { id } = await req.params;
  try {
    const wishlist = await wishListModel
      .find({ userId: id })
      .populate({ path: "products", select: "-photo -description" });
    // console.log(wishlist)

    return res.status(200).send({
      success: true,
      message: "getting wishlist results",
      wishlist,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "failed to getting wishlist results",
      error,
    });
  }
};

export const deleteSingleWishlistController = async (req, res) => {
  const { id } = await req.params;
  try {
    await wishListModel.findOneAndDelete({ products: id });

    return res.status(200).send({
      success: true,
      message: "one item deleted from wishlist",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "failed to delete wishlist...",
      error,
    });
  }
};
