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

    return res.status(200).json({message: "Product added succesfully"});
    return res.status(200).json({});
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Something went wrong in add product controller"});
  }
}


