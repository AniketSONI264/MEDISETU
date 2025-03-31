// import axios from "axios";

// // Set Backend Base URL
// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // Adjust for production
//   withCredentials : true,
//   headers: { "Content-Type": "application/json" },
// });

// // Automatically attach token for authenticated requests
// // API.interceptors.request.use((req) => {
// //   const token = localStorage.getItem("token");
// //   if (token) req.headers.Authorization = `Bearer ${token}`;
// //   return req;
// // });

// export const registerUser = (userData) => API.post("/auth/register", userData);
// export const loginUser = (userData) => API.post("/auth/login", userData);
// export const logoutUser =() => API.post("/auth/logout");
// export const getUser = () => AP.get("/auth/me");

// export const updateProfile = (profileData) => API.put("/update-profile", profileData);

// export const uploadAvatar = async (formData, userId) => 
//   return await API.post(`/upload/${userId}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   })

import axios from "axios";

// 🌐 Set Backend Base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust for production
  withCredentials: true, // ✅ Ensures cookies are sent with requests
  headers: { "Content-Type": "application/json" },
});

// 🚀 **Auth API Calls**
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const logoutUser = () => API.post("/auth/logout"); // ✅ Logout function
export const getUser = () => API.get("/auth/me"); // ✅ Get logged-in user
// 🚀 **Profile API Calls**
export const updateProfile = (profileData) => API.put("/update-profile", profileData);

// 🚀 **Avatar Upload API Call**
export const uploadAvatar = (formData, userId) =>
  API.post(`/upload/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
