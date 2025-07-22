import express from "express";
import { getUserProfile, updateUserProfile, getAllUsers, updateUser, deleteUser } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

// Admin-only user management endpoints
router.get("/", authMiddleware, getAllUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
// Add update user role route
router.put("/:id/role", authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });
  try {
    const user = await import("../models/user.model.js").then(m => m.default.findById(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = req.body.role;
    user.isAdmin = req.body.role === "admin";
    await user.save();
    res.json({ message: "User role updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;

