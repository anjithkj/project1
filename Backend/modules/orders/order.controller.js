import Order from "./order.model.js";

// GET PENDING ORDERS
export const getOrders = async (req, res) => {
  const orders = await Order.find({ status: "pending" }).sort({ createdAt: -1 });
  res.json(orders);
};

// GET COMPLETED ORDERS
export const getCompletedOrders = async (req, res) => {
  const orders = await Order.find({ status: "completed" }).sort({ createdAt: -1 });
  res.json(orders);
};

// MARK ORDER AS COMPLETED
export const completeOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) return res.status(404).json("Order not found");

  order.status = "completed";
  await order.save();

  res.json({ message: "Order marked as completed" });
};
