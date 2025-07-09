import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Star, Package, Plus, X, Eye } from "lucide-react";
import ProductList from "./Products";
import { toast } from "react-toastify";
import Select from "react-select";

const API_BASE = import.meta.env.VITE_BASE_API;

const ProductManager = () => {
  const [product, setProduct] = useState({
    _id: null,
    name: "",
    description: "",
    category: "",
    image: null,
    packaging: [],
    rating: "",
    reviews: "",
    featured: false,
  });
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const packagingOptions = [
    { value: "100g", label: "100g" },
    { value: "250g", label: "250g" },
    { value: "500g", label: "500g" },
    { value: "1kg", label: "1kg" },
    { value: "5kg", label: "5kg" },
    { value: "25kg", label: "25kg" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (res.ok) {
        setProducts(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Network error: failed to load products");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    product.packaging.forEach(pkg => formData.append("packaging[]", pkg));
    formData.append("rating", product.rating || "");
    formData.append("reviews", product.reviews || "");
    formData.append("featured", product.featured);

    if (product.image) formData.append("image", product.image);

    const url = product._id
      ? `${API_BASE}/products/${product._id}`
      : `${API_BASE}/products`;
    const method = product._id ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formData });
      const message = product._id
        ? "✅ Product updated successfully!"
        : "✅ Product added successfully!";
      if (res.ok) {
        toast.success(message);
        resetForm();
        fetchProducts();
      } else {
        const errorData = await res.json();
        toast.error(`❌ Failed: ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      toast.error("❌ Network error: couldn't reach the server");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = prod => {
    setProduct({
      _id: prod._id,
      name: prod.name || "",
      description: prod.description || "",
      category: prod.category || "",
      image: null,
      packaging: prod.packaging || [],
      rating: prod.rating || "",
      reviews: prod.reviews || "",
      featured: prod.featured || false,
    });
    setImagePreview(prod.image);
    setShowForm(true);
  };

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("✅ Product deleted successfully!");
        fetchProducts();
      } else {
        toast.error("❌ Failed to delete product");
      }
    } catch (error) {
      toast.error("❌ Network error: couldn't reach the server");
      console.error("Network error:", error);
    }
  };

  const handleView = prod => {
    toast.info(`👁️ Viewing: ${prod.name}`);
  };

  const resetForm = () => {
    setProduct({
      _id: null,
      name: "",
      description: "",
      category: "",
      image: null,
      packaging: [],
      rating: "",
      reviews: "",
      featured: false,
    });
    setImagePreview(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">CK Masala Products</h1>
        <p className="text-gray-600">Manage your product inventory</p>
      </header>

      <div className="mb-6">
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? "Cancel" : "Add New Product"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            {product._id ? "Edit Product" : "Add New Product"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Product name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                placeholder="E.g., Garam Masala"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select Category</option>
                {ProductList.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2 flex flex-col">
              <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Product details and benefits"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Image upload */}
            <div className="flex flex-col">
              <label htmlFor="image" className="text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded border mt-2" />
              )}
            </div>

            {/* Packaging */}
            <div className="flex flex-col">
              <label htmlFor="packaging" className="text-sm font-medium text-gray-700 mb-1">
                Packaging Options
              </label>
              <Select
                options={packagingOptions}
                isMulti
                value={packagingOptions.filter(opt => product.packaging.includes(opt.value))}
                onChange={selected => 
                  setProduct(prev => ({ ...prev, packaging: selected.map(o => o.value) }))
                }
                placeholder="Select packaging types..."
              />
            </div>

            {/* Rating */}
            <div className="flex flex-col">
              <label htmlFor="rating" className="text-sm font-medium text-gray-700 mb-1">
                Rating (1–5)
              </label>
              <input
                id="rating"
                type="number"
                name="rating"
                min="1" max="5" step="0.1"
                value={product.rating}
                onChange={handleChange}
                placeholder="4.5"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Reviews Count */}
            <div className="flex flex-col">
              <label htmlFor="reviews" className="text-sm font-medium text-gray-700 mb-1">
                Reviews Count
              </label>
              <input
                id="reviews"
                type="number"
                name="reviews"
                min="0"
                value={product.reviews}
                onChange={handleChange}
                placeholder="120"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Featured checkbox */}
            <div className="flex items-center mt-2">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={product.featured}
                onChange={handleChange}
                className="h-5 w-5 text-amber-600 focus:ring-amber-500 rounded"
              />
              <label htmlFor="featured" className="ml-2 text-gray-700">
                Mark as Featured Product
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 py-3 px-4 rounded font-medium text-white ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {isSubmitting
                ? product._id ? "Updating..." : "Adding..."
                : product._id ? "Update Product" : "Add Product"
              }
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Package size={24} />
            All Products ({products.length})
          </h2>
        </div>

        {products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Package size={48} className="mx-auto opacity-50 mb-4" />
            <p>No products found. Add your first product to get started!</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th>Name</th><th>Image</th><th>Category</th><th>Packaging</th><th>Rating</th><th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(prod => (
                <tr key={prod._id}>
                  <td className="px-6 py-4 text-sm">{prod.name}</td>
                  <td className="px-6 py-4 text-sm">
                    {prod.image ? <img src={`${API_BASE}/${prod.image}`} alt={prod.name} className="w-12 h-12 object-cover rounded" /> : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm">{prod.category || "N/A"}</td>
                  <td className="px-6 py-4 text-sm">{(prod.packaging || []).join(", ") || "N/A"}</td>
                  <td className="px-6 py-4 text-sm">{prod.rating ? `${prod.rating} (${prod.reviews || 0} reviews)` : "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button onClick={() => handleView(prod)} className="text-blue-600 hover:text-blue-800 mr-2"><Eye size={16} /></button>
                    <button onClick={() => handleEdit(prod)} className="text-blue-600 hover:text-blue-800 mr-2"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(prod._id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductManager;
