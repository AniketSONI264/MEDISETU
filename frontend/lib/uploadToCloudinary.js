// lib/uploadToCloudinary.js
export const uploadToCloudinary = async (file, preset = "doctor_profiles") => {
    const cloudName = "dr10kpkc4";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.error?.message || "Upload failed");
      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      throw err;
    }
  };
  