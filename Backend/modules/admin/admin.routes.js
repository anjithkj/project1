import express from "express";
import { createAdmin, adminLogin } from "./admin.controller.js";

const router = express.Router();

// Create admin (use one time only, then DELETE this route)
router.post("/create", createAdmin);

// Login admin
router.post("/login", adminLogin);

export default router;
