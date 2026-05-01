import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!data.name || !data.email || !data.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/auth/register", data);
      toast.success("Account created successfully 🎉");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300">

    <div className="backdrop-blur-lg bg-white/60 border border-white/40 p-8 rounded-2xl shadow-xl w-96">

      {/* 🌈 TITLE */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        📝 Create Account
      </h1>

      {error && (
        <div className="bg-red-200 text-red-800 px-4 py-2 rounded-lg mb-4 text-sm text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-200 text-green-800 px-4 py-2 rounded-lg mb-4 text-sm text-center">
          {success}
        </div>
      )}

      {/* 👤 NAME */}
      <input
        className="w-full p-3 mb-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Full Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        disabled={loading}
      />

      {/* 📧 EMAIL */}
      <input
        className="w-full p-3 mb-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Email"
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        disabled={loading}
      />

      {/* 🔑 PASSWORD */}
      <input
        className="w-full p-3 mb-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        disabled={loading}
      />

      {/* 🎯 ROLE */}
      <select
        className="w-full p-3 mb-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
        value={data.role}
        onChange={(e) => setData({ ...data, role: e.target.value })}
        disabled={loading}
      >
        <option value="MEMBER">Member</option>
        <option value="ADMIN">Admin</option>
      </select>

      {/* 🚀 BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition disabled:opacity-50"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {/* 🔗 LOGIN */}
      <p className="mt-5 text-center text-sm text-gray-700">
        Already have an account?{" "}
        <Link
          to="/"
          className="font-semibold text-purple-700 hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>
  </div>
);
};

export default Register;