import express from "express";
import {
  getUserTransactions,
  getAllTransactions,
  updateDeliveryStatus,
  createTransaction,
} from "../controllers/transaction.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/user", authMiddleware, getUserTransactions);
router.get("/", authMiddleware, getAllTransactions); // Admin only
router.post("/", authMiddleware, createTransaction);
router.put("/:id", authMiddleware, updateDeliveryStatus); // Admin only

export default router;