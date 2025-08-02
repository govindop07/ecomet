import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const usernameExists = await userModel.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ success: false, message: "Username already exists." });
    }
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ success: false, message: "Email already exists." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email." });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }
    });

  } catch (error) {
    console.error("Error in RegisterUser:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error during registration." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "email and password are required." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' } 
    );

    res.cookie("jwt", token, {
      maxAge: sevenDaysInMs,
      httpOnly: true, // Prevents client-side script access
      sameSite: 'strict', // Helps mitigate CSRF attacks
      secure: process.env.NODE_ENV !== "development" // Use secure cookies in production
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      }
    });

  } catch (error) {
    console.error("Error in loginUser:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error during login." });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET_KEY);
      res.json({success: true, token})
    } else {
      res.json({success: false, message: "Invalid credentials"})
    }
  } catch  (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
};