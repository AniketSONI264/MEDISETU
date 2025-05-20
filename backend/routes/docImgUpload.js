import express from "express";
import upload from "../middlewares/upload.js"; // Multer-Cloudinary config
import Doctor from "../models/doctorModel.js"; // Make sure this exists
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// 🔥 Upload or Replace Doctor Profile Image
router.post("/:doctorId", upload.single("image"), async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // 💀 Delete previous Cloudinary image if exists
    if (doctor.profilePic) {
      const oldPublicId = doctor.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`MediSetu/${oldPublicId}`); // include folder if needed
    }

    // 🚀 Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "MediSetu", // Or "MediSetu/Doctors" if you wanna be fancy
    });

    // ✅ Save new image URL to DB
    doctor.profilePic = result.secure_url;
    await doctor.save();

    res.status(200).json({
      message: "Doctor profile image updated successfully",
      profilePic: doctor.profilePic,
    });

  } catch (error) {
    console.error("Image Upload Error:", error);
    res.status(500).json({ message: "Doctor image upload failed", error: error.message });
  }
});

export default router;
