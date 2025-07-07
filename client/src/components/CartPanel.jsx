import React from "react";

const CartPanel = ({
  isCartOpen,
  setIsCartOpen,
  cartItems,       // array of cart product objects with { id, name, image, category, price, quantity }
  onRemoveItem,    // callback to remove item by id
  onQuantityChange // callback to update quantity (id, newQuantity)
}) => {
  if (!isCartOpen) return null;

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Side Panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Shopping Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label="Close cart"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((product) => (
                  <div key={`cart-${product.id}`} className="flex border-b border-gray-200 pb-4">
                    <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-gray-400 hover:text-red-500 cursor-pointer"
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                      <p className="text-gray-500 text-xs">{product.category}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() =>
                              onQuantityChange(product.id, Math.max(1, product.quantity - 1))
                            }
                            className="px-2 py-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                            aria-label={`Decrease quantity of ${product.name}`}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="px-2 text-sm">{product.quantity}</span>
                          <button
                            onClick={() => onQuantityChange(product.id, product.quantity + 1)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                            aria-label={`Increase quantity of ${product.name}`}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <span className="font-bold">${(product.price * product.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <i className="fas fa-shopping-cart text-gray-300 text-5xl mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Cart Footer with subtotal & actions */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-bold">Calculated at checkout</span>
              </div>
              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium mb-2 !rounded-button whitespace-nowrap cursor-pointer"
                onClick={() => {
                  // Add checkout logic here
                  alert("Proceeding to checkout...");
                }}
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
