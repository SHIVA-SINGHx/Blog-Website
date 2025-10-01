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
      message: "All fields are required",
    });
  }

  try {

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const validPassword = bcrypt.compareSync(password, checkUser.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // remove password before sending
    const { password: pass, ...rest } = checkUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        
      })
      .json({
        message: "Login successful",
        user: rest,
        token,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
