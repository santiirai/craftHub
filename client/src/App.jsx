import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import ClientDashboard from './pages/ClientDashboard';
// Import AdminDashboard from the admin build output or as a placeholder
// If you have a build process that exposes admin dashboard to client, import it here:
import AdminDashboard from '../../admin/pages/adminDashboard.jsx';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for token and fetch user profile
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8000/api/users/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(userData => {
          if (userData) {
            setUser(userData);
            setCurrentPage(userData.role === 'admin' ? 'adminDashboard' : 'dashboard');
          } else {
            setUser(null);
            setCurrentPage('landing');
          }
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setCurrentPage('landing');
          setLoading(false);
        });
    } else {
      setUser(null);
      setCurrentPage('landing');
      setLoading(false);
    }
  }, []);

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  // Auto-remove notifications after 3 seconds
  useEffect(() => {
    if (notifications.length === 0) return;

    const timers = notifications.map(notification =>
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 3000)
    );
    // Cleanup timers if component unmounts or notifications change
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications]);

  const handleAddToCart = (productName) => {
    setCartCount(prev => prev + 1);
    addNotification(`${productName} added to cart`, "success");
  };

  const handleAddToWishlist = (productName) => {
    setWishlistCount(prev => prev + 1);
    addNotification(`${productName} added to wishlist`, "success");
  };

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === 'admin') {
      setCurrentPage('adminDashboard');
    } else {
      setCurrentPage('dashboard');
    }
    addNotification('Successfully logged in!', 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
    localStorage.removeItem('token');
    addNotification('Successfully logged out!', 'success');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'adminDashboard':
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      case 'dashboard':
        return <ClientDashboard user={user} onLogout={handleLogout} />;
      case 'landing':
      default:
        return (
          <LandingPage
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            onLogin={handleLogin}
            onLogout={handleLogout}
            user={user}
          />
        );
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
    <div className="App">
      {renderPage()}

      <div className="fixed top-5 right-5 space-y-2 z-50">
        {notifications.map(({ id, message, type }) => (
          <div key={id} className={`px-4 py-2 rounded text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;