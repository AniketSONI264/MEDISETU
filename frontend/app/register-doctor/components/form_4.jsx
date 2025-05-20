"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { UploadCloud } from "lucide-react";

const StepFour = ({ formData, setFormData, goToPrevious, handleSubmit }) => {
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudFormData = new FormData();
    cloudFormData.append("file", file);
    cloudFormData.append("upload_preset", "doctor_profiles");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dr10kpkc4/image/upload", {
        method: "POST",
        body: cloudFormData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          profilePic: data.secure_url,
        }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const safeTrim = (value) => (value || "").trim();

  const isStepFourValid = () => {
    return safeTrim(formData.bio) !== "" && safeTrim(formData.designation) !== "";
  };

  const onSubmit = () => {
    if (isStepFourValid()) {
      handleSubmit();
    } else {
      setShowErrors(true);
      toast.error("Please fill out all required fields.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-6"
    >
      {/* Profile Picture Upload */}
      <div>
        <label className="flex items-center font-semibold text-sm text-gray-700 mb-2 gap-2">
          <UploadCloud className="w-5 h-5 text-teal-500" />
          Upload Profile Picture
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-all"
        />
        {formData.profilePic && (
          <img
            src={formData.profilePic}
            alt="Profile Preview"
            className="mt-3 h-20 w-20 object-cover rounded-full border border-teal-400 shadow-sm"
          />
        )}
      </div>

      {/* Designation */}
      <div>
        <label className="block font-semibold text-sm text-gray-700">
          Designation <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="designation"
          placeholder="e.g., Cardiologist, General Physician"
          value={formData.designation || ""}
          onChange={handleChange}
          className={`w-full p-2 rounded border ${
            showErrors && safeTrim(formData.designation) === ""
              ? "border-red-500"
              : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300`}
        />
        {showErrors && safeTrim(formData.designation) === "" && (
          <p className="text-red-500 text-xs mt-1">Designation is required</p>
        )}
      </div>

      {/* Clinic or Hospital Name */}
      <div>
        <label className="block font-semibold text-sm text-gray-700">
          Clinic/Hospital Name
        </label>
        <input
          type="text"
          name="clinicName"
          placeholder="e.g., Apollo Hospitals, Care Clinic"
          value={formData.clinicName || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block font-semibold text-sm text-gray-700">
          Detailed Bio <span className="text-red-500">*</span>
        </label>
        <textarea
          name="detailedBio"
          rows={4}
          placeholder="Write something about yourself..."
          value={formData.detailedBio || ""}
          onChange={handleChange}
          className={`w-full p-2 rounded border ${
            showErrors && safeTrim(formData.detailedBio) === ""
              ? "border-red-500"
              : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300`}
        ></textarea>
        {showErrors && safeTrim(formData.detailedBio) === "" && (
          <p className="text-red-500 text-xs mt-1">Bio is required</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          onClick={goToPrevious}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-xl transition duration-300">
          Previous
        </button>
        {/* <button
          onClick={onSubmit}
          disabled={!isStepFourValid()}
          className={`${
            !isStepFourValid()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          } font-semibold py-2 px-6 rounded-xl transition duration-300`}
        >
          Submit
        </button> */}
      </div>
    </motion.div>
  );
};

export default StepFour;
