import { API } from "./api";

export const adminLoginAPI = (data) =>
  API.post("/admin/login", data);
