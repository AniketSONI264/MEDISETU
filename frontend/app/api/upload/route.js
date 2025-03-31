import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import formidable from "formidable";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  const form = formidable();
  const [fields, files] = await form.parse(req);
  const file = files.image?.filepath;

  if (!file) return NextResponse.json({ message: "No file provided" }, { status: 400 });

  try {
    const result = await cloudinary.uploader.upload(file);
    return NextResponse.json({ imageUrl: result.secure_url });
  } catch (error) {
    return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 });
  }
};
