import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDb.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import messageRoutes from "./routes/message.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

dotenv.config();
connectDB();

const app = express();

// Define allowed origins for CORS (your frontend URL)
const allowedOrigins = ["http://localhost:5174", "http://localhost:5173"];

// CORS middleware with proper config for credentials
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman, curl, or same-origin requests without Origin header
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, origin); // Echo the origin - IMPORTANT for credentials:true
    }
    return callback(new Error("CORS Error: Not allowed by CORS"), false);
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// Enable preflight requests for all routes
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, origin);
    }
    return callback(new Error("CORS Error: Not allowed by CORS"), false);
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser middleware
app.use(express.json());

// IMPORTANT: Make sure you *do NOT* manually set CORS headers inside other middleware (like authMiddleware).
// Remove any `res.setHeader('Access-Control-Allow-Origin', ...)` or `res.setHeader('Access-Control-Allow-Credentials', ...)` calls there.
// The cors() middleware handles these headers properly and consistently.

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
