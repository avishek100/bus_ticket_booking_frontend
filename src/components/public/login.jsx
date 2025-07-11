import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaLock, FaCheck, FaTimes, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom"; // ✅ Hook for navigation

// API function for login
const loginUser = async (userData) => {
  const { data } = await axios.post("http://localhost:3000/api/v1/auth/login", userData);
  return data; // ✅ Ensure API returns { token, role }
};

const Login = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation after login
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mutation Hook for login
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // ✅ Store token and role in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // ✅ Redirect users based on role
      if (data.role === "admin") {
        window.location.href = "/admin/dashboard"; // Redirect Admin
      } else {
        navigate("/"); // Redirect Customer
      }
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMessage("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors({ ...errors, [name]: `${name} is required` });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let hasError = false;

    if (!formData.email) {
      setErrors({ ...errors, email: "Email is required" });
      hasError = true;
    }
    if (!formData.password) {
      setErrors({ ...errors, password: "Password is required" });
      hasError = true;
    }

    if (hasError) {
      setIsSubmitting(false);
      return;
    }

    mutation.mutate({ email: formData.email, password: formData.password });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f8e1e1] via-[#f3e8ff] to-[#e1eaff]">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-12 py-8">
        {/* Glassmorphism Card */}
        <div className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/40">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <img src="src/assets/images/logo.png" alt="GoBus Logo" className="w-16 h-16 mx-auto mb-4 rounded-xl shadow" />
            <h1 className="text-3xl font-bold text-[#E04848] mb-2 tracking-tight">GoBus</h1>
            <p className="text-sm text-gray-500">Welcome back! Sign in to your account</p>
          </div>

          {/* Success Message from Registration */}
          {successMessage && (
            <div className="w-full mb-6 bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in-up shadow">
              <div className="flex items-center">
                <FaCheck className="text-green-500 mr-2" />
                <p className="text-green-700 text-sm">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your@email.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E04848] transition-colors bg-white/80 shadow-sm ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <FaTimes className="text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E04848] transition-colors bg-white/80 shadow-sm ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#E04848] focus:ring-[#E04848] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-[#E04848] hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 shadow">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting || mutation.isLoading}
              className="w-full bg-gradient-to-r from-[#E04848] to-[#a83279] text-white py-3 rounded-xl font-semibold hover:from-[#c73e3e] hover:to-[#7b2ff2] focus:outline-none focus:ring-2 focus:ring-[#E04848] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting || mutation.isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In to GoBus"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/80 text-gray-500 rounded-full">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white/80 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E04848] transition-colors shadow">
              <FaUser className="mr-2" />
              Continue as Guest
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#E04848] font-medium hover:underline">
              Sign Up
            </Link>
          </p>

          <div className="text-sm text-gray-400 mt-6 text-center">© 2025 GoBus. All rights reserved.</div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse"
          style={{ backgroundImage: "url('src/assets/images/bus2.png')" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 animate-gradient"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-12">
          <div className="text-center max-w-md">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
              <span className="inline-block animate-slide-in-left" style={{ animationDelay: '0.2s' }}>Welcome</span>{' '}
              <span className="inline-block animate-slide-in-right" style={{ animationDelay: '0.4s' }}>Back!</span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Sign in to your account and continue your journey with GoBus. 
              Access your bookings, manage your profile, and explore new destinations.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 animate-slide-in-right" style={{ animationDelay: '0.8s' }}>
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                  <FaCheck className="text-white text-xs" />
                </div>
                <span className="text-white/90">Quick and secure access</span>
              </div>
              <div className="flex items-center space-x-3 animate-slide-in-right" style={{ animationDelay: '1s' }}>
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center animate-pulse">
                  <FaCheck className="text-white text-xs" />
                </div>
                <span className="text-white/90">Manage your bookings</span>
              </div>
              <div className="flex items-center space-x-3 animate-slide-in-right" style={{ animationDelay: '1.2s' }}>
                <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center animate-pulse">
                  <FaCheck className="text-white text-xs" />
                </div>
                <span className="text-white/90">Exclusive member benefits</span>
              </div>
            </div>
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
              <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <span className="text-white font-medium">Ready to Travel?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
