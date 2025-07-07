import React from "react";

const RegisterModal = ({
  isRegisterModalOpen,
  setIsRegisterModalOpen,
  setIsSignInModalOpen,
}) => {
  if (!isRegisterModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={() => setIsRegisterModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
          aria-label="Close Register modal"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600">Join the CraftHub community</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="registerEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="registerEmail"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="registerPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="registerPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              required
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-700"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium !rounded-button whitespace-nowrap cursor-pointer"
          >
            Create Account
          </button>

          <div className="relative flex items-center justify-center mt-6">
            <div className="border-t border-gray-300 absolute w-full"></div>
            <div className="bg-white px-4 relative text-sm text-gray-500">
              or sign up with
            </div>
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 py-2 rounded-lg font-medium flex items-center justify-center !rounded-button whitespace-nowrap cursor-pointer"
          >
            <i className="fab fa-google text-red-500 mr-2"></i> Sign up with
            Google
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
            onClick={() => {
              setIsRegisterModalOpen(false);
              setIsSignInModalOpen(true);
            }}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
