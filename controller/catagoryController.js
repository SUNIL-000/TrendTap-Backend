import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//category controller
export const categoryController = async (req, res) => {
  try {
    const { name } = await req.body;
    if (!name) {
      return res.status(201).send({
        message: "field is required",
      });
    }
    //check exstining value or not

    const isName = await categoryModel.findOne({ name });
    if (isName) {
      return res.status(409).send("Category already exist");
    }

    const newcatagory = new categoryModel({
      name,
      slug: slugify(name),
    });
    await newcatagory.save();
    return res.status(201).send({
      success: true,
      message: "catagory created successfully..",
      newcatagory,
    });
  } catch (error) { 
    console.log(error)
    return res.status(201).send({
    success: true,
    message: "failed while creating catagory..",
    newcatagory,
  });}
};

export const updatecategoryController = async (req, res) => {
  try {
    const { name } = await req.body;
    const { id } = await req.params;

    //update catagory
    const updateCatagory = await categoryModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        slug: slugify(name),
      },
      {
        new: true,
      }
    );
    await updateCatagory.save();
    return res.status(201).send({
      message: "updated successfully..",
      success: true,
      updateCatagory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: " error occured while updating catagory..",
      success: false,
    });
  }
};
export const getcategoryController = async (req, res) => {
  try {
    const catagory = await categoryModel.find({});

    return res.status(200).send( {
      message: "catagory fetched successfully...",
      success: true,
      catagory
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: " error occured while fetching catagory..",
      success: false,
    });
  }
};
export const getSinglecategoryController = async (req, res) => {
  try {
    const {slug}= await req.params;
    const catagory = await categoryModel.find({slug:slug});

    return res.status(200).send( {
      message: `${slug} catagory fetched successfully...`,
      success: true,
      catagory
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: " error occured while fetching single catagory..",
      success: false,
    });
  }
};
export const deletecategoryController = async (req, res) => {
  try {
    const {id}= await req.params;
    const catagory = await categoryModel.findByIdAndDelete(id);

    return res.status(200).send( {
      message: " catagory deleted successfully...",
      success: true,
      catagory
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: " error occured while deleting catagory..",
      success: false,
    });
  }
};
