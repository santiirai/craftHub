import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Add notification function (JSX version, no types)
  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(notifications => notifications.filter(n => n.id !== id));
    }, 3000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsNewsletterSubmitted(true);
      addNotification("Successfully subscribed to newsletter!", "success");
      setEmail("");
      setTimeout(() => setIsNewsletterSubmitted(false), 5000);
    }
  };

  return (
    <section className="py-12 bg-indigo-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Our Creative Community
          </h2>
          <p className="mb-6">
            Subscribe to our newsletter for DIY inspiration, exclusive offers,
            and new product alerts.
          </p>

          {/* Notifications UI */}
          <div className="fixed top-5 right-5 space-y-2 z-50">
            {notifications.map(({ id, message, type }) => (
              <div
                key={id}
                className={`p-3 rounded shadow ${type === "success"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  }`}
              >
                {message}
              </div>
            ))}
          </div>

          {isNewsletterSubmitted ? (
            <div className="bg-white/10 rounded-lg p-4 inline-block">
              <i className="fas fa-check-circle text-green-300 mr-2"></i>
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-none focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium !rounded-button whitespace-nowrap cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// Note: This code assumes you have Font Awesome icons available for the check icon.