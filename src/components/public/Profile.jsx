import React, { useState, useEffect } from "react";
import { User, Mail, Lock } from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  // Simulate fetching user data
  useEffect(() => {
    // Replace with API call to fetch user data
    const fetchData = async () => {
      const fakeUserData = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "********",
      };
      setUserData(fakeUserData);
    };
    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Saving changes...");

    // Simulate an API call to save changes
    setTimeout(() => {
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    }, 2000);
  };

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Header */}
        <h1 className="text-2xl font-bold text-purple-700 text-center mb-4">Profile Settings</h1>

        {/* Success Message */}
        {message && (
          <div className="mb-4 p-2 text-green-700 bg-green-200 text-center rounded">
            {message}
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border p-2 rounded-md bg-gray-100">
            <User size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border p-2 rounded-md bg-gray-100">
            <Mail size={18} className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border p-2 rounded-md bg-gray-100">
            <Lock size={18} className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
