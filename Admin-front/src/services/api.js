import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const admin = JSON.parse(localStorage.getItem("adminAuth"));

  if (admin?.token) {
    config.headers.Authorization = `Bearer ${admin.token}`;
  }

  return config;
});

export default API;
