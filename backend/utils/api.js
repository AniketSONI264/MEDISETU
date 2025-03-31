import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Backend URL
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token for authenticated requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (userData) => API.post("/register", userData);
export const loginUser = (userData) => API.post("/login", userData);
