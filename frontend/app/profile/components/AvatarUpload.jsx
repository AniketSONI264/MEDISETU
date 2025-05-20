"use client";

import { useState } from "react";
import { Upload, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import { uploadAvatar } from "../../../utils/api";
import toast from "react-hot-toast";

export default function AvatarUpload({ avatar, setAvatar }) {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    if (!user?._id) {
      toast.error("User not found!");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadAvatar(formData, user._id);
      setAvatar(response.data.imageUrl);
      setPreviewUrl(null);
      setFile(null);
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error(error.response?.data?.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="relative group">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="relative">
            <Image
              src={previewUrl || avatar || "/MediSetu_Logo_B100.svg"}
              alt="Avatar"
              width={120}
              height={120}
              className="rounded-full border-4 border-gray-300 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {file && (
        <div className="mt-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </>
            )}
          </button>
          <button
            onClick={handleCancel}
            className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
