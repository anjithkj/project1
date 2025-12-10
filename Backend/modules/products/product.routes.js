import express from "express";
import upload from "../../config/multer.js";
import { adminProtect } from "../../middlewares/authMiddleware.js";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  toggleStock,
} from "./product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", adminProtect, upload.single("image"), createProduct);
router.put("/:id", adminProtect, upload.single("image"), updateProduct);
router.delete("/:id", adminProtect, deleteProduct);
router.patch("/:id/stock", adminProtect, toggleStock);

export default router;
