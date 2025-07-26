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

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists." });
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
  const { username, password } = req.body;

  try {
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required." });
    }

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const token = jwt.sign(
      { id: user._id, username: user.username },
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
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Access denied. Not an admin." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.cookie("admin_jwt", token, {
            maxAge: sevenDaysInMs,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== "development"
        });

        res.status(200).json({
            success: true,
            message: "Admin login successful!",
            user: {
                _id: user._id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Error in adminLogin:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error during admin login." });
    }
};