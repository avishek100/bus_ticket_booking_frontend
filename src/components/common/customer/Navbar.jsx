import { Calendar, User, LogOut, MapPin, BookOpen } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in (robust check)
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Remove navItems and navigation links section

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-12 lg:h-14">
          {/* Left Section - Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/search')}
          >
            <img
              src="src/assets/images/logo.png"
              alt="GoBus Logo"
              className="w-8 h-8 lg:w-10 lg:h-10"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold text-[#E04848]">GoBus</h1>
              <p className="text-xs lg:text-xs text-gray-500">Trusted Ticketing Platform</p>
            </div>
          </motion.div>

          {/* Right Section - Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                /* Logged In User */
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 px-4 py-1 bg-gradient-to-r from-[#E04848] to-red-600 text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 text-sm font-semibold border-2 border-[#E04848]"
                  >
                    <User className="w-5 h-5" />
                    <span>My Account</span>
                  </motion.button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-[1000]">
                      <ul className="py-2 text-gray-700">
                        {/* Profile */}
                        <li>
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                          >
                            <User size={18} /> Profile
                          </Link>
                        </li>

                        {/* Booking History */}
                        <li>
                          <Link
                            to="/bookings"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                          >
                            <Calendar size={18} /> Booking History
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                /* Guest User */
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-1 rounded-2xl border-2 border-[#E04848] text-[#E04848] font-semibold bg-white hover:bg-red-50 hover:text-red-700 shadow-sm transition-all duration-200 text-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-1 rounded-2xl bg-gradient-to-r from-[#E04848] to-red-600 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-200 text-sm border-2 border-[#E04848] hover:from-red-700 hover:to-red-800"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Sign Out Button */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-[#E04848] text-white rounded-lg hover:bg-purple-800 transition duration-300"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Mobile User Actions */}
        <div className="md:hidden pt-4 border-t border-gray-200">
          {isLoggedIn ? (
            <div className="space-y-2">
              <Link
                to="/profile"
                className="flex items-center space-x-3 px-4 py-3 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-semibold"
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <Link
                to="/bookings"
                className="flex items-center space-x-3 px-4 py-3 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-semibold"
              >
                <Calendar className="w-5 h-5" />
                <span>My Bookings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 text-base text-red-600 hover:bg-red-50 w-full rounded-lg transition-colors duration-200 font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                to="/login"
                className="block w-full px-4 py-3 text-center text-[#E04848] font-semibold border-2 border-[#E04848] rounded-2xl bg-white hover:bg-red-50 hover:text-red-700 shadow-sm transition-all duration-200 text-base"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block w-full px-4 py-3 text-center bg-gradient-to-r from-[#E04848] to-red-600 text-white font-semibold rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 text-base border-2 border-[#E04848] hover:from-red-700 hover:to-red-800"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
