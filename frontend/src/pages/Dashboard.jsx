import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300">

    {/* 🌈 NAVBAR */}
    <nav className="backdrop-blur-lg bg-white/60 border border-white/40 shadow-md p-4 flex justify-between items-center rounded-b-2xl">
      <h1 className="text-2xl font-extrabold text-gray-800">
        🚀 Task Manager
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">
          {user?.name}
          <span
            className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
              isAdmin
                ? "bg-purple-200 text-purple-800"
                : "bg-blue-200 text-blue-800"
            }`}
          >
            {user?.role}
          </span>
        </span>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
        >
          Logout
        </button>
      </div>
    </nav>

    {/* 📊 MAIN */}
    <div className="p-10 max-w-6xl mx-auto">

      {/* HEADER */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
        📊 Dashboard
      </h1>
      <p className="text-gray-700 mb-8 text-sm">
        Overview of your tasks and productivity
      </p>

      {error && (
        <div className="bg-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* 📦 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="backdrop-blur-lg bg-white/60 border border-white/40 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <p className="text-gray-600 text-sm font-semibold uppercase">
            Total Tasks
          </p>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {data.total}
          </p>
        </div>

        <div className="backdrop-blur-lg bg-white/60 border border-white/40 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <p className="text-gray-600 text-sm font-semibold uppercase">
            Completed
          </p>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {data.completed}
          </p>
        </div>

        <div className="backdrop-blur-lg bg-white/60 border border-white/40 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <p className="text-gray-600 text-sm font-semibold uppercase">
            Pending
          </p>
          <p className="text-4xl font-bold text-yellow-600 mt-2">
            {data.pending}
          </p>
        </div>

      </div>

      {/* 🔘 ACTION BUTTONS */}
      <div className="flex gap-4 flex-wrap">

        {isAdmin && (
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
          >
            Manage Projects
          </button>
        )}

        <button
          onClick={() => navigate("/tasks/create")}
          className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-teal-500 hover:scale-105 transition"
        >
          Create Task
        </button>

        <button
          onClick={() => navigate("/tasks")}
          className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-gray-600 to-gray-800 hover:scale-105 transition"
        >
          {isAdmin ? "All Tasks" : "My Tasks"}
        </button>

      </div>
    </div>
  </div>
);
};

export default Dashboard;