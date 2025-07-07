import express from "express";
import { 
  getUserWishlist, 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist 
} from "../controllers/wishlist.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();



// All routes require authentication
router.use(authMiddleware);

router.get("/", getUserWishlist);
router.post("/add", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);
router.delete("/clear", clearWishlist);

export default router; 