import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔄 STATUS CHANGE
  const changeStatus = async (id, currentStatus) => {
    let nextStatus;

    if (currentStatus === "TODO") nextStatus = "IN_PROGRESS";
    else if (currentStatus === "IN_PROGRESS") nextStatus = "DONE";
    else return;

    try {
      await API.put(`/tasks/${id}?status=${nextStatus}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ DELETE TASK
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300">

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        {user?.role === "ADMIN" ? "📋 All Tasks" : "🧑 My Tasks"}
      </h1>

      {/* TASK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="backdrop-blur-lg bg-white/60 border border-white/40 p-5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition"
          >
            {/* TITLE */}
            <h2 className="font-bold text-gray-800">{task.title}</h2>

            {/* STATUS */}
            <p className="mt-2 text-sm text-gray-600">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  task.status === "TODO"
                    ? "bg-blue-200 text-blue-800"
                    : task.status === "IN_PROGRESS"
                    ? "bg-yellow-300 text-yellow-900"
                    : "bg-green-300 text-green-900"
                }`}
              >
                {task.status}
              </span>
            </p>

            {/* BUTTONS */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => changeStatus(task.id, task.status)}
                className="py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
              >
                Change Status
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition"
              >
                Delete Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;