import express from "express";
import { sendMessage, getUserMessages, replyMessage } from "../controllers/message.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/", authMiddleware, getUserMessages); // For users to get their messages

// Admin-only reply route (check in controller)
router.post("/reply/:messageId", authMiddleware, replyMessage);

export default router;
