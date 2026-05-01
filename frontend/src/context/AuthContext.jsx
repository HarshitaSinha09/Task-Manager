import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // { id, name, email, role, ... }
  const [loading, setLoading] = useState(true);

  // On mount, if token exists fetch the actual user object
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/dashboard/user")
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Call this after login or register — saves token then fetches user info
const login = async (token) => {
  localStorage.setItem("token", token);       
  const res = await API.get("/dashboard/user");
  setUser(res.data);                        
};

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};