import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../features/adminSlice";  // FIXED IMPORT
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.admin);

  const [data, setData] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();

    const res = await dispatch(adminLogin(data));  // FIXED ACTION NAME

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 shadow rounded">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>

      <form className="space-y-4" onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          className="bg-blue-600 text-white w-full p-3 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
