import React, { useState, useEffect } from "react";
import axios from "axios";

// API base URL
const API_BASE_URL = "http://localhost:3000/api/v1/auth";

const Settings = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Please log in.");
          return;
        }

        const { data } = await axios.get(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData({
          name: data.data.name,
          email: data.data.email,
          password: "", // Password should not be pre-filled for security
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Please log in.");
        return;
      }

      await axios.put(
        `${API_BASE_URL}/update`,
        { name: userData.name, password: userData.password }, // Only allow updating name & password
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center text-purple-600 font-bold mb-4">Settings</h1>

      {message && <div className="mb-4 p-2 text-green-700 bg-green-200 rounded">{message}</div>}
      {error && <div className="mb-4 p-2 text-red-700 bg-red-200 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>

        {/* Email (Disabled) */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
          <p className="text-xs text-gray-500">Email cannot be changed.</p>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter new password (optional)"
            className={`w-full p-2 border rounded ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
          <p className="text-xs text-gray-500">Leave empty to keep current password.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-400">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Settings;
