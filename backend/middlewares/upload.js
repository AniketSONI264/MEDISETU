import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Configure Multer Storage to Upload to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "MediSetu", // Folder in Cloudinary where images will be stored
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Initialize Multer with Cloudinary Storage
const upload = multer({ storage });

export default upload;


// import nc from "next-connect";
// import dbConnect from "../../../config/db"; // Import database connection
// import User from "../../../models/userModel"; // Import User model
// import upload from "../../../utils/upload"; // Import Multer config

// const handler = nc();

// // Enable file upload middleware
// handler.use(upload.single("image")); // "image" is the form field name

// handler.post(async (req, res) => {
//   await dbConnect(); // Ensure DB is connected

//   const { userId } = req.query; // Get userId from API route params
//   if (!userId) {
//     return res.status(400).json({ error: "User ID is required" });
//   }

//   try {
//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const imageUrl = req.file.path; // Cloudinary URL returned by Multer

//     // Update user profilePic in MongoDB
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { profilePic: imageUrl },
//       { new: true } // Return updated document
//     );

//     return res.status(200).json({ imageUrl: updatedUser.profilePic });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     return res.status(500).json({ error: "Failed to upload image" });
//   }
// });

// export default handler;



// import { default as nc } from "next-connect";
// import dbConnect from "../config/db.js"; // Database connection
// import User from "../models/userModel.js"; // User model
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js"; // Cloudinary config

// // Configure Multer to Upload Directly to Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "MediSetu", // Cloudinary folder
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// // Initialize Multer with Cloudinary Storage
// const upload = multer({ storage });

// // Create API Handler
// const handler = nc();

// // Enable file upload middleware
// handler.use(upload.single("image")); // "image" is the form field name

// handler.post(async (req, res) => {
//   await dbConnect(); // Ensure database connection

//   const { userId } = req.query;
//   if (!userId) return res.status(400).json({ error: "User ID is required" });

//   try {
//     if (!req.file?.path) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const imageUrl = req.file.path; // Cloudinary URL

//     // Update user profilePic in MongoDB
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { profilePic: imageUrl },
//       { new: true, select: "profilePic" } // Return only updated profilePic
//     );

//     return res.status(200).json({ imageUrl: updatedUser.profilePic });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     return res.status(500).json({ error: "Failed to upload image" });
//   }
// });

// export default handler;



// import dbConnect from "../config/db.js"; // Database connection
// import User from "../models/userModel.js"; // User model
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js"; // Cloudinary config

// // Configure Multer to Upload Directly to Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "MediSetu", // Cloudinary folder
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// // Initialize Multer
// const upload = multer({ storage });

// // Disable Body Parser to Allow FormData Uploads
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Helper function to handle multer with Promises
// const runMiddleware = (req, res, fn) => {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
//   });
// };

// // API Handler
// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   await dbConnect(); // Ensure database connection

//   try {
//     // Run Multer Middleware
//     await runMiddleware(req, res, upload.single("image"));

//     // Check if File Exists
//     if (!req.file?.path) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const { userId } = req.query;
//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required" });
//     }

//     const imageUrl = req.file.path; // Cloudinary URL

//     // Update User Profile Pic in MongoDB
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { profilePic: imageUrl },
//       { new: true, select: "profilePic" }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     return res.status(200).json({ imageUrl: updatedUser.profilePic });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     return res.status(500).json({ error: "Failed to upload image" });
//   }
// }
