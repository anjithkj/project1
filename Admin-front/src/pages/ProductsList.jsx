import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  deleteProductAPI,
  toggleStockAPI,
} from "../features/adminProductSlice";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  if (loading) return <p className="p-8 text-xl">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((p) => (
          <div key={p._id} className="border p-4 shadow rounded bg-white">
            <img src={p.image} className="h-48 w-full object-cover rounded" />

            <h2 className="text-xl font-bold mt-2">{p.title}</h2>
            <p className="text-gray-700">₹{p.price}</p>
            <p className="text-gray-600">Category: {p.category}</p>
            <p className="text-gray-500">Slug: {p.slug}</p>

            <p
              className={`mt-2 font-semibold ${
                p.inStock ? "text-green-700" : "text-red-700"
              }`}
            >
              {p.inStock ? "In Stock" : "Out of Stock"}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => dispatch(toggleStockAPI(p._id))}
                className="bg-yellow-500 text-white px-3 py-2 rounded"
              >
                {p.inStock ? " Out Of Stock" : "in Stock"}
              </button>

              <button
                onClick={() => navigate(`/edit-product/${p._id}`)}
                className="bg-blue-600 text-white px-3 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  if (window.confirm("Delete product?")) {
                    dispatch(deleteProductAPI(p._id));
                  }
                }}
                className="bg-red-600 text-white px-3 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
