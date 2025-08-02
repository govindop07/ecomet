import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/product.model.js';

export const addProduct = async (req, res) => {
  try {
    const {name, description, price, category, subCategory, sizes, bestSeller} = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];    

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
        return result.secure_url;
      })
    )

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    }

    console.log(productData)
    const product = new productModel(productData);
    await product.save();

    return res.status(200).json({success: true, message: "Product added succesfully"});
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({success: false, message: "Something went wrong in add product controller"});
  }
}

export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({success: true, products});

  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "Something went wrong in listProducts controller"});
  }
}

export const removeProduct = async (req, res) => {
  try {
    const id = req.body.id;
    await productModel.findByIdAndDelete(id);
    res.status(200).json({success: true, message:"Product removed successful"})
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Something went wrong in removeProduct controller"});
  }
}

export const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body;
    const product = await productModel.findById(productId);
    return res.status(200).json({success: true, product});

  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Something went wrong in singleProduct controller"});
  }
}