import React from 'react';

const Header = ({
  toggleSidebar,
  profileDropdownOpen,
  setProfileDropdownOpen,
  notificationsOpen,
  setNotificationsOpen,
}) => {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 md:hidden text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Button */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="text-gray-600 hover:text-gray-900 cursor-pointer relative"
          >
            <i className="fas fa-bell text-xl"></i>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              3
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium text-gray-800">New order received</p>
                  <p className="text-xs text-gray-500">10 minutes ago</p>
                </div>
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium text-gray-800">New user registered</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium text-gray-800">Product inventory low</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="p-2 border-t border-gray-200">
                <button className="text-xs text-indigo-600 hover:text-indigo-800 w-full text-center">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              <span className="text-sm font-medium">JD</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">John Doe</span>
            <i className="fas fa-chevron-down text-xs text-gray-500"></i>
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <div className="py-1">
                <a
                  href="#profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a
                  href="#settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <div className="border-t border-gray-100"></div>
                <a
                  href="#logout"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
