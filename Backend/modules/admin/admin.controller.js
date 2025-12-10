import Admin from "./admin.model.js";
import generateToken from "../../utils/generateToken.js";
import { hashAdminPassword, compareAdminPassword } from "./admin.service.js";

// CREATE ADMIN (use only once)
export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await Admin.findOne({ email });

  if (exists) {
    return res.status(400).json("Admin already exists");
  }

  const hashed = await hashAdminPassword(password);

  const admin = await Admin.create({
    name,
    email,
    password: hashed
  });

  return res.json({
    message: "Admin created successfully",
    admin
  });
};

// ADMIN LOGIN
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json("Admin not found");
  }

  const match = await compareAdminPassword(password, admin.password);

  if (!match) {
    return res.status(400).json("Invalid password");
  }

  return res.json({
    message: "Login successful",
    token: generateToken(admin._id),
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email
    }
  });
};
