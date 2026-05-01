import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import { AuthContext } from "../context/AuthContext";
import Tasks from "../pages/Tasks";
import CreateTask from "../pages/CreateTask";
import Projects from "../pages/Projects";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;
  if (adminOnly && user.role !== "ADMIN") return <Navigate to="/dashboard" replace />;

  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/tasks/create"
  element={
    <ProtectedRoute>
      <CreateTask />
    </ProtectedRoute>
  }
/>
        <Route
  path="/projects"
  element={
    <ProtectedRoute adminOnly={true}>
      <Projects />
    </ProtectedRoute>
  }
/>

        
        <Route
           path="/tasks"
           element={
             <ProtectedRoute>
                <Tasks />
            </ProtectedRoute>
  }
/>

        {/* Add your Projects and Tasks pages here when you build them */}
        {/* Example:
        <Route
          path="/projects"
          element={
            <ProtectedRoute adminOnly={true}>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/create"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />
        */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;