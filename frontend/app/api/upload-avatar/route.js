import { NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";
import User from "@/models/userModel";
import { getSession } from "next-auth/react";

// Cloudinary Upload API Route
export async function POST(req) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json({ message: "No image uploaded" }, { status: 400 });
    }

    // Check if the user has an existing image & delete it
    const user = await User.findById(session.user.id);
    if (user.profileImage) {
      const oldPublicId = user.profileImage.split("/").pop().split(".")[0]; // Extract Cloudinary public_id
      await cloudinary.uploader.destroy(oldPublicId);
    }

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile, {
      folder: "MediSetu/avatars",
    });

    // Update user profile in the database
    user.profileImage = result.secure_url;
    await user.save();

    return NextResponse.json({ imageUrl: result.secure_url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 });
  }
}
