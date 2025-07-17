import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const RegisterUser = async (req, res) => {
  const {username, email, password} = req.body;
  try {
    const user =await userModel.find({name: username});
    if(user) return res.status(400).json({message: "username already exists"});
    if(password.length < 6) return res.json({message: "Password length should be alteast 6"});

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    })
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      message: "Registration successful!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message: "Something went wrong in register user controller"});
  }
}

export const loginUser = async (req, res) => {
  const {username, password} = req.body;
  
  try {
    const user = await userModel.findOne({name: username});
    if(!user) res.status(400).json({message: "Invalid credentials"});
  
    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) return res.status(400).json("Invalid credentials");
  
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    res.cookie("jwt", token, {
      maxAge: age,
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? true : false,
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({message: "Something went wron"})
  }
}

export const adminLogin = (req, res) => {

}