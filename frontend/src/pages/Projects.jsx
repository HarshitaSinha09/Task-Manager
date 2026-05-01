import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      alert("Access Denied (Admin only)");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!name || !description) {
      alert("Fill all fields");
      return;
    }

    try {
      await API.post("/projects", {
        name,
        description,
      });

      setName("");
      setDescription("");

      fetchProjects();
    } catch (err) {
      alert("Only Admin can create project");
    }
  };

  const changeStatus = async (id, currentStatus) => {
    let nextStatus;

    if (currentStatus === "TODO") {
      nextStatus = "IN_PROGRESS";
    } else if (currentStatus === "IN_PROGRESS") {
      nextStatus = "DONE";
    } else {
      return;
    }

    try {
      await API.put(`/projects/${id}/status`, null, {
        params: { status: nextStatus },
      });

      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="min-h-screen p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300">

    {/* 🌈 HEADER */}
    <div className="mb-10">
      <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm">
        🌈 Project Dashboard
      </h1>
      <p className="text-gray-700 mt-2">
        Organize, track and manage your projects beautifully ✨
      </p>
    </div>

    {/*  CREATE PROJECT */}
    <div className="backdrop-blur-lg bg-white/60 border border-white/40 p-5 rounded-2xl shadow-xl flex gap-3 mb-10">
      <input
        className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={createProject}
        className="px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
      >
        Add
      </button>
    </div>

    {/*  PROJECTS */}
    {loading ? (
      <p className="text-gray-700">Loading Projects...</p>
    ) : (
      <div className="grid grid-cols-3 gap-8">
        {projects.map((p) => (
          <div
            key={p.id}
            className="backdrop-blur-lg bg-white/60 border border-white/40 p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02] transition duration-300"
          >
            {/*  TITLE */}
            <h2 className="font-bold text-lg text-gray-800">
              {p.name}
            </h2>
            <p className="text-gray-600 text-sm">{p.description}</p>

            {/*  STATUS */}
            <div className="mt-4">
              <span className="text-sm text-gray-600">Status: </span>

              <span
                className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${
                  p.status === "TODO"
                    ? "bg-blue-200 text-blue-800"
                    : p.status === "IN_PROGRESS"
                    ? "bg-yellow-300 text-yellow-900"
                    : "bg-green-300 text-green-900"
                }`}
              >
                {p.status}
              </span>
            </div>

            {/*  BUTTONS */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => changeStatus(p.id, p.status)}
                className="py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-105 transition"
              >
                Change Status
              </button>

              <button
                onClick={async () => {
                  await API.delete(`/projects/${p.id}`);
                  fetchProjects();
                }}
                className="py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}
export default Projects;
