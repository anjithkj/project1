import express from "express";
import { adminProtect } from "../../middlewares/adminMiddleware.js";
import {
  getOrders,
  getCompletedOrders,
  completeOrder,
} from "./order.controller.js";

const router = express.Router();

router.get("/", adminProtect, getOrders);
router.get("/completed", adminProtect, getCompletedOrders);
router.put("/complete/:id", adminProtect, completeOrder);

export default router;
