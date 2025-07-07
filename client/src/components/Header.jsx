import React from "react";

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
      <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center space-x-6 py-3 overflow-x-auto scrollbar-hide text-sm font-medium">
            <li className="whitespace-nowrap hover:text-indigo-200 cursor-pointer">
              <a href="#" className="flex items-center">
                <span>Categories</span>
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
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