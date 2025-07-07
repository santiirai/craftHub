import React, { useState } from "react";

const featuredProducts = [
  {
    id: 1,
    name: "Acrylic Paint Set",
    category: "Paints",
    rating: 4.5,
    price: 19.99,
    image: "https://example.com/acrylic-paint.jpg",
  },
  {
    id: 2,
    name: "Round Brush Set",
    category: "Brushes",
    rating: 4.0,
    price: 12.49,
    image: "https://example.com/round-brush.jpg",
  },
  {
    id: 3,
    name: "Stretched Canvas",
    category: "Canvas",
    rating: 5,
    price: 15.0,
    image: "https://example.com/canvas.jpg",
  },
  {
    id: 4,
    name: "Craft Knife Set",
    category: "Craft Tools",
    rating: 4.3,
    price: 9.99,
    image: "https://example.com/knife-set.jpg",
  },
  {
    id: 5,
    name: "Sticker Pack",
    category: "Paper & Stickers",
    rating: 3.8,
    price: 7.99,
    image: "https://example.com/stickers.jpg",
  },
];

export default function NewArrivals({ onAddToCart, onAddToWishlist }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  function handleAddToWishlist(productId) {
    if (wishlist.includes(productId)) {
      alert("This product is already in your wishlist.");
      return;
    }
    setWishlist([...wishlist, productId]);
    if (onAddToWishlist) {
      onAddToWishlist(featuredProducts.find(p => p.id === productId));
    }
    alert("Added to your wishlist!");
  }

  function handleAddToCart(productId) {
    if (cart.includes(productId)) {
      alert("This product is already in your cart.");
      return;
    }
    setCart([...cart, productId]);
    if (onAddToCart) {
      onAddToCart(featuredProducts.find(p => p.id === productId));
    }
    alert("Added to your cart!");
  }

  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>);
    }
    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-400"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-yellow-400"></i>);
    }
    return stars;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center cursor-pointer"
          >
            View All <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <div
              key={`new-${product.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => handleAddToWishlist(product.id)}
                    className={`bg-white p-2 rounded-full shadow-md transition-colors cursor-pointer ${
                      wishlist.includes(product.id)
                        ? "text-red-500 hover:bg-red-100"
                        : "text-gray-600 hover:bg-gray-100 hover:text-red-500"
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <i className={wishlist.includes(product.id) ? "fas fa-heart" : "far fa-heart"}></i>
                  </button>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">New</span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-indigo-600 font-medium mb-1">{product.category}</div>
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">{renderStars(product.rating)}</div>
                  <span className="text-xs text-gray-500">({product.rating})</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`px-3 py-1 rounded text-sm whitespace-nowrap cursor-pointer text-white ${
                      cart.includes(product.id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                    disabled={cart.includes(product.id)}
                    aria-label="Add to cart"
                  >
                    {cart.includes(product.id) ? "In Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
