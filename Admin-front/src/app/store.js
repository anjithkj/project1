import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/adminSlice";
import productReducer from "../features/adminProductSlice";
import orderReducer from "../features/adminOrderSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    products: productReducer,
    orders: orderReducer,
  },
});
