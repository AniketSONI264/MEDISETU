"use client";

import { useState } from "react";
import { Upload, Camera } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function AvatarUpload({ avatar, setAvatar }) {
  const { data: session, update } = useSession();
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAvatar(URL.createObjectURL(selectedFile));
    }
  };

  // Upload image to Cloudinary
  // const handleUpload = async () => {
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const res = await axios.post(`/api/upload/${session?.user?._id}`, formData);

  //     setAvatar(res.data.imageUrl);
  //     await update({ user: { ...session.user, profileImage: res.data.imageUrl } });

  //     toast.success("Profile picture updated!");
  //   } catch (error) {
  //     console.error("Upload failed", error);
  //     toast.error("Failed to upload image.");
  //   }
  // };
  const handleUpload = async () => {
    if (!file) return;
    if (!session?.user?._id) {
      toast.error("User not found!");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", file); // MUST MATCH multer.single("image") in backend
  
    try {
      const res = await axios.post(`/api/upload/${session.user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setAvatar(res.data.imageUrl); // Update UI
      await update({ user: { ...session.user, profilePic: res.data.imageUrl } }); // Update NextAuth session
  
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload image.");
    }
  };
  

  return (
    <div className="flex flex-col items-center mt-6">
      <label htmlFor="file-upload" className="relative cursor-pointer">
        <Image src={avatar} alt="Avatar" width={100} height={100} className="rounded-full border-4 border-gray-300" />
        <Camera className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md w-6 h-6" />
      </label>
      <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
      <button onClick={handleUpload} className="mt-2 text-sm text-teal-500">
        Upload
      </button>
    </div>
  );
}
