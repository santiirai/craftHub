import React, { useState } from 'react';
import RecentActivities from '../components/RecentActivities';
import RecentProducts from '../components/RecentProducts';
import SalesChart from '../components/SalesChart';
import UserGrowthChart from '../components/UserGrowthChart';
import PopularProductsChart from '../components/PopularProductsChart';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Sidebar = ({ sidebarOpen, toggleSidebar, activeMenu, setActiveMenu }) => (
  <div
    className={`${
      sidebarOpen ? 'w-64' : 'w-20'
    } h-screen fixed left-0 bg-gray-800 text-white transition-all duration-300 z-10 flex flex-col`}
  >
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      {sidebarOpen ? (
        <div className="flex items-center space-x-2">
          <i className="fas fa-paint-brush text-indigo-400 text-xl"></i>
          <span className="font-bold text-xl">CraftHub</span>
        </div>
      ) : (
        <i className="fas fa-paint-brush text-indigo-400 text-xl mx-auto"></i>
      )}
      <button
        onClick={toggleSidebar}
        className="text-gray-400 hover:text-white cursor-pointer"
        aria-label="Toggle Sidebar"
      >
        <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
      </button>
    </div>

    <nav className="mt-6 flex-1">
      {[
        { id: 'dashboard', icon: 'fa-home', label: 'Dashboard' },
        { id: 'users', icon: 'fa-users', label: 'User Management' },
        { id: 'products', icon: 'fa-box', label: 'Products/Crafts' },
        { id: 'orders', icon: 'fa-shopping-cart', label: 'Orders' },
        { id: 'analytics', icon: 'fa-chart-line', label: 'Analytics' },
        { id: 'settings', icon: 'fa-cog', label: 'Settings' },
      ].map(({ id, icon, label }) => (
        <div
          key={id}
          className={`px-4 py-3 cursor-pointer flex items-center ${
            activeMenu === id ? 'bg-indigo-700' : 'hover:bg-gray-700'
          }`}
          onClick={() => setActiveMenu(id)}
          role="menuitem"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setActiveMenu(id)}
        >
          <i className={`fas ${icon} text-lg`}></i>
          {sidebarOpen && <span className="ml-4">{label}</span>}
        </div>
      ))}
    </nav>
  </div>
);

const Header = ({ toggleSidebar }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center fixed top-0 right-0 left-0 ml-0 md:ml-64 z-20 transition-all duration-300">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 md:hidden text-gray-600 hover:text-gray-900 cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="text-gray-600 hover:text-gray-900 cursor-pointer relative"
            aria-label="Toggle Notifications"
          >
            <i className="fas fa-bell text-xl"></i>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              3
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-30">
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

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center space-x-2 cursor-pointer"
            aria-label="Toggle Profile Menu"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              <span className="text-sm font-medium">JD</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">John Doe</span>
            <i className="fas fa-chevron-down text-xs text-gray-500"></i>
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-30">
              <div className="py-1">
                <a
                  href="#profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Your Profile
                </a>
                <a
                  href="#settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Settings
                </a>
                <div className="border-t border-gray-100"></div>
                <a
                  href="#logout"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => setProfileDropdownOpen(false)}
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

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
        style={{ minHeight: '100vh' }}
      >
        <Header toggleSidebar={toggleSidebar} />

        {/* Add padding top to offset fixed header height */}
        <main className="p-6 pt-20 overflow-auto flex-grow">
          {activeMenu === 'dashboard' && (
            <>
              {/* Your dashboard components go here */}
              {/* For example: */}
              <RecentActivities />
              <RecentProducts />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-md font-medium text-gray-700 mb-3">Sales Overview</h3>
                  <SalesChart />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <UserGrowthChart />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-md font-medium text-gray-700 mb-3">Popular Products</h3>
                  <PopularProductsChart />
                </div>
              </div>
            </>
          )}
          {activeMenu === 'users' && <div>User Management Page (to implement)</div>}
          {activeMenu === 'products' && <div>Products/Crafts Page (to implement)</div>}
          {activeMenu === 'orders' && <div>Orders Page (to implement)</div>}
          {activeMenu === 'analytics' && <div>Analytics Page (to implement)</div>}
          {activeMenu === 'settings' && <div>Settings Page (to implement)</div>}
        </main>
      </div>
    </div>
  );
};

export default App;
