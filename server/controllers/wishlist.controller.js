import Wishlist from "../models/wishlist.model.js";
import Product from "../models/product.model.js";

// Get user's wishlist
export const getUserWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('items.productId');
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.user.id, items: [] });
    }
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.user.id, items: [] });
    }
    
    // Check if item already exists in wishlist
    const existingItem = wishlist.items.find(item => item.productId.toString() === productId);
    
    if (existingItem) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }
    
    wishlist.items.push({ productId });
    await wishlist.save();
    await wishlist.populate('items.productId');
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    
    wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);
    await wishlist.save();
    await wishlist.populate('items.productId');
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear wishlist
export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    
    wishlist.items = [];
    await wishlist.save();
    
    res.json({ message: "Wishlist cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 