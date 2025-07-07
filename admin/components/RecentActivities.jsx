import React from 'react';

const RecentActivities = () => {
  const activities = [
    {
      activity: 'New order placed',
      user: 'Emily Johnson',
      time: '10 minutes ago',
      status: 'Completed',
      statusColor: 'green',
    },
    {
      activity: 'Product updated',
      user: 'Michael Smith',
      time: '45 minutes ago',
      status: 'Processing',
      statusColor: 'blue',
    },
    {
      activity: 'New user registered',
      user: 'Sarah Williams',
      time: '1 hour ago',
      status: 'Completed',
      statusColor: 'green',
    },
    {
      activity: 'Payment received',
      user: 'David Brown',
      time: '2 hours ago',
      status: 'Completed',
      statusColor: 'green',
    },
    {
      activity: 'Order canceled',
      user: 'James Wilson',
      time: '3 hours ago',
      status: 'Canceled',
      statusColor: 'red',
    },
  ];

  const statusColors = {
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    red: 'bg-red-100 text-red-700',
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                  {item.activity}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.user}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[item.statusColor]
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivities;
