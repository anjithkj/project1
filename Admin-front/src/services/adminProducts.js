import { API } from "./api";

export const getAllProductsAPI = () => API.get("/products");

export const addProductAPI = (formData) =>
  API.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
