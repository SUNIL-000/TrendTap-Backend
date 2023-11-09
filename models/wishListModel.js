import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"users"
    },
    products: 
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
        ref: "Product", // Refers to the Product model
        required: true,
      },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", WishlistSchema);
