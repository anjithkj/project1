import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/adminProductSlice";

export default function AddProduct() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    slug: "",
  });

  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", data.title);
    form.append("price", data.price);
    form.append("description", data.description);
    form.append("category", data.category);
    form.append("slug", data.slug);
    form.append("image", image);

    await dispatch(addProduct(form));
    alert("Product Added");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <form onSubmit={submit} className="space-y-4">
        <input className="border w-full p-3 rounded" placeholder="Title"
        onChange={(e) => {
  const title = e.target.value;
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  setData({ ...data, title, slug });
}}

        />

      

        <input className="border w-full p-3 rounded" placeholder="Category"
          onChange={(e) => setData({ ...data, category: e.target.value })}
        />

        <input className="border w-full p-3 rounded" placeholder="Price"
          onChange={(e) => setData({ ...data, price: e.target.value })}
        />

        <textarea className="border w-full p-3 rounded" rows="4" placeholder="Description"
          onChange={(e) => setData({ ...data, description: e.target.value })}
        ></textarea>

        <input type="file" className="border w-full p-3 rounded"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-blue-600 text-white w-full p-3 rounded">Add Product</button>
      </form>
    </div>
  );
}
