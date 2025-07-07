import React, { useState, useRef, useEffect } from "react";

export default function Header({
  searchQuery,
  setSearchQuery,
  wishlistCount,
  cartCount,
  isCartOpen,
  setIsCartOpen,
  setIsSignInModalOpen,
  setIsRegisterModalOpen,
  user,
  onLogout
}) {
  // Add state for categories panel
  const [showCategories, setShowCategories] = useState(false);
  const categoriesRef = useRef(null);

  // Close panel on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    }
    if (showCategories) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCategories]);

  // Category data
  const categories = [
    {
      name: "Oil Painting",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sketch",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Crochet",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Knitting",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Kitchen Crafts",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Paper Art",
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Jewelry Making",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Embroidery",
      image:
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-indigo-600 flex items-center space-x-2">
          <i className="fas fa-paint-brush"></i>
          <span>CraftHub</span>
        </a>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-8">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for DIY kits, craft supplies..."
              className="w-full py-2.5 pl-4 pr-10 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        {/* Icons + Auth Buttons */}
        <div className="flex items-center space-x-4">
          {/* Wishlist */}
          <button className="relative text-gray-700 hover:text-indigo-600">
            <i className="fas fa-heart text-xl"></i>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            className="relative text-gray-700 hover:text-indigo-600"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <i className="fas fa-shopping-cart text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <>
              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                  <i className="fas fa-user-circle text-xl"></i>
                  <span className="text-sm font-medium">{user.name}</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-tachometer-alt mr-2"></i>
                    Dashboard
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-user mr-2"></i>
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-list mr-2"></i>
                    Orders
                  </a>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Sign In */}
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                onClick={() => setIsSignInModalOpen(true)}
              >
                Sign In
              </button>

              {/* Register */}
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-inner relative">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center space-x-6 py-3 overflow-x-auto scrollbar-hide text-sm font-medium">
            <li className="relative whitespace-nowrap hover:text-indigo-200 cursor-pointer select-none" ref={categoriesRef}>
              <button
                onClick={() => setShowCategories((prev) => !prev)}
                className="flex items-center focus:outline-none"
              >
                <span>Categories</span>
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              {showCategories && (
                <>
                  {/* Backdrop for clarity on mobile/desktop */}
                  <div className="fixed inset-0 z-[9998]" style={{pointerEvents: 'none'}}></div>
                  <div className="fixed left-1/2 top-[80px] -translate-x-1/2 w-[600px] max-w-[90vw] bg-white text-gray-900 rounded-xl shadow-2xl z-[9999] p-6 animate-fade-in border border-gray-100">
                    <h4 className="text-lg font-bold mb-4 text-indigo-700">Explore Categories</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {categories.map((cat) => (
                        <div
                          key={cat.name}
                          className="flex flex-col items-center bg-gray-50 rounded-lg p-3 hover:bg-indigo-50 transition cursor-pointer group"
                        >
                          <div className="w-20 h-20 rounded-full overflow-hidden mb-2 shadow group-hover:shadow-lg">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <span className="font-medium text-sm text-gray-800 group-hover:text-indigo-700">
                            {cat.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </li>
            <li className="whitespace-nowrap hover:text-indigo-200 cursor-pointer">
              <a href="#">Featured Collections</a>
            </li>
            <li className="whitespace-nowrap hover:text-indigo-200 cursor-pointer">
              <a href="#">New Arrivals</a>
            </li>
            <li className="whitespace-nowrap hover:text-indigo-200 cursor-pointer">
              <a href="#">Deals</a>
            </li>
            <li className="whitespace-nowrap hover:text-indigo-200 cursor-pointer">
              <a href="#">DIY Guides</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}