import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts } from "../features/adminProductSlice";
import {
  fetchOrders,
  fetchCompletedOrders,
} from "../features/adminOrderSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { list: productList } = useSelector((state) => state.products);
  const { newOrders, completedOrders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchOrders());
    dispatch(fetchCompletedOrders());
  }, [dispatch]);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Products */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold">Total Products</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {productList.length}
          </p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold">Pending Orders</h2>
          <p className="text-4xl font-bold text-yellow-600 mt-2">
            {newOrders.length}
          </p>
        </div>

        {/* Completed Orders */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold">Completed Orders</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {completedOrders.length}
          </p>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="mt-10 bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

        {newOrders.length === 0 && completedOrders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (

          <div className="space-y-4">
            {[...newOrders, ...completedOrders]
              .slice(0, 5)
              .map((order) => (
                <div
                  key={order._id}
                  className="border p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">Order ID: {order._id}</p>
                    <p>Total: ₹{order.totalAmount}</p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded text-white ${
                      order.status === "completed"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
