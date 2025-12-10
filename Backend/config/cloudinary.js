import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();  // Ensure env variables load

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

console.log("CLOUDINARY CONFIG LOADED:", cloudinary.config()); // IMPORTANT

export default cloudinary;
