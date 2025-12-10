import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  updateProductAPI,
} from "../features/adminProductSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.products);

  const [product, setProduct] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchAdminProducts());
    } else {
      const found = list.find((p) => p._id === id);
      setProduct(found);
    }
  }, [list, dispatch, id]);

  if (!product) return <p>Loading product...</p>;

  const submit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", product.title);
    form.append("slug", product.slug);
    form.append("category", product.category);
    form.append("price", product.price);
    form.append("description", product.description);

    if (newImage) form.append("image", newImage);

    const res = await dispatch(updateProductAPI({ id, formData: form }));

    if (!res.error) {
      alert("Product updated");
      navigate("/products");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={submit} className="space-y-4">
        <input className="border w-full p-3 rounded"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />

        <input className="border w-full p-3 rounded"
          value={product.slug}
          onChange={(e) => setProduct({ ...product, slug: e.target.value })}
        />

        <input className="border w-full p-3 rounded"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />

        <input className="border w-full p-3 rounded"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />

        <textarea className="border w-full p-3 rounded" rows="4"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        ></textarea>

        <img src={product.image} className="h-40 object-cover rounded" />

        <input type="file" className="border w-full p-3 rounded"
          onChange={(e) => setNewImage(e.target.files[0])}
        />

        <button className="bg-blue-600 text-white w-full p-3 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
