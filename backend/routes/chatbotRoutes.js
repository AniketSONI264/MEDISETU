import express from "express";
import { handleChatMessage } from "../controllers/chatbotController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route for basic queries
router.post("/", handleChatMessage);

// Protected route for user-specific queries
router.post("/user", protect, handleChatMessage);

export default router; 