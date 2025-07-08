import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'orders') {
        const res = await fetch('http://localhost:8000/api/transactions');
        const data = await res.json();
        setOrders(data);
      } else if (activeTab === 'payments') {
        const res = await fetch('http://localhost:8000/api/transactions');
        const data = await res.json();
        setPayments(data);
      } else if (activeTab === 'users') {
        const res = await fetch('http://localhost:8000/api/users');
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await fetch(`http://localhost:8000/api/users/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-8">
        <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border'}`}>Orders</button>
        <button onClick={() => setActiveTab('payments')} className={`px-4 py-2 rounded ${activeTab === 'payments' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border'}`}>Payments</button>
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border'}`}>Users</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Order History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Order ID</th>
                      <th className="px-4 py-2">User</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} className="border-t">
                        <td className="px-4 py-2">{order._id}</td>
                        <td className="px-4 py-2">{order.user?.name || order.userId || 'N/A'}</td>
                        <td className="px-4 py-2">${order.amount || order.total || 'N/A'}</td>
                        <td className="px-4 py-2">{order.status || 'N/A'}</td>
                        <td className="px-4 py-2">{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'payments' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Payment ID</th>
                      <th className="px-4 py-2">Order ID</th>
                      <th className="px-4 py-2">User</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(payment => (
                      <tr key={payment._id} className="border-t">
                        <td className="px-4 py-2">{payment._id}</td>
                        <td className="px-4 py-2">{payment.orderId || payment._id}</td>
                        <td className="px-4 py-2">{payment.user?.name || payment.userId || 'N/A'}</td>
                        <td className="px-4 py-2">${payment.amount || payment.total || 'N/A'}</td>
                        <td className="px-4 py-2">{payment.status || 'N/A'}</td>
                        <td className="px-4 py-2">{payment.createdAt ? new Date(payment.createdAt).toLocaleString() : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">User ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Role</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id} className="border-t">
                        <td className="px-4 py-2">{user._id}</td>
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{user.role || 'user'}</td>
                        <td className="px-4 py-2">
                          <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
