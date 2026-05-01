import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!data.email || !data.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Logging in with:", data);
      const res = await API.post("/auth/login", data);
      console.log("Login response:", res.data);
      await login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300">

    <div className="backdrop-blur-lg bg-white/60 border border-white/40 p-8 rounded-2xl shadow-xl w-96">

      {/* 🌈 TITLE */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        🔐 Login
      </h1>

      {error && (
        <div className="bg-red-200 text-red-800 px-4 py-2 rounded-lg mb-4 text-sm text-center">
          {error}
        </div>
      )}

      {/* ✨ EMAIL */}
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
        className="w-full p-3 mb-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        disabled={loading}
      />

      {/* 🚀 BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* 🔗 REGISTER */}
      <p className="mt-5 text-center text-sm text-gray-700">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="font-semibold text-purple-700 hover:underline"
        >
          Register here
        </a>
      </p>
    </div>
  </div>
);
};

export default Login;