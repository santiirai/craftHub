import React from "react";

const Footer = () => {
  const shopLinks = [
    "DIY Kits",
    "Art Supplies",
    "Needlework",
    "Paper Crafts",
    "New Arrivals",
    "Sale Items",
  ];

  const customerServiceLinks = [
    "Contact Us",
    "FAQs",
    "Shipping Policy",
    "Returns & Refunds",
    "Privacy Policy",
    "Terms of Service",
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CraftHub</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for all DIY and craft supplies. Quality products
              for creative minds.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Pinterest"
              >
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {customerServiceLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2 text-indigo-400"></i>
                <span className="text-gray-400">123 Craft Street, Artsville, CA 90210</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-2 text-indigo-400"></i>
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-indigo-400"></i>
                <span className="text-gray-400">support@crafthub.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-bold mb-2">We Accept</h4>
              <div className="flex space-x-3 text-gray-400">
                <i className="fab fa-cc-visa text-2xl"></i>
                <i className="fab fa-cc-mastercard text-2xl"></i>
                <i className="fab fa-cc-amex text-2xl"></i>
                <i className="fab fa-cc-paypal text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm relative">
          <p>&copy; 2025 CraftHub. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-600 focus:outline-none"
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
