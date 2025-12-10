import Admin from "../modules/admin/admin.model.js";
import jwt from "jsonwebtoken";

export const adminProtect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json("Not Authorized (No Token)");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) return res.status(401).json("Admin not found");

    req.admin = admin;
    next();
  } catch (e) {
    res.status(401).json("Invalid Admin Token");
  }
};
