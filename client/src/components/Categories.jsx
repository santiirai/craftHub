// import React from "react";

// const categories = [
//   { id: 1, name: 'DIY Kits', icon: 'fa-box', image: 'https://readdy.ai/api/search-image?query=Assorted%20DIY%20craft%20kits%20including%20candle%20making%2C%20jewelry%2C%20and%20paper%20crafts%20arranged%20in%20an%20aesthetic%20display%20with%20soft%20lighting%20on%20white%20background%2C%20category%20thumbnail&width=200&height=200&seq=9&orientation=squarish' },
//   { id: 2, name: 'Art Supplies', icon: 'fa-paint-brush', image: 'https://readdy.ai/api/search-image?query=Professional%20art%20supplies%20including%20paintbrushes%2C%20watercolors%2C%20acrylics%2C%20and%20sketchbooks%20arranged%20beautifully%20on%20white%20background%2C%20category%20thumbnail&width=200&height=200&seq=10&orientation=squarish' },
//   { id: 3, name: 'Needlework', icon: 'fa-scissors', image: 'https://readdy.ai/api/search-image?query=Needlework%20supplies%20including%20embroidery%20hoops%2C%20colorful%20threads%2C%20needles%2C%20and%20fabric%20arranged%20neatly%20on%20white%20background%2C%20category%20thumbnail&width=200&height=200&seq=11&orientation=squarish' },
//   { id: 4, name: 'Paper Crafts', icon: 'fa-scroll', image: 'https://readdy.ai/api/search-image?query=Paper%20craft%20supplies%20including%20origami%20paper%2C%20scrapbooking%20materials%2C%20and%20cardmaking%20tools%20arranged%20aesthetically%20on%20white%20background%2C%20category%20thumbnail&width=200&height=200&seq=12&orientation=squarish' },
//   { id: 5, name: 'Jewelry Making', icon: 'fa-gem', image: 'https://readdy.ai/api/search-image?query=Jewelry%20making%20supplies%20including%20beads%2C%20wire%2C%20pliers%2C%20and%20findings%20arranged%20professionally%20on%20white%20background%2C%20category%20thumbnail&width=200&height=200&seq=13&orientation=squarish' },
//   { id: 6, name: 'Pottery & Clay', icon: 'fa-mortar-pestle', image: 'https://readdy.ai/api/search-image?query=Pottery%20and%20clay%20crafting%20supplies%20including%20clay%2C%20tools%2C%20and%20glazes%20arranged%20artistically%20on%20white%20background%2C%20category%20thumbnail&width=200&height=200&seq=14&orientation=squarish' }
// ];

// export default function Categories({ onAddToCart, onAddToWishlist }) {
//   return (
//     <section className="py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
//           Shop by Category
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {categories.map((category) => (
//             <div
//               key={category.id}
//               className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <div className="h-36 overflow-hidden">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
//                 />
//               </div>
//               <div className="p-4 text-center">
//                 <h3 className="font-medium">{category.name}</h3>

//                 {/* Add to cart btn */}
//                 <button onClick={() => onAddToCart(category.name)}
//                   className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
//                   Add to Cart
//                 </button>

//                 {/* Add to Wishlist button */}
//                 <button
//                   onClick={() => onAddToWishlist(category.name)}
//                   className="mt-2 ml-2 px-3 py-1 bg-pink-600 text-white rounded hover:bg-pink-700"
//                 >
//                   Add to Wishlist
//                 </button>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useState } from "react";

const categories = [
  { name: "All", icon: "fa-th-large" },
  { name: "Painting", icon: "fa-paint-brush" },
  { name: "Ceramics", icon: "fa-shapes" },
  { name: "Knitting", icon: "fa-mitten" },
  { name: "Woodworking", icon: "fa-hammer" },
  { name: "Jewelry", icon: "fa-gem" },
  { name: "Paper Crafts", icon: "fa-cut" },
  { name: "Embroidery", icon: "fa-spool" },
  { name: "Candle Making", icon: "fa-fire" },
];

export default function Categories({ onCategorySelect }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSelect = (name) => {
    setActiveCategory(name);
    if (onCategorySelect) onCategorySelect(name); // notify parent if needed
  };

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Popular Categories</h3>
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center cursor-pointer"
          >
            View All <i className="fas fa-chevron-right ml-2 text-xs"></i>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const isActive = activeCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => handleSelect(category.name)}
                className={`flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-gray-50 text-gray-700 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full mb-3 ${
                    isActive
                      ? "bg-white bg-opacity-20"
                      : "bg-white shadow-sm"
                  }`}
                >
                  <i
                    className={`fas ${category.icon} text-xl ${
                      isActive ? "text-white" : "text-indigo-500"
                    }`}
                  ></i>
                </div>
                <span className="font-medium text-sm whitespace-nowrap">
                  {category.name}
                </span>
                {isActive && (
                  <span className="text-xs mt-1 opacity-80">12 Projects</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
