import React from 'react';

const RecentProducts = () => {
  const products = [1, 2, 3, 4];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Products</h2>
        <button className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md whitespace-nowrap text-sm font-medium cursor-pointer hover:bg-indigo-700 transition-colors">
          View All Products
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item}
            className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img
                src={`https://readdy.ai/api/search-image?query=beautiful%20handmade%20craft%20product%20with%20artistic%20details%2C%20professional%20product%20photography%20with%20soft%20lighting%20and%20neutral%20background%2C%20high%20quality%20artisan%20craftsmanship%2C%20elegant%20composition&width=400&height=300&seq=${item}&orientation=landscape`}
                alt="Craft product"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-4">
              <h3 className="text-md font-medium text-gray-800 mb-1">Handcrafted Pottery Bowl</h3>
              <p className="text-sm text-gray-500 mb-2">Traditional ceramic craftsmanship</p>
              <div className="flex justify-between items-center">
                <span className="text-indigo-600 font-bold">$45.99</span>
                <span className="text-xs text-gray-500">Stock: 24</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
