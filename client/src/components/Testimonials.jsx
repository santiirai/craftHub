import React from "react";

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-sm"></i>
              ))}
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-5">
              “The candle making kit was perfect for a beginner like me. The instructions were clear and the materials were high quality. I've already made several candles that my friends love!”
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-3">
                SJ
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Candle Making Kit</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-sm"></i>
              ))}
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-5">
              “I've been buying my art supplies from CraftHub for months now. The quality is consistently excellent and the prices are reasonable. The watercolor set I purchased exceeded my expectations!”
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-3">
                MT
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">Michael Thompson</h4>
                <p className="text-sm text-gray-500">Premium Watercolor Set</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex text-yellow-400 mb-4">
              {[...Array(4)].map((_, i) => (
                <i key={i} className="fas fa-star text-sm"></i>
              ))}
              <i className="fas fa-star-half-alt text-sm"></i>
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-5">
              “The macramé kit was perfect for my weekend project. Everything was included and the pattern was easy to follow. I'm already planning my next purchase from CraftHub!”
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-3">
                EL
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">Emily Lee</h4>
                <p className="text-sm text-gray-500">Macramé Wall Hanging Kit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
