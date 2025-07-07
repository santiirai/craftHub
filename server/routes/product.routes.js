import express from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, addProduct);        // Admin only - check inside controller
router.put("/:id", authMiddleware, updateProduct);   // Admin only
router.delete("/:id", authMiddleware, deleteProduct);// Admin only

export default router;
