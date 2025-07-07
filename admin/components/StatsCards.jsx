import React from 'react';

export default function StatsCards({ products, users, transactions }) {
  const totalRevenue = transactions
    .filter(t => t.paymentStatus === 'Completed')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const pendingOrders = transactions.filter(t => t.paymentStatus === 'Pending').length;
  const completedOrders = transactions.filter(t => t.paymentStatus === 'Completed').length;

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      change: '+12%',
      changeType: 'positive',
      icon: 'fas fa-box',
      color: 'bg-blue-500'
    },
    {
      title: 'Total Users',
      value: users.length,
      change: '+8%',
      changeType: 'positive',
      icon: 'fas fa-users',
      color: 'bg-green-500'
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      change: '+23%',
      changeType: 'positive',
      icon: 'fas fa-dollar-sign',
      color: 'bg-yellow-500'
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      change: completedOrders > 0 ? `${((completedOrders / (completedOrders + pendingOrders)) * 100).toFixed(1)}% completed` : '0%',
      changeType: 'neutral',
      icon: 'fas fa-clock',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`${stat.color} rounded-lg p-3`}>
              <i className={`${stat.icon} text-white text-xl`}></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm ${
              stat.changeType === 'positive' ? 'text-green-600' :
              stat.changeType === 'negative' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}