
// // server.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";

// // Routes
// import authRoutes from "./routes/authRoutes.js";
// import doctorAuthRoutes from "./routes/doctorRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import doctorUploadRoutes from "./routes/docImgUpload.js";
// import contactRoute from "./routes/contactRoute.js";
// import fetchAll from "./routes/fetchEveryone.js";
// import appointmentRoutes from "./routes/appointmentRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from "./routes/admin.js";                // ✅ General Admin APIs
// import blogAdminRoutes from "./routes/admin/adminBlogRoutes.js"; // ✅ Admin Blog CRUD APIs

// // 🔌 Load .env and DB
// dotenv.config();
// connectDB();

// const app = express();

// // 🔧 Global Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );
// app.use(express.urlencoded({ extended: true })); // parses form data

// // 🔥 Welcome Route
// app.get("/", (req, res) => {
//   res.status(200).json("🌐 Welcome to MEDISETU Backend API.");
// });

// // 📦 API ROUTES
// app.use("/api/auth", authRoutes);                  // User Auth
// app.use("/api/doctor/auth", doctorAuthRoutes);     // Doctor Auth
// app.use("/api/upload", uploadRoutes);              // User Uploads
// app.use("/api/doctor/upload", doctorUploadRoutes); // Doctor Uploads
// app.use("/api/contact-us", contactRoute);          // Contact Form
// app.use("/api", fetchAll);                         // Public Data
// app.use("/api/appointments", appointmentRoutes);   // Appointments
// app.use("/api/user", userRoutes);                  // User Actions
// app.use("/api/admin", adminRoutes);                // General Admin Routes
// app.use("/api/admin/blogs", blogAdminRoutes);      // 📝 Blog CRUD for Admin

// // 🔥 Error Handler
// app.use((err, req, res, next) => {
//   console.error("💥 SERVER ERROR:", err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something broke on the server. Please try again later.",
//   });
// });

// // 🟢 Server Bootup
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`🔥 Server running on: http://localhost:${PORT} (${process.env.NODE_ENV})`)
// );






// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import doctorAuthRoutes from "./routes/doctorRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import doctorUploadRoutes from "./routes/docImgUpload.js";
import contactRoute from "./routes/contactRoute.js";
import fetchAll from "./routes/fetchEveryone.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/admin.js";
import blogAdminRoutes from "./routes/admin/adminBlogRoutes.js";

// 🔌 Load env variables & connect DB
dotenv.config();
connectDB();

const app = express();

// ✅ ALLOWED ORIGINS WHITELIST
const allowedOrigins = [
  "http://localhost:3000",
  "https://medisetu.vercel.app",
  "https://medisetu-ll2duvl46-aniketsoni264s-projects.vercel.app",
];

// ✅ CORS OPTIONS FUNCTION
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("⛔ Not allowed by CORS"));
    }
  },
  credentials: true,
};

// 🔧 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// 🔥 Welcome Route
app.get("/", (req, res) => {
  res.status(200).json("🌐 Welcome to MEDISETU Backend API.");
});

// 📦 API ROUTES
app.use("/api/auth", authRoutes);                  // User Auth
app.use("/api/doctor/auth", doctorAuthRoutes);     // Doctor Auth
app.use("/api/upload", uploadRoutes);              // User Uploads
app.use("/api/doctor/upload", doctorUploadRoutes); // Doctor Uploads
app.use("/api/contact-us", contactRoute);          // Contact Form
app.use("/api", fetchAll);                         // Public Data
app.use("/api/appointments", appointmentRoutes);   // Appointments
app.use("/api/user", userRoutes);                  // User Actions
app.use("/api/admin", adminRoutes);                // Admin Routes
app.use("/api/admin/blogs", blogAdminRoutes);      // Admin Blog CRUD

// 🔥 Error Handler
app.use((err, req, res, next) => {
  console.error("💥 SERVER ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something broke on the server. Please try again later.",
  });
});

// 🟢 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on: http://localhost:${PORT} (${process.env.NODE_ENV})`)
);
