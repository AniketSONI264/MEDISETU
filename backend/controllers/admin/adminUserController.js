// controllers/admin/adminUserController.js
import User from "../../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-password");
      // .select("_id firstName lastName email profilePic createdAt phone address gender");

    // Optional: format response to include fullName or fallback avatar
    const formattedUsers = users.map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone:user.phone || " ",
      address:user.address || " ",
      gender:user.gender || "Male",
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      role: user.role,
    }));
    // console.log("🚀 All Users:", formattedUsers);
    res.status(200).json({
      success: true,
      total: formattedUsers.length,
      users: formattedUsers,
    });
  } catch (err) {
    console.error("💥 SERVER ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch users",
    });
  }
};
