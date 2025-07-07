import React from "react";

export default function DiyGuides() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          DIY Guides & Inspiration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-48 overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Person%20making%20handmade%20candles%20with%20DIY%20kit%2C%20showing%20step%20by%20step%20process%20with%20materials%20laid%20out%20neatly%2C%20soft%20natural%20lighting%2C%20instructional%20photography&width=400&height=250&seq=17&orientation=landscape"
                alt="Candle Making Guide"
                className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">Beginner's Guide to Candle Making</h3>
              <p className="text-gray-600 text-sm mb-3">
                Learn how to make beautiful scented candles with our step-by-step guide.
              </p>
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center cursor-pointer"
              >
                Read Guide <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-48 overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Person%20creating%20macrame%20wall%20hanging%2C%20showing%20hands%20working%20with%20cotton%20rope%20and%20wooden%20dowel%2C%20step%20by%20step%20process%2C%20soft%20natural%20lighting%2C%20instructional%20photography&width=400&height=250&seq=18&orientation=landscape"
                alt="Macramé Tutorial"
                className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">Modern Macramé Wall Hangings</h3>
              <p className="text-gray-600 text-sm mb-3">
                Create stunning wall art with these simple macramé techniques and patterns.
              </p>
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center cursor-pointer"
              >
                Read Guide <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-48 overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Person%20creating%20watercolor%20painting%2C%20showing%20hands%20holding%20brush%20over%20paper%20with%20paints%20nearby%2C%20step%20by%20step%20demonstration%2C%20soft%20natural%20lighting%2C%20instructional%20photography&width=400&height=250&seq=19&orientation=landscape"
                alt="Watercolor Techniques"
                className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">Watercolor Techniques for Beginners</h3>
              <p className="text-gray-600 text-sm mb-3">
                Master the basics of watercolor painting with these essential techniques.
              </p>
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center cursor-pointer"
              >
                Read Guide <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
