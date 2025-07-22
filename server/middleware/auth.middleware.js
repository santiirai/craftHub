import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Ensure decoded contains id and isAdmin (or set defaults)
    req.user = {
      id: decoded.id,
      isAdmin: decoded.isAdmin || false, // default false if missing
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}
