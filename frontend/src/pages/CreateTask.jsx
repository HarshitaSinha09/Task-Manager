import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    await API.post("/tasks", { title });
    navigate("/tasks");
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300">

    <div className="backdrop-blur-lg bg-white/60 border border-white/40 p-8 rounded-2xl shadow-xl w-96">

      {/* 🌈 TITLE */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        ➕ Create Task
      </h1>

      {/* INPUT */}
      <input
        className="w-full p-3 mb-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* BUTTON */}
      <button
        onClick={handleCreate}
        className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
      >
        Add Task
      </button>

      {/* BACK */}
      <button
        onClick={() => navigate("/tasks")}
        className="w-full mt-3 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
      >
        Back
      </button>

    </div>
  </div>
);
};

export default CreateTask;