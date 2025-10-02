import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username=== '' || email === '' || password === '') {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    return(error)
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const validPassword = bcrypt.compareSync(password, checkUser.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: pass, ...rest } = checkUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        
      })
      .json({
        success: true,
        message: "Login successful",
        user: rest,
        token,
      });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body; 

  try {

    let user = await User.findOne({ email });

    if (user) {

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const { password, ...rest } = user._doc;

      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "lax",
        })
        .json({
          success: true,
          message: "Login successful",
          user: rest,
          token,
        });
    } else {

      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email: email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const { password, ...rest } = newUser._doc;

      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
        .json({
          success: true,
          message: "Account created successfully",
          user: rest,
          token,
        });
    }
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};