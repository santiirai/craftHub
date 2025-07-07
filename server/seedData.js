import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model.js';
import User from './models/user.model.js';

dotenv.config();

const sampleProducts = [
  {
    title: "DIY Candle Making Kit",
    description: "Complete kit for making beautiful scented candles at home",
    price: 29.99,
    stock: 50,
    category: "DIY Kits",
    image: "https://readdy.ai/api/search-image?query=Professional%20DIY%20candle%20making%20kit%20with%20natural%20soy%20wax%2C%20cotton%20wicks%2C%20essential%20oils%2C%20and%20colorful%20dyes%20arranged%20neatly%20in%20a%20wooden%20box%20with%20minimalist%20white%20background%2C%20product%20photography&width=400&height=300&seq=1&orientation=landscape",
    rating: 4.5,
    featured: true
  },
  {
    title: "Macramé Wall Hanging Kit",
    description: "Create beautiful wall art with this complete macramé kit",
    price: 24.99,
    stock: 30,
    category: "DIY Kits",
    image: "https://readdy.ai/api/search-image?query=Complete%20macrame%20wall%20hanging%20kit%20with%20natural%20cotton%20rope%2C%20wooden%20dowel%2C%20and%20instruction%20booklet%20arranged%20aesthetically%20on%20clean%20white%20background%2C20professional%20product%20photography&width=400&height=300&seq=2&orientation=landscape",
    rating: 4.7,
    featured: true
  },
  {
    title: "Premium Watercolor Set",
    description: "Professional watercolor paints with 24 vibrant colors",
    price: 34.99,
    stock: 25,
    category: "Art Supplies",
    image: "https://readdy.ai/api/search-image?query=High-quality%20watercolor%20paint%20set%20with%2024%20vibrant%20colors%2C%20professional%20brushes%2C%20and%20mixing%20palette%20arranged%20neatly%20on%20white%20background%2C%20artistic%20product%20photography&width=400&height=300&seq=3&orientation=landscape",
    rating: 4.8,
    featured: true
  },
  {
    title: "Pottery Wheel Starter Kit",
    description: "Begin your pottery journey with this complete starter kit",
    price: 89.99,
    stock: 15,
    category: "DIY Kits",
    image: "https://readdy.ai/api/search-image?query=Complete%20pottery%20wheel%20starter%20kit%20with%20clay%2C%20tools%2C%20and%20mini%20electric%20wheel%20displayed%20professionally%20on%20clean%20white%20background%2C%20product%20photography%20for%20crafts&width=400&height=300&seq=4&orientation=landscape",
    rating: 4.3,
    featured: true
  },
  {
    title: "Embroidery Beginner Set",
    description: "Perfect starter kit for embroidery enthusiasts",
    price: 19.99,
    stock: 40,
    category: "Needlework",
    image: "https://readdy.ai/api/search-image?query=Embroidery%20starter%20kit%20with%20colorful%20threads%2C%20hoops%2C%20needles%2C%20and%20pattern%20templates%20neatly%20arranged%20on%20white%20background%2C%20craft%20supply%20product%20photography&width=400&height=300&seq=5&orientation=landscape",
    rating: 4.6,
    featured: true
  },
  {
    title: "Resin Art Starter Kit",
    description: "Create stunning resin art pieces with this complete kit",
    price: 39.99,
    stock: 20,
    category: "DIY Kits",
    image: "https://readdy.ai/api/search-image?query=Complete%20resin%20art%20starter%20kit%20with%20epoxy%20resin%2C%20silicone%20molds%2C%20colorful%20pigments%2C%20and%20tools%20arranged%20professionally%20on%20white%20background%2C%20craft%20supply%20product%20photography&width=400&height=300&seq=6&orientation=landscape",
    rating: 4.4,
    featured: true
  },
  {
    title: "Premium Acrylic Paint Set",
    description: "Professional acrylic paints with 24 vibrant colors",
    price: 27.99,
    stock: 35,
    category: "Art Supplies",
    image: "https://readdy.ai/api/search-image?query=Professional%20acrylic%20paint%20set%20with%2024%20vibrant%20colors%20in%20tubes%2C%20arranged%20neatly%20with%20paintbrushes%20on%20clean%20white%20background%2C%20art%20supply%20product%20photography&width=400&height=300&seq=7&orientation=landscape",
    rating: 4.9,
    featured: true
  },
  {
    title: "Leather Crafting Kit",
    description: "Complete leather crafting kit for beginners",
    price: 49.99,
    stock: 18,
    category: "DIY Kits",
    image: "https://readdy.ai/api/search-image?query=Comprehensive%20leather%20crafting%20kit%20with%20genuine%20leather%20pieces%2C%20tools%2C%20thread%2C%20and%20patterns%20arranged%20professionally%20on%20white%20background%2C%20craft%20supply%20product%20photography&width=400&height=300&seq=8&orientation=landscape",
    rating: 4.2,
    featured: true
  },
  {
    title: "Jewelry Making Kit",
    description: "Create beautiful jewelry with this comprehensive kit",
    price: 32.99,
    stock: 28,
    category: "Jewelry Making",
    image: "https://readdy.ai/api/search-image?query=Jewelry%20making%20kit%20with%20beads%2C%20wire%2C%20pliers%2C%20and%20findings%20arranged%20professionally%20on%20white%20background%2C%20craft%20supply%20product%20photography&width=400&height=300&seq=9&orientation=landscape",
    rating: 4.5,
    featured: false
  },
  {
    title: "Paper Quilling Kit",
    description: "Learn the art of paper quilling with this starter kit",
    price: 15.99,
    stock: 45,
    category: "Paper Crafts",
    image: "https://readdy.ai/api/search-image?query=Paper%20quilling%20kit%20with%20colored%20paper%20strips%2C%20tools%2C%20and%20patterns%20arranged%20neatly%20on%20white%20background%2C%20craft%20supply%20product%20photography&width=400&height=300&seq=10&orientation=landscape",
    rating: 4.3,
    featured: false
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 