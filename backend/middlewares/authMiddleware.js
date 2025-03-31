// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// export const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };


// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// export const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1]; // Remove "Bearer "
//       const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
//       req.user = await User.findById(decoded.id).select("-password"); // Fetch user

//       if (!req.user) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       next(); // Allow request to continue
//     } catch (error) {
//       console.error("Token verification error:", error);
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };



// export const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1]; // Extract token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

//       const user = await User.findById(decoded.id).select("-password");
//       if (!user) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       req.user = user; // Attach user to request object
//       next();
//     } catch (error) {
//       if (error.name === "TokenExpiredError") {
//         return res.status(401).json({ message: "Token expired. Please log in again." });
//       }
//       if (error.name === "JsonWebTokenError") {
//         return res.status(401).json({ message: "Invalid token. Authentication failed." });
//       }
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token provided" });
//   }
// };


import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req,res,next)=>{
  try{

    const token = req.cookies.jwt;
    
    if(!token){
      return res.status(401).json({message:"Not authorized, no token"});
    }

    const decoded =jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next()
  }catch(error){
    res.status(401).json({message:"Not authorized, token failed"});
  }
};
