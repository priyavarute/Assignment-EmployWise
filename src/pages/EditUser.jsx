import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = React.useMemo(() => location.state || {}, [location.state]);

  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    avatar: user.avatar || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user.id) {
      toast.error("Invalid user data. Redirecting...");
      navigate("/users");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, formData);
      toast.success("User updated successfully!");
      navigate("/users");
    } catch {
      toast.error("Failed to update user. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-r from-blue-200 to-purple-300">
      <ToastContainer />

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Edit User
        </h2>
        <div className="flex justify-center my-4">
          <img
            src={formData.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full shadow-md"
          />
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-600">First Name</label>
            <input
              type="text"
              name="first_name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter first name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Last Name</label>
            <input
              type="text"
              name="last_name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter last name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
