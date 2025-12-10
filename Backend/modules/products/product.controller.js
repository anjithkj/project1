import Product from "./product.model.js";
import cloudinary from "../../config/cloudinary.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { title, price, description, category, slug } = req.body;

    if (!req.file) return res.status(400).json("Image required");

    const uploaded = await cloudinary.uploader.upload(req.file.path);

    const product = await Product.create({
      title,
      price,
      description,
      category,
      slug,
      image: uploaded.secure_url,
    });

    res.json({
      message: "Product created",
      product,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json("Product deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    let { title, price, description, category, slug } = req.body;

// Auto-generate slug if missing
if (!slug || slug.trim() === "") {
  slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}


    let updateData = { title, price, description, category, slug };

    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path);
      updateData.image = uploaded.secure_url;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// TOGGLE STOCK
export const toggleStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    product.inStock = !product.inStock;
    await product.save();

    res.json({ message: "Stock updated", inStock: product.inStock });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
