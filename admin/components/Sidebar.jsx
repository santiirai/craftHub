import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
    { id: 'products', label: 'Products', icon: 'fas fa-box' },
    { id: 'users', label: 'Users', icon: 'fas fa-users' },
    { id: 'transactions', label: 'Transactions', icon: 'fas fa-credit-card' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
      </div>
      
      <nav className="mt-6">
        <div className="px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <i className={`${item.icon} mr-3`}></i>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}