import express from "express";
import { protectUser } from "../middlewares/authMiddleware.js";
import User from "../models/userModel.js";

const router = express.Router();

// Update user profile
router.put("/update/:userId", protectUser, async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      firstName,
      lastName,
      email,
      dateOfBirth,
      address,
      phone,
      gender
    } = req.body;

    // Find user and update
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;

    // Save changes
    await user.save();

    // Return updated user (excluding password)
    const updatedUser = await User.findById(userId).select("-password");
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ 
      message: "Failed to update profile",
      error: error.message 
    });
  }
});

export default router; 