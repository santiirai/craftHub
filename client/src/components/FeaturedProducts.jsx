import React, { useState } from "react";

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: 'DIY Candle Making Kit',
    price: 29.99,
    rating: 4.5,
    image: 'https://readdy.ai/api/search-image?query=Professional%20DIY%20candle%20making%20kit%20with%20natural%20soy%20wax%2C%20cotton%20wicks%2C%20essential%20oils%2C%20and%20colorful%20dyes%20arranged%20neatly%20in%20a%20wooden%20box%20with%20minimalist%20white%20background%2C%20product%20photography&width=400&height=300&seq=1&orientation=landscape',
    category: 'DIY Kits'
  },
  {
    id: 2,
    name: 'Macramé Wall Hanging Kit',
    price: 24.99,
    rating: 4.7,
    image: 'https://readdy.ai/api/search-image?query=Complete%20macrame%20wall%20hanging%20kit%20with%20natural%20cotton%20rope%2C%20wooden%20dowel%2C%20and%20instruction%20booklet%20arranged%20aesthetically%20on%20clean%20white%20background%2C%20professional%20product%20photography&width=400&height=300&seq=2&orientation=landscape',
    category: 'DIY Kits'
  },
  {
    id: 3,
    name: 'Premium Watercolor Set',
    price: 34.99,
    rating: 4.8,
    image: 'https://readdy.ai/api/search-image?query=High-quality%20watercolor%20paint%20set%20with%2024%20vibrant%20colors%2C%20professional%20brushes%2C%20and%20mixing%20palette%20arranged%20neatly%20on%20white%20background%2C%20artistic%20product%20photography&width=400&height=300&seq=3&orientation=landscape',
    category: 'Art Supplies'
  },
  {
    id: 4,
    name: 'Pottery Wheel Starter Kit',
    price: 89.99,
    rating: 4.3,
    image: 'https://readdy.ai/api/search-image?query=Complete%20pottery%20wheel%20starter%20kit%20with%20clay%2C%20tools%2C%20and%20mini%20electric%20wheel%20displayed%20professionally%20on%20clean%20white%20background%2C%20product%20photography%20for%20crafts&width=400&height=300&seq=4&orientation=landscape',
    category: 'DIY Kits'
  },
  {
    id: 5,
    name: 'Embroidery Beginner Set',
    price: 19.99,
    rating: 4.6,
    image: 'https://readdy.ai/api/search-image?query=Embroidery%20starter%20kit%20with%20colorful%20threads%2C%20hoops%2C%20needles%2C%20and%20pattern%20templates%20neatly%20arranged%20on%20white%20background%2C%20craft%20supply%20product%20photography&width=400&height=300&seq=5&orientation=landscape',
    category: 'Needlework'
  },
  {
    id: 6,
    name: 'Resin Art Starter Kit',
    price: 39.99,
    rating: 4.4,
    image: 'https://readdy.ai/api/search-image?query=Complete%20resin%20art%20starter%20kit%20with%20epoxy%20resin%2C%20silicone%20molds%2C%20colorful%20pigments%2C%20and%20tools%20arranged%20professionally%20on%20white%20background%2C%20craft%20supply%20product%20photography&width=400&height=300&seq=6&orientation=landscape',
    category: 'DIY Kits'
  },
  {
    id: 7,
    name: 'Premium Acrylic Paint Set',
    price: 27.99,
    rating: 4.9,
    image: 'https://readdy.ai/api/search-image?query=Professional%20acrylic%20paint%20set%20with%2024%20vibrant%20colors%20in%20tubes%2C%20arranged%20neatly%20with%20paintbrushes%20on%20clean%20white%20background%2C%20art%20supply%20product%20photography&width=400&height=300&seq=7&orientation=landscape',
    category: 'Art Supplies'
  },
  {
    id: 8,
    name: 'Leather Crafting Kit',
    price: 49.99,
    rating: 4.2,
    image: 'https://readdy.ai/api/search-image?query=Comprehensive%20leather%20crafting%20kit%20with%20genuine%20leather%20pieces%2C%20tools%2C%20thread%2C%20and%20patterns%20arranged%20professionally%20on%20white%20background%2C%20craft%20supply%20product%20photography&width=400&height=300&seq=8&orientation=landscape',
    category: 'DIY Kits'
  }
];

export default function FeaturedProducts({ onAddToCart, onAddToWishlist, selectedCategory = "All" }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const filteredProducts = selectedCategory === "All"
    ? featuredProducts
    : featuredProducts.filter(p => p.category === selectedCategory);

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
      stars.push(<i key={`full-${i}`} className="fas fa-star text-yellow-400 text-sm"></i>);
    }
    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-400 text-sm"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-yellow-400 text-sm"></i>);
    }
    return stars;
  }

  return (
    <section className="py-12 bg-gray-50 font-sans">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
          <div className="flex gap-6 items-center">
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center transition"
            >
              View All <i className="fas fa-arrow-right ml-2 text-xs"></i>
            </a>
            <div className="text-sm font-medium text-gray-700">
              Wishlist: <span className="text-indigo-600">{wishlist.length}</span>
            </div>
            <div className="text-sm font-medium text-gray-700">
              Cart: <span className="text-indigo-600">{cart.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={() => handleAddToWishlist(product.id)}
                  className={`absolute top-2 right-2 p-2 rounded-full shadow transition-colors text-sm ${
                    wishlist.includes(product.id)
                      ? "bg-red-100 text-red-500"
                      : "bg-white text-gray-600 hover:bg-gray-100 hover:text-red-500"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <i className={wishlist.includes(product.id) ? "fas fa-heart" : "far fa-heart"}></i>
                </button>
              </div>
              <div className="p-4">
                <div className="text-xs text-indigo-600 font-semibold mb-1">{product.category}</div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">{renderStars(product.rating)}</div>
                  <span className="text-xs text-gray-500">({product.rating})</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`px-4 py-1.5 rounded-xl text-sm font-medium text-white transition ${
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
