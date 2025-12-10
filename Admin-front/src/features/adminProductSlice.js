import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

// ADD PRODUCT
export const addProduct = createAsyncThunk(
  "products/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add product");
    }
  }
);

// FETCH ALL PRODUCTS
export const fetchAdminProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/products");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch products");
    }
  }
);

// DELETE PRODUCT
export const deleteProductAPI = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/products/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete product");
    }
  }
);

// TOGGLE STOCK
export const toggleStockAPI = createAsyncThunk(
  "products/toggleStock",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/products/${id}/stock`);
      return { id, inStock: res.data.inStock };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update stock");
    }
  }
);

// UPDATE PRODUCT
export const updateProductAPI = createAsyncThunk(
  "products/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update");
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    list: [],
    loading: false,
    error: null,
    success: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });

    builder.addCase(fetchAdminProducts.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(deleteProductAPI.fulfilled, (state, action) => {
      state.list = state.list.filter((p) => p._id !== action.payload);
    });

    builder.addCase(toggleStockAPI.fulfilled, (state, action) => {
      const product = state.list.find((p) => p._id === action.payload.id);
      if (product) product.inStock = action.payload.inStock;
    });

    builder.addCase(updateProductAPI.fulfilled, (state, action) => {
      const index = state.list.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) state.list[index] = action.payload;
    });
  },
});

export default adminProductSlice.reducer;
