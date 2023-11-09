import fs from "fs";
import productModel from "../models/productModel.js";
import slugify from "slugify";
export const createProductController = async (req, res) => {
  try {
    const { name, description, slug, price, shipping, catagory, quantity } =
      await req.fields;
    const { photo } = await req.files;

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    return res.status(201).send({
      message: "product created successfully..",
      success: "true",
      product,
    });
  } catch (error) {
    return res.status(500).send({
      message: "failed to create productlist..",
      success: "false",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .populate("catagory")     
      .sort({ createdAt: -1 });

    return res.status(200).send({
      message: "product details fetched successfully...",
      success: true,
      TotalProduct: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while fetching product....",
      success: false,
    });
  }
};
//getting single product api function
export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = await req.params;
    const products = await productModel
      .findOne({ slug: slug })
      .select("-photo")
      .populate("catagory")
      .limit(12)
      .sort({ createdAt: -1 });

    return res.status(200).send({
      message: "single product details fetched successfully...",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while fetching single product....",
      success: false,
    });
  }
};
//getting single of product

export const getPhotoProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).select("photo");

    if (product && product.photo && product.photo.data) {
      res.contentType(product.photo.contentType); // Set content type
      return res.status(200).send(product.photo.data); // Send binary data
    } else {
      return res.status(404).send({
        message: "Image not found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while fetching photo....",
      success: false,
    });
  }
};

//updating the product
export const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const { name, description, slug, price, shipping, catagory, quantity } =
      await req.fields;
    const { photo } = await req.files;

    let slugs;
    if (typeof name === "string" && name.trim() !== "") {
      // Use slugify to generate the slug
      slugs = slugify(name);
      // Update the product in the database with the generated slug
    }
    const product = await productModel.findByIdAndUpdate(
      { _id: pid },
      {
        ...req.fields,
        slug: slugs,
      }
    );
    await product.save();

    return res.status(201).send({
      message: "product updated successfully..",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "failed to update productlist..",
      success: false,
    });
  }
};
//deleting product
export const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await productModel.findByIdAndDelete(pid);

    return res.status(201).send({
      message: "product deleted successfully..",
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).send({
      message: "failed to delete productlist..",
      success: false,
    });
  }
};

export const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = await req.body;
    let query = {};

    if (checked.length > 0) {
      query.catagory = checked; // Correct the key to "category"
    }

    if (radio.length) {
      query.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await productModel.find(query).select("-photo");
    return res.status(200).send({
      message: "Getting filtered products...",
      success: true,
      products,
    });
  } catch (error) {
    // Handle any errors that may occur during the database query
    return res.status(500).json({
      message: "An error occurred while fetching products.",
      success: false,
    });
  }
};
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = await req.params;
    const products = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    return res.status(200).send({
      message:`getting ${keyword} result..`,
      success:true,
      length:products.length,
      products,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message:"error in getting search result..",
      success:false,
      
    })
  }
};
export const getCatProductController = async (req, res) => {
  try {
    const { cid } = await req.params;
    console.log(cid)
    const products = await productModel.find({catagory:cid}).select("-photo");
    return res.status(200).send({
      message:`getting  result..`,
      success:true,
      // length:products.length,
      products
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message:"error in getting cat result..",
      success:false,
      
    })
  }
};