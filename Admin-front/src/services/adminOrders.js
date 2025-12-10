import API from "./api";   // ✔ CORRECT


export const getOrdersAPI = () => API.get("/orders");
export const getCompletedOrdersAPI = () => API.get("/orders/completed");
