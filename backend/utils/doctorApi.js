import axios from "axios";

const DoctorAPI = axios.create({
  baseURL: `${process.env.BACKEND_URL}/doctors/auth`,
  headers: { "Content-Type": "application/json" },
});

DoctorAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem("doctorToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerDoctor = (doctorData) => DoctorAPI.post("/register", doctorData);
export const loginDoctor = (doctorData) => DoctorAPI.post("/login", doctorData);
export const logoutDoctor = () => DoctorAPI.post("/logout");
export const fetchDoctorProfile = () => DoctorAPI.get("/me");
