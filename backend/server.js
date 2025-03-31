import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: `http://localhost:3000`,credentials:true}));
// console.log(process.env.FRONTEND_URL)
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload",uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`${process.env.NODE_ENV}:`+" "+`http://localhost:${PORT}`));
