import express from "express";
import {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get("/", getUserCart);
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/remove/:productId", removeFromCart);
router.delete("/clear", clearCart);

export default router;
