"use client";
import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import axios from "axios";

export default function AvatarUploader({ avatar, onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(avatar);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await axios.post("/api/upload-avatar", formData);
      onUploadSuccess(res.data.imageUrl);
    } catch (error) {
      console.error("Image Upload Failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="file-upload" className="relative cursor-pointer">
        <Image src={preview} alt="Avatar" width={100} height={100} className="rounded-full border-4 border-gray-300" />
        <Upload className="absolute top-0 right-0 bg-white p-1 rounded-full shadow-md w-6 h-6" />
      </label>
      <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
      <button onClick={handleUpload} className="mt-2 text-sm text-teal-500">
        Upload
      </button>
    </div>
  );
}
