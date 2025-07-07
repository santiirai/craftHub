import React from 'react';

const QuickActions = () => {
  const actions = [
    { icon: 'fa-plus', label: 'Add New Product' },
    { icon: 'fa-tasks', label: 'Manage Orders' },
    { icon: 'fa-chart-bar', label: 'View Reports' },
    { icon: 'fa-headset', label: 'User Support' },
  ];

  return (
    <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, idx) => (
          <button
            key={idx}
            className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md whitespace-nowrap text-sm font-medium cursor-pointer hover:bg-indigo-200 transition-colors flex items-center justify-center"
            onClick={() => alert(`Clicked: ${action.label}`)}
          >
            <i className={`fas ${action.icon} mr-2`}></i> {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
