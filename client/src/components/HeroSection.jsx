import React from "react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-white">
      {/* Hero Section Background Image */}
      <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=Professional%20photograph%20of%20a%20modern%20minimalist%20craft%20studio%20interior%20with%20soft%20natural%20lighting%2C%20featuring%20elegant%20craft%20supplies%20and%20materials%20arranged%20artistically.%20The%20scene%20has%20a%20clean%2C%20sophisticated%20aesthetic%20with%20subtle%20textures%20and%20muted%20colors%2C%20perfect%20for%20a%20hero%20background.%20High-end%20photography%20with%20perfect%20composition&width=1440&height=800&seq=14&orientation=landscape')] bg-cover bg-center opacity-10"></div>
      
      {/* Category Anchors for linking */}
      <div className="absolute top-0 left-0 w-0 h-0 overflow-hidden">
        <div id="category-sketch" />
        <div id="category-crochet" />
        <div id="category-knitting" />
        <div id="category-jewelry-making" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-20 items-center">
          {/* Left Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                Professional Craft Community
              </span>
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                Elevate Your{" "}
                <span className="text-indigo-600 relative">
                  Craft Journey
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 7c20-3 40-3 60 0s40 3 60 0"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Join a thriving community of artisans, access premium craft
                resources, and transform your creative passion into
                masterpieces.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group px-8 py-4 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap">
                <span className="flex items-center">
                  Learn More{/* Explore Premium Kits */}
                  <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-200"></i>
                </span>
              </button>
              <button className="group px-8 py-4 bg-white text-indigo-600 font-medium rounded-md shadow-md border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap">
                <span className="flex items-center">
                  {/* Join Community */}
                  <i className="fas fa-users ml-2 transform group-hover:scale-110 transition-transform duration-200"></i>
                </span>
              </button>
            </div>

            {/* Avatars */}
            <div className="flex items-center space-x-8 mt-8">
              {/* <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((index) => (
                  <img
                    key={index}
                    src={`https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20creative%20artisan%20with%20natural%20lighting%20and%20neutral%20background%2C%20showing%20confidence%20and%20artistic%20expression.%20High%20quality%20photography%20with%20shallow%20depth%20of%20field&width=100&height=100&seq=${15 + index}&orientation=squarish`}
                    alt={`Community member ${index}`}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div> */}
              <div className="text-sm">
                <p className="font-semibold text-gray-900">
                  Join 10,000+ artisans
                </p>
                <p className="text-gray-500">
                  Creating exceptional craft projects
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-10 blur-lg transform -rotate-3"></div>
            <img
              src="https://readdy.ai/api/search-image?query=Professional%20lifestyle%20photography%20of%20premium%20craft%20supplies%20and%20tools%20arranged%20in%20an%20artistic%20composition.%20Features%20high-end%20materials%20like%20leather%2C%20ceramics%2C%20and%20textile%20tools%20on%20a%20clean%20modern%20workspace.%20Natural%20lighting%20creates%20dramatic%20shadows%20and%20highlights%20the%20quality%20of%20materials.%20Perfect%20for%20hero%20section%20with%20clean%2C%20minimal%20aesthetic&width=800&height=600&seq=19&orientation=landscape"
              alt="Premium craft supplies and workspace"
              className="relative rounded-2xl shadow-2xl object-cover w-full h-full transform rotate-2 hover:rotate-0 transition-transform duration-500"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-600/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
