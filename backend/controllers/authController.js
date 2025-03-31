// import User from "../models/userModel.js";
// import generateToken from "../utils/generateToken.js";

// // ✅ REGISTER USER
// export const registerUser = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password, // Password is hashed in the model
//       profilePic: "/default-avatar.png",
//       role: "user",
//     });

//     const savedUser = await newUser.save();

//     res.status(201).json({
//       _id: savedUser._id,
//       firstName: savedUser.firstName,
//       lastName: savedUser.lastName,
//       email: savedUser.email,
//       role: savedUser.role,
//       profilePic: savedUser.profilePic,
//       token: generateToken(savedUser._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ LOGIN USER
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role,
//         profilePic: user.profilePic,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// // ✅ Generate JWT Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // ✅ Register User
// export const registerUser = async (req, res) => {
//   const { firstName, lastName, email, password, phone, gender, dateOfBirth, role, specialization, experience, availableSlots, fees, address } = req.body;

//   try {
//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     // ✅ Create user (pre-save hook will hash password automatically)
//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       password,
//       phone,
//       gender,
//       dateOfBirth,
//       role,
//       specialization,
//       experience,
//       availableSlots,
//       fees,
//       address
//     });

//     res.status(201).json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role,
//       profilePic: user.profilePic,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ User Login
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) return res.status(401).json({ message: "Invalid email or password" });

//     // ✅ Check Password Match
//     // const isMatch = await user.matchPassword(password);
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

//     res.json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role,
//       profilePic: user.profilePic,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// ✅ Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const setTokenCookie = (res,token)=>{
  res.cookie("jwt",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:"Strict",
    maxAge : 7*24*60*60*1000,
  });
};

// ✅ Register User
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phone, gender, dateOfBirth, role, specialization, experience, availableSlots, fees, address } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      dateOfBirth,
      role: role || "user",
      specialization,
      experience,
      availableSlots,
      fees,
      address,
      profilePic: "",
    });

    const token = generateToken(user._id);
    setTokenCookie(res,token)

    res.status(201).json({
      msg : "Registration Successful",
     user:{ _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);
    setTokenCookie(res,token)

    res.json({
      msg:"Login Successful",
      user:{_id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      token: generateToken(user._id),}
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
