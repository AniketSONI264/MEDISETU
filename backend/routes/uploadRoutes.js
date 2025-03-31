import express from "express";
import upload from "../middlewares/upload.js"; // Use Cloudinary storage
import User from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js"; // Import Cloudinary

const router = express.Router();

// Upload or Replace Image Route
router.post("/:userId", upload.single("image"), async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete previous image if it exists
    if (user.profilePic) {
      const oldPublicId = user.profilePic.split("/").pop().split(".")[0]; // Extract public_id
      await cloudinary.uploader.destroy(oldPublicId); // Delete from Cloudinary
    }

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "MediSetu",
    });

    // Update the user's profilePic field
    user.profilePic = result.secure_url; // Store Cloudinary URL in MongoDB
    await user.save(); // 🔹 Save changes to MongoDB

    res.status(200).json({
      message: "Image updated successfully",
      profilePic: user.profilePic, // Send updated URL
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
});

export default router;
