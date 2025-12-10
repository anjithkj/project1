import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompletedOrders } from "../features/adminOrderSlice";
import React from "react";
export default function CompletedOrders() {
  const dispatch = useDispatch();
  const { completedOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchCompletedOrders());
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Completed Orders</h1>

      <div className="space-y-4">
        {completedOrders.map((o) => (
          <div key={o._id} className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-bold">Order #{o._id}</h2>
            <p>Total: ₹{o.amount}</p>
            <p>Status: Completed</p>
          </div>
        ))}
      </div>
    </div>
  );
}
