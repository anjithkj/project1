import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../features/adminSlice";
import React from "react";
export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(adminLogout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <div className="flex gap-6 text-lg">
        <Link to="/">Dashboard</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/completed-orders">Completed</Link>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
