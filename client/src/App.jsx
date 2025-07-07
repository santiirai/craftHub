import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import ClientDashboard from './pages/ClientDashboard';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);

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
    setCurrentPage('dashboard');
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
      case 'dashboard':
        return <ClientDashboard />;
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