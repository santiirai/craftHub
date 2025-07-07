import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import NewArrivals from "../components/NewArrivals";
import Guides from "../components/Guides";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import CartPanel from "../components/CartPanel";
import Header from "../components/Header"; // Import your updated Header

export default function LandingPage({
  onAddToCart,
  onAddToWishlist,
  cartCount,
  wishlistCount,
  onLogin,
  onLogout,
  user,
}) {
  // Check if user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem('token') && user;
  };

  // Wrapper functions that check authentication
  const handleAddToCart = async (product) => {
    if (!isAuthenticated()) {
      setIsSignInModalOpen(true);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId: product._id || product.id,
          quantity: 1
        })
      });
      
      if (response.ok) {
        alert('Added to cart successfully!');
        if (onAddToCart) {
          onAddToCart(product);
        }
      } else {
        alert('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  const handleAddToWishlist = async (product) => {
    if (!isAuthenticated()) {
      setIsSignInModalOpen(true);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId: product._id || product.id
        })
      });
      
      if (response.ok) {
        alert('Added to wishlist successfully!');
        if (onAddToWishlist) {
          onAddToWishlist(product);
        }
      } else {
        alert('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add to wishlist');
    }
  };

  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Cart data
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", image: "/img/product1.jpg", category: "Category 1", price: 25.99, quantity: 1 },
    { id: 2, name: "Product 2", image: "/img/product2.jpg", category: "Category 2", price: 14.99, quantity: 2 },
  ]);

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };


  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(items =>
      items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting login with:', loginForm);
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLogin(data.user);
        setIsSignInModalOpen(false);
        setLoginForm({ email: '', password: '' });
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your connection and try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      console.log('Attempting registration with:', registerForm);
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password
        })
      });

      console.log('Registration response status:', response.status);
      const data = await response.json();
      console.log('Registration response data:', data);

      if (response.ok) {
        alert('Registration successful! Please sign in.');
        setIsRegisterModalOpen(false);
        setIsSignInModalOpen(true);
        setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please check your connection and try again.');
    }
  };

  return (
    <div>
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        setIsSignInModalOpen={setIsSignInModalOpen}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
        user={user}
        onLogout={onLogout}
      />

      {/* Debug info */}
      {/*<div className="bg-yellow-100 p-2 text-center text-sm">
        <p>Auth Status: {isAuthenticated() ? 'Authenticated' : 'Not Authenticated'}</p>
        <p>User: {user ? user.name : 'None'}</p>
        <p>Token: {localStorage.getItem('token') ? 'Present' : 'None'}</p>
      </div>*/}
      


      {/* Page sections */}
      <HeroSection />
      <Categories onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
      <FeaturedProducts onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
      <NewArrivals onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
      <Guides />
      <Testimonials />
      <Newsletter />
      <Footer />

      {/* Cart Panel */}
      <CartPanel
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onQuantityChange={handleQuantityChange}
      />

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
              <p className="text-gray-600">Join the CraftHub community</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <div>
                <label>
                  <input type="checkbox" required /> I agree to Terms of Service and Privacy Policy
                </label>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
                Create Account
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <button
                className="text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => {
                  setIsRegisterModalOpen(false);
                  setIsSignInModalOpen(true);
                }}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {isSignInModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsSignInModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
              <p className="text-gray-600">Welcome back to CraftHub</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="email" 
                placeholder="Email" 
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                required 
                className="w-full p-2 border rounded" 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                required 
                className="w-full p-2 border rounded" 
              />
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
                Sign In
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                className="text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => {
                  setIsSignInModalOpen(false);
                  setIsRegisterModalOpen(true);
                }}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
