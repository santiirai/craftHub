import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegisterModal from '../components/RegisterModal';
import SignInModal from '../components/SignInModal';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('khalti');
  
  // Authentication state
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const isAuth = token && user;
    console.log('Authentication check:', { token: !!token, user: !!user, isAuth });
    return isAuth;
  };

  // Authentication handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful, setting user:', data.user);
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setIsSignInModalOpen(false);
        setLoginForm({ email: '', password: '' });
        fetchData(); // Refresh data with authentication
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
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password
        })
      });

      const data = await response.json();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCart([]);
    setOrders([]);
  };

  // Verify user token and get user data
  const verifyUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:8000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Token is invalid, remove it
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    const initializeData = async () => {
      await verifyUser();
      fetchData();
    };
    initializeData();
  }, []);

  // Refetch data when user state changes
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      
      // Always fetch products (no auth required)
      const productsRes = await fetch('http://localhost:8000/api/products');
      const productsData = await productsRes.json();
      setProducts(productsData);
      
      // Only fetch authenticated data if user is authenticated
      if (token && user) {
        try {
          const [ordersRes, cartRes, wishlistRes] = await Promise.all([
            fetch('http://localhost:8000/api/transactions/user', { headers }),
            fetch('http://localhost:8000/api/cart', { headers }),
            fetch('http://localhost:8000/api/wishlist', { headers })
          ]);

          const ordersData = await ordersRes.json();
          const cartData = await cartRes.json();
          const wishlistData = await wishlistRes.json();

          setOrders(ordersData);
          
          // Convert cart data to match frontend format
          const cartItems = cartData.items?.map(item => ({
            _id: item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            image: item.productId.image,
            quantity: item.quantity
          })) || [];
          
          // Convert wishlist data to match frontend format
          const wishlistItems = wishlistData.items?.map(item => ({
            _id: item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            image: item.productId.image
          })) || [];
          
          setCart(cartItems);
          setWishlist(wishlistItems);
        } catch (authError) {
          console.error('Error fetching authenticated data:', authError);
          // If auth fails, clear user data
          setCart([]);
          setWishlist([]);
          setOrders([]);
        }
      } else {
        // User not authenticated, clear cart and wishlist
        setCart([]);
        setWishlist([]);
        setOrders([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    console.log('Add to cart called for product:', product.title);
    if (!isAuthenticated()) {
      console.log('User not authenticated, showing sign-in modal');
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
        console.log('User authenticated, adding to cart');
        fetchData(); // Refresh data from backend
      } else {
        alert('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  const addToWishlist = async (product) => {
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
        fetchData(); // Refresh data
      } else {
        alert('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/wishlist/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        fetchData(); // Refresh data
      } else {
        alert('Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      alert('Failed to remove from wishlist');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        fetchData(); // Refresh data from backend
      } else {
        alert('Failed to remove from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove from cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch('http://localhost:8000/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId,
          quantity
        })
      });
      
      if (response.ok) {
        fetchData(); // Refresh data from backend
      } else {
        alert('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      setIsSignInModalOpen(true);
      return;
    }
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          products: cart.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.price
          })),
          totalAmount: getCartTotal(),
          paymentMethod: selectedPaymentMethod,
          paymentStatus: 'Completed'
        })
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setShowPaymentModal(false);
        fetchData(); // Refresh data
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductGrid products={products} onAddToCart={addToCart} onAddToWishlist={addToWishlist} />;
      case 'cart':
        return (
          <CartView 
            cart={cart} 
            onRemove={removeFromCart} 
            onUpdateQuantity={updateQuantity}
            onCheckout={handleCheckout}
            total={getCartTotal()}
          />
        );
      case 'wishlist':
        return <WishlistView wishlist={wishlist} onRemoveFromWishlist={removeFromWishlist} onAddToCart={addToCart} />;
      case 'orders':
        return <OrderHistory orders={orders} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user}
        onLogout={handleLogout}
        setIsSignInModalOpen={setIsSignInModalOpen}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user ? user.name : 'Guest'}!
          </h1>
          <p className="text-gray-600">Manage your products, cart, wishlist, and orders all in one place.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'products', label: 'All Products', icon: 'fas fa-box' },
              { id: 'cart', label: `Cart (${cart.length})`, icon: 'fas fa-shopping-cart' },
              { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: 'fas fa-heart' },
              { id: 'orders', label: 'My Orders', icon: 'fas fa-list' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        {renderContent()}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Complete Payment</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Total Amount: ${getCartTotal().toFixed(2)}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="khalti">Khalti</option>
                <option value="esewa">eSewa</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      
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
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
              >
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
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}

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
    </div>
  );
}

// Enhanced ProductGrid Component with landing page styling
function ProductGrid({ products, onAddToCart, onAddToWishlist }) {
  const [localWishlist, setLocalWishlist] = useState([]);
  const [localCart, setLocalCart] = useState([]);

  const handleAddToWishlist = (product) => {
    if (localWishlist.includes(product._id)) {
      alert("This product is already in your wishlist.");
      return;
    }
    setLocalWishlist([...localWishlist, product._id]);
    onAddToWishlist(product);
  };

  const handleAddToCart = (product) => {
    if (localCart.includes(product._id)) {
      alert("This product is already in your cart.");
      return;
    }
    setLocalCart([...localCart, product._id]);
    onAddToCart(product);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    const halfStar = (rating || 0) % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-yellow-400 text-sm"></i>);
    }
    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-400 text-sm"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-yellow-400 text-sm"></i>);
    }
    return stars;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">All Products</h2>
        <div className="text-sm font-medium text-gray-700">
          Showing {products.length} products
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-48 overflow-hidden relative group">
              <img
                src={product.image || 'https://via.placeholder.com/300x200'}
                alt={product.title}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <button
                onClick={() => handleAddToWishlist(product)}
                className={`absolute top-2 right-2 p-2 rounded-full shadow transition-colors text-sm ${
                  localWishlist.includes(product._id)
                    ? "bg-red-100 text-red-500"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-red-500"
                }`}
                aria-label="Add to wishlist"
              >
                <i className={localWishlist.includes(product._id) ? "fas fa-heart" : "far fa-heart"}></i>
              </button>
            </div>
            <div className="p-4">
              <div className="text-xs text-indigo-600 font-semibold mb-1">{product.category || 'Crafts'}</div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">{product.title}</h3>
              <div className="flex items-center mb-2">
                <div className="flex mr-2">{renderStars(product.rating)}</div>
                <span className="text-xs text-gray-500">({product.rating || 0})</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-gray-900">${product.price?.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-medium text-white transition ${
                    localCart.includes(product._id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  disabled={localCart.includes(product._id)}
                  aria-label="Add to cart"
                >
                  {localCart.includes(product._id) ? "In Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cart View Component with Table
function CartView({ cart, onRemove, onUpdateQuantity, onCheckout, total }) {
  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-shopping-cart text-4xl text-gray-400 mb-4"></i>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Shopping Cart</h2>
        <div className="text-sm font-medium text-gray-700">
          {cart.length} items
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cart.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={item.image || 'https://via.placeholder.com/60x60'} 
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.price?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600 hover:text-gray-800"
                      >
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      <span className="w-12 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600 hover:text-gray-800"
                      >
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity)?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onRemove(item._id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Remove from cart"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Total ({cart.length} items):
            </div>
            <div className="text-2xl font-bold text-indigo-600">
              ${total.toFixed(2)}
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={onCheckout}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <i className="fas fa-credit-card mr-2"></i>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Wishlist View Component with Table
function WishlistView({ wishlist, onRemoveFromWishlist, onAddToCart }) {
  const [localCart, setLocalCart] = useState([]);

  const handleAddToCart = (product) => {
    if (localCart.includes(product._id)) {
      alert("This product is already in your cart.");
      return;
    }
    setLocalCart([...localCart, product._id]);
    onAddToCart(product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-heart text-4xl text-gray-400 mb-4"></i>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
        <p className="text-gray-600">Add some products to your wishlist!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">My Wishlist</h2>
        <div className="text-sm font-medium text-gray-700">
          {wishlist.length} items
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wishlist.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={product.image || 'https://via.placeholder.com/60x60'} 
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {product.category || 'Crafts'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${product.price?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      localCart.includes(product._id)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {localCart.includes(product._id) ? 'In Cart' : 'Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={localCart.includes(product._id)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          localCart.includes(product._id)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                        title={localCart.includes(product._id) ? 'Already in cart' : 'Add to cart'}
                      >
                        <i className="fas fa-shopping-cart mr-1"></i>
                        {localCart.includes(product._id) ? 'In Cart' : 'Add to Cart'}
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(product._id)}
                        className="px-3 py-1 text-red-600 hover:text-red-800 border border-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Remove from wishlist"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Enhanced Order History Component with Table
function OrderHistory({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-list text-4xl text-gray-400 mb-4"></i>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-600">Start shopping to see your order history!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">My Orders</h2>
        <div className="text-sm font-medium text-gray-700">
          {orders.length} orders
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {order.products?.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                          <img 
                            src={item.productId?.image || 'https://via.placeholder.com/40x40'} 
                            alt={item.productId?.title || 'Product'}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {item.productId?.title || 'Product'}
                            </div>
                            <div className="text-xs text-gray-500">
                              Qty: {item.quantity} × ${item.price?.toFixed(2)}
                            </div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            ${(item.quantity * item.price)?.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-indigo-600">
                      ${order.totalAmount?.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.products?.length || 0} items
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      <i className={`fas fa-circle mr-1 ${
                        order.paymentStatus === 'Completed' ? 'text-green-500' :
                        order.paymentStatus === 'Pending' ? 'text-yellow-500' :
                        'text-red-500'
                      }`}></i>
                      {order.paymentStatus || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">
                      {order.paymentMethod || 'Not specified'}
                    </div>
                    <button
                      className="text-xs text-indigo-600 hover:text-indigo-800 mt-1"
                      onClick={() => {
                        // Show detailed order view
                        const orderDetails = `Order Details:
Order ID: ${order._id}
Date: ${new Date(order.createdAt).toLocaleDateString()}
Time: ${new Date(order.createdAt).toLocaleTimeString()}
Total: $${order.totalAmount?.toFixed(2) || '0.00'}
Status: ${order.paymentStatus || 'Unknown'}
Method: ${order.paymentMethod || 'Not specified'}
Items: ${order.products?.length || 0}`;
                        alert(orderDetails);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}