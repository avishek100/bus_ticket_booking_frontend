import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";


// API call function for user registration
const registerUser = async (userData) => {
  const { data } = await axios.post("http://localhost:3000/api/v1/auth/register", userData);
  return data;
};

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Mutation Hook for registration
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert("Registration successful!");
      console.log("User registered:", data);
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Registration failed");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    mutation.mutate({
      fname: formData.fname,
      lname: formData.lname,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
    });
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
            <p className="text-sm text-gray-500">Create your account to get started</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E04848] transition-colors bg-white/80 shadow-sm border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E04848] transition-colors bg-white/80 shadow-sm border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E04848] transition-colors bg-white/80 shadow-sm border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E04848] transition-colors bg-white/80 shadow-sm border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E04848] transition-colors bg-white/80 shadow-sm border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E04848] transition-colors bg-white/80 shadow-sm border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#E04848] to-[#a83279] text-white py-3 rounded-xl font-semibold hover:from-[#c73e3e] hover:to-[#7b2ff2] focus:outline-none focus:ring-2 focus:ring-[#E04848] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Registering..." : "Register"}
            </button>

            {/* Error & Success Messages */}
            {mutation.isError && <p className="text-red-500 text-sm mt-2">{mutation.error.message}</p>}
            {mutation.isSuccess && <p className="text-green-500 text-sm mt-2">Registration successful!</p>}
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#E04848] font-medium hover:underline">
              Sign In
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
              <span className="inline-block animate-slide-in-left" style={{ animationDelay: '0.2s' }}>Create</span>{' '}
              <span className="inline-block animate-slide-in-right" style={{ animationDelay: '0.4s' }}>Account</span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Register to access exclusive features, manage your bookings, and enjoy seamless travel with GoBus.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 animate-slide-in-right" style={{ animationDelay: '0.8s' }}>
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                  <FaCheck className="text-white text-xs" />
                </div>
                <span className="text-white/90">Easy and secure registration</span>
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
                <span className="text-white font-medium">Ready to Explore?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
