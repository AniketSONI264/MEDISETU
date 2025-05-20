// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js"
// import cookieParser from "cookie-parser";
// import contactRoute from "./routes/contactRoute.js"
// dotenv.config();
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser())
// app.use(cors({origin: `http://localhost:3000`,credentials:true}));
// // console.log(process.env.FRONTEND_URL)
// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/upload",uploadRoutes);
// app.use("/api/contact-us",contactRoute);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`${process.env.NODE_ENV}:`+" "+`http://localhost:${PORT}`));





// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import doctorAuthRoutes from "./routes/doctorRoutes.js"; // 🆕 Doctor auth
// import uploadRoutes from "./routes/uploadRoutes.js";
// import doctorUploadRoutes from "./routes/docImgUpload.js"; // 🆕 Doctor image upload
// import cookieParser from "cookie-parser";
// import contactRoute from "./routes/contactRoute.js";
// import fetchAll from "./routes/fetchEveryone.js";
// import appointmentRoutes from "./routes/appointmentRoutes.js";
// import userRoutes from "./routes/userRoutes.js"; // Add user routes

// dotenv.config();
// connectDB();

// const app = express();

// // 🔧 Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );

// app.get("/", async (req,res)=>{
//   res.status(200).json("Welcome To MEDISETU...");
// })

// // 🚀 Routes
// app.use("/api/auth", authRoutes);                          // User Auth
// app.use("/api/doctor/auth", doctorAuthRoutes);             // 🆕 Doctor Auth
// app.use("/api/upload", uploadRoutes);                      // User Image Upload
// app.use("/api/doctor/upload", doctorUploadRoutes);         // 🆕 Doctor Image Upload
// app.use("/api/contact-us", contactRoute);                  // Contact Form
// app.use("/api",fetchAll);                                  // Fetch User & Doctor Route
// app.use("/api/appointments",appointmentRoutes);
// app.use("/api/user", userRoutes); // Add user routes
// // 🟢 Server Ready
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`${process.env.NODE_ENV}: http://localhost:${PORT}`)
// );


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
// import adminRoutes from "./routes/admin.js"; // ✅ NEW — admin panel APIs

// // 🔌 Load .env and DB
// dotenv.config();
// connectDB();

// const app = express();

// // 🔧 Global Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );

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
// app.use("/api", fetchAll);                         // Public User & Doctor Fetch
// app.use("/api/appointments", appointmentRoutes);   // Appointments
// app.use("/api/user", userRoutes);                  // User-specific actions
// app.use("/api/admin", adminRoutes);                // ✅ Admin routes

// // ✅ Fallback Error Handler (optional but recommended)
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
import adminRoutes from "./routes/admin.js";                // ✅ General Admin APIs
import blogAdminRoutes from "./routes/admin/adminBlogRoutes.js"; // ✅ Admin Blog CRUD APIs

// 🔌 Load .env and DB
dotenv.config();
connectDB();

const app = express();

// 🔧 Global Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true })); // parses form data

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
app.use("/api/admin", adminRoutes);                // General Admin Routes
app.use("/api/admin/blogs", blogAdminRoutes);      // 📝 Blog CRUD for Admin

// 🔥 Error Handler
app.use((err, req, res, next) => {
  console.error("💥 SERVER ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something broke on the server. Please try again later.",
  });
});

// 🟢 Server Bootup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on: http://localhost:${PORT} (${process.env.NODE_ENV})`)
);
