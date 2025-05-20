// // ✅ Auth Middleware for Protecting Routes
// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// // Middleware to check if user is logged in
// export const protect = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;

//     if (!token) {
//       return res.status(401).json({ message: "Not authorized, no token" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(401).json({ message: "Not authorized, user not found" });
//     }

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Not authorized, token failed" });
//   }
// };

// // Middleware to allow only admin
// export const adminOnly = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({ message: "Access denied. Admins only." });
//   }
// };

// // Middleware to allow only doctor
// export const doctorOnly = (req, res, next) => {
//   if (req.user && req.user.role === "doctor") {
//     next();
//   } else {
//     res.status(403).json({ message: "Access denied. Doctors only." });
//   }
// };



// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";

// 🔒 Protect User Routes
export const protectUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json({ message: "User not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(403).json({ message: "Unauthorized user access" });
    }
    // if (!user || decoded.role !== "user") {
    //   return res.status(403).json({ message: "Unauthorized user access" });
    // }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token for user" });
  }
};

// 🥼 Protect Doctor Routes
export const protectDoctor = async (req, res, next) => {
  const token = req.cookies.DocToken;

  if (!token) return res.status(401).json({ message: "Doctor not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await Doctor.findById(decoded.id).select("-password");

    if (!doctor || decoded.role !== "doctor") {
      return res.status(403).json({ message: "Unauthorized doctor access" });
    }

    req.doctor = doctor;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token for doctor" });
  }
};

// 🧑‍💼 Admin-Only Access (From User Table)
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admins only access" });
  }
};

// 🧑‍⚕️ Doctor-Only Access
export const doctorOnly = (req, res, next) => {
  if (req.doctor && req.doctor.role === "doctor") {
    next();
  } else {
    res.status(403).json({ message: "Doctors only access" });
  }
};


// // middlewares/authMiddleware.js
// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";
// import Doctor from "../models/doctorModel.js";

// // 🔐 General Token Verifier Utility
// // const verifyToken = async (token, model, roleType = null) => {
// //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //   console.log("decoded:",decoded);
// //   const account = await model.findById(decoded.id).select("-password");
// //   console.log("account:",account);

// //   if (!account) throw new Error("User not found");

// //   if (roleType && account.role !== roleType) {
// //     throw new Error(`Unauthorized ${roleType} access`);
// //   }

// //   return account;
// // };
// const verifyToken = async (token, model, allowedRoles = []) => {
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   const account = await model.findById(decoded.id).select("-password");

//   if (!account) throw new Error("User not found");

//   // ✅ Role check (multiple role support)
//   if (allowedRoles.length && !allowedRoles.includes(account.role)) {
//     throw new Error(`Unauthorized ${account.role} access`);
//   }

//   return account;
// };

// // 🧑‍💻 Protect Logged-In Users
// export const protectUser = async (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (!token) {
//     return res.status(401).json({ message: "User not logged in" });
//   }

//   try {
//     req.user = await verifyToken(token, User, "user");
//     next();
//   } catch (err) {
//     console.error("❌ User Auth Error:", err.message);
//     return res.status(401).json({ message: err.message || "Invalid user token" });
//   }
// };

// // 🧑‍⚕️ Protect Doctors
// export const protectDoctor = async (req, res, next) => {
//   const token = req.cookies.DocToken;

//   if (!token) {
//     return res.status(401).json({ message: "Doctor not logged in" });
//   }

//   try {
//     req.doctor = await verifyToken(token, Doctor, "doctor");
//     next();
//   } catch (err) {
//     console.error("❌ Doctor Auth Error:", err.message);
//     return res.status(401).json({ message: err.message || "Invalid doctor token" });
//   }
// };

// // 🧑‍💼 Admin-Only (From User model)
// export const adminOnly = (req, res, next) => {
//   if (req?.user?.role === "admin") {
//     return next();
//   }
//   return res.status(403).json({ message: "Admins only access" });
// };

// // 🥼 Doctor-Only
// export const doctorOnly = (req, res, next) => {
//   if (req?.doctor?.role === "doctor") {
//     return next();
//   }
//   return res.status(403).json({ message: "Doctors only access" });
// };
