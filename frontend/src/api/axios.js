import axios from "axios";
 
const API = axios.create({
  baseURL: "https://task-manager-production-62da.up.railway.app/api",
});
 
// Attach token automatically to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
 
  return req;
});
 
export default API;
 
