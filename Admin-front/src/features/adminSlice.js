import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

// ------------------------
// ADMIN LOGIN API
// ------------------------
export const adminLogin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await API.post("/admin/login", { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

// ------------------------
// GET AUTH FROM LOCAL STORAGE
// ------------------------
const savedAdmin = JSON.parse(localStorage.getItem("adminAuth")) || {
  token: null,
  admin: null,
};

// ------------------------
// SLICE
// ------------------------
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    token: savedAdmin.token,
    admin: savedAdmin.admin,
    loading: false,
    error: null,
  },

  reducers: {
    adminLogout: (state) => {
      state.token = null;
      state.admin = null;
      localStorage.removeItem("adminAuth");
    },
  },

  extraReducers: (builder) => {
    // -------------------
    // LOGIN
    // -------------------
    builder.addCase(adminLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.admin = action.payload.admin;

      // Save to local storage
      localStorage.setItem(
        "adminAuth",
        JSON.stringify({
          token: action.payload.token,
          admin: action.payload.admin,
        })
      );
    });

    builder.addCase(adminLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed";
    });
  },
});

// ------------------------
// EXPORTS
// ------------------------
export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
