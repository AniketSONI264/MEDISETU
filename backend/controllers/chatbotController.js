import { processMessage } from "../services/chatbotService.js";
import logger from "../utils/logger.js";

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?._id; // Get userId if user is authenticated

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await processMessage(message, userId);

    logger.info("Chatbot response generated", {
      message,
      userId,
      response,
    });

    res.status(200).json({ response });
  } catch (error) {
    logger.error("Error in handleChatMessage", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Failed to process message" });
  }
}; 