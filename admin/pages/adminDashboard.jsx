import React, { useState, useEffect } from "react";

function AdminHeader({ user, onLogout, activeSection, setActiveSection }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold text-indigo-600 flex items-center space-x-2">
          <i className="fas fa-tools"></i>
          <span>Admin Panel</span>
        </a>
        <div className="flex items-center space-x-4">
          {user && (
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                <i className="fas fa-user-shield text-xl"></i>
                <span className="text-sm font-medium">{user.name || 'Admin'}</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-inner relative">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center space-x-6 py-3 overflow-x-auto scrollbar-hide text-sm font-medium">
            <li
              className={`whitespace-nowrap cursor-pointer ${activeSection === 'dashboard' ? 'text-indigo-200 font-bold' : 'hover:text-indigo-200'}`}
              onClick={() => setActiveSection('dashboard')}
            >
              Dashboard
            </li>
            <li
              className={`whitespace-nowrap cursor-pointer ${activeSection === 'users' ? 'text-indigo-200 font-bold' : 'hover:text-indigo-200'}`}
              onClick={() => setActiveSection('users')}
            >
              Users
            </li>
            <li
              className={`whitespace-nowrap cursor-pointer ${activeSection === 'orders' ? 'text-indigo-200 font-bold' : 'hover:text-indigo-200'}`}
              onClick={() => setActiveSection('orders')}
            >
              Orders
            </li>
            <li
              className={`whitespace-nowrap cursor-pointer ${activeSection === 'products' ? 'text-indigo-200 font-bold' : 'hover:text-indigo-200'}`}
              onClick={() => setActiveSection('products')}
            >
              Products
            </li>
            <li
              className={`whitespace-nowrap cursor-pointer ${activeSection === 'reports' ? 'text-indigo-200 font-bold' : 'hover:text-indigo-200'}`}
              onClick={() => setActiveSection('reports')}
            >
              Reports
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

function AdminFooter() {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-4 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
        <p>&copy; 2025 CraftHub Admin. All rights reserved.</p>
      </div>
    </footer>
  );
}

const stats = [
  { label: 'Orders', value: 120, icon: 'fas fa-shopping-cart', color: 'bg-indigo-100 text-indigo-700' },
  { label: 'Users', value: 75, icon: 'fas fa-users', color: 'bg-purple-100 text-purple-700' },
  { label: 'Products', value: 34, icon: 'fas fa-boxes', color: 'bg-green-100 text-green-700' },
  { label: 'Revenue', value: '$12,500', icon: 'fas fa-dollar-sign', color: 'bg-yellow-100 text-yellow-700' },
];

function DashboardSection() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Admin 👋</h1>
      <p className="text-gray-600 mb-8">This is your admin dashboard. Manage users, orders, products, and view reports.</p>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-xl shadow p-6 flex items-center space-x-4 ${stat.color}`}>
            <i className={`${stat.icon} text-3xl`}></i>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm font-medium text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">Recent Activities</h2>
        <ul className="space-y-2 text-gray-700">
          <li><i className="fas fa-user-plus mr-2 text-green-500"></i> New user <b>Jane Doe</b> registered.</li>
          <li><i className="fas fa-box mr-2 text-blue-500"></i> Product <b>Handmade Scarf</b> added.</li>
          <li><i className="fas fa-shopping-bag mr-2 text-indigo-500"></i> Order <b>#1234</b> completed.</li>
          <li><i className="fas fa-chart-line mr-2 text-yellow-500"></i> Revenue increased by <b>15%</b> this week.</li>
        </ul>
      </div>
      {/* Quick Actions Placeholder */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"><i className="fas fa-user-plus mr-2"></i>Add User</button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"><i className="fas fa-box-open mr-2"></i>Add Product</button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"><i className="fas fa-file-alt mr-2"></i>View Reports</button>
        </div>
      </div>
    </>
  );
}

function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: '', price: '', stock: '', description: '', image: '', category: '' });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/products', {
        credentials: 'include',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProduct(e) {
    e.preventDefault();
    setAdding(true);
    setAddError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          title: form.title,
          price: Number(form.price),
          stock: Number(form.stock),
          description: form.description,
          image: form.image,
          category: form.category,
        }),
      });
      if (!res.ok) throw new Error('Failed to add product');
      setForm({ title: '', price: '', stock: '', description: '', image: '', category: '' });
      fetchProducts();
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAdding(false);
    }
  }

  async function handleDeleteProduct(id) {
    if (!window.confirm('Delete this product?')) return;
    setDeletingId(id);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Products</h2>
      <form className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddProduct}>
        <input
          className="border rounded px-3 py-2"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          required
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
          required
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
          required
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="Category"
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
        />
        <input
          className="border rounded px-3 py-2 md:col-span-2"
          placeholder="Image URL"
          value={form.image}
          onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
        />
        <textarea
          className="border rounded px-3 py-2 md:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium md:col-span-2"
          disabled={adding}
        >
          {adding ? 'Adding...' : 'Add Product'}
        </button>
        {addError && <div className="text-red-600 md:col-span-2">{addError}</div>}
      </form>
      {loading ? (
        <div>Loading products...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product._id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{product.title}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${product.price}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{product.stock}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{product.category}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                      onClick={() => handleDeleteProduct(product._id)}
                      disabled={deletingId === product._id}
                    >
                      {deletingId === product._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function UsersSection() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/users', {
        credentials: 'include',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Registered Users</h2>

      {loading ? (
        <div>Loading users...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : users.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map(user => (
                <tr key={user._id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.role}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

const AdminDashboard = ({ user = { name: 'Admin' }, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader user={user} onLogout={onLogout} activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
        {activeSection === 'dashboard' && <DashboardSection />}
        {activeSection === 'users' && <UsersSection />}
        {activeSection === 'products' && <ProductsSection />}
        {/* You can add Orders and Reports sections similarly */}
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;
