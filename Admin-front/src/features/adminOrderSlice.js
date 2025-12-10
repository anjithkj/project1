import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrdersAPI, getCompletedOrdersAPI } from "../services/adminOrders";

// Fetch pending orders
export const fetchOrders = createAsyncThunk("orders/new", async () => {
  const res = await getOrdersAPI();
  return res.data;
});

// Fetch completed orders
export const fetchCompletedOrders = createAsyncThunk(
  "orders/completed",
  async () => {
    const res = await getCompletedOrdersAPI();
    return res.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    newOrders: [],
    completedOrders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Pending orders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.newOrders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Completed orders
    builder.addCase(fetchCompletedOrders.fulfilled, (state, action) => {
      state.completedOrders = action.payload;
    });
  },
});

export default adminOrderSlice.reducer;
