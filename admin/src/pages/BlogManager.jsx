import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X, Video, Upload } from 'lucide-react';
import { toast } from 'sonner';

const API_BASE = import.meta.env.VITE_BASE_API;

const BlogManager = () => {
  const [blog, setBlog] = useState({
    _id: null,
    title: "",
    video: null,
    category: "",
  });

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [categories] = useState([
    "Powders",
    "Whole Spices",
    "Blends",
    "Specialty",
    "Organic",
    "Regional"
  ]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/blogs`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setBlogs(data);
      } else {
        console.error("Expected array but got:", typeof data);
        setBlogs([]);
        toast.error("Invalid data format received");
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
      toast.error("Failed to load showcases");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
      if (!videoTypes.includes(file.type)) {
        toast.error("Please select a video file (MP4, WebM, or MOV)");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        toast.error("Video file too large. Maximum size is 50MB");
        return;
      }

      setBlog(prev => ({ ...prev, video: file }));
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog.title || !blog.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!blog.video && !blog._id) {
      toast.error("Please select a video file");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("category", blog.category);

      if (blog.video instanceof File) {
        formData.append("video", blog.video);
      }

      const url = blog._id 
        ? `${API_BASE}/blogs/${blog._id}`
        : `${API_BASE}/blogs`;
      const method = blog._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error saving showcase");
      }

      toast.success(blog._id ? "Showcase updated!" : "Showcase uploaded!");
      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Network error");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (blogToEdit) => {
    setBlog({
      _id: blogToEdit._id,
      title: blogToEdit.title,
      category: blogToEdit.category,
      video: null
    });
    setVideoPreview(blogToEdit.video ? `${API_BASE}${blogToEdit.video}` : null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this showcase?")) return;

    try {
      const res = await fetch(`${API_BASE}/blogs/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error('Delete failed');

      toast.success("Showcase deleted");
      fetchBlogs();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Network error");
    }
  };

  const resetForm = () => {
    setBlog({
      _id: null,
      title: "",
      video: null,
      category: ""
    });
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoPreview(null);
    setShowForm(false);
  };

  return (
    <div id='BlogManager' className="p-6 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-emerald-800">Spice Showcase Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg flex items-center shadow-md transition-all"
        >
          {showForm ? <X size={18} className="mr-1" /> : <Plus size={18} className="mr-1" />}
          {showForm ? "Cancel" : "Add Showcase"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Video className="mr-2" size={20} />
            {blog._id ? "Edit Product Showcase" : "New Product Showcase"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-emerald-800 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="title"
                  value={blog.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., Premium Turmeric Powder"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-800 mb-1">Category *</label>
                <select
                  name="category"
                  value={blog.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-emerald-800 mb-1">Showcase Video *</label>
                <div className="border-2 border-dashed border-emerald-300 rounded-xl p-4 text-center cursor-pointer hover:bg-emerald-50 transition-colors relative">
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={handleVideoChange}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center py-8">
                    <Upload className="text-emerald-600 mb-2" size={30} />
                    <p className="text-emerald-700 font-medium">Click to upload video</p>
                    <p className="text-sm text-gray-500 mt-2">Max size: 50MB. Supported: MP4, WebM, MOV</p>
                  </div>
                </div>

                {videoPreview && (
                  <div className="mt-6 flex justify-center">
                    <video
                      src={videoPreview}
                      className="w-full max-w-md h-48 object-contain rounded-xl border border-emerald-200 bg-black"
                      controls
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white px-8 py-3 rounded-lg font-medium flex items-center shadow-md transition-all"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {blog._id ? "Updating..." : "Uploading..."}
                  </>
                ) : (
                  <>
                    <Upload size={18} className="mr-2" />
                    {blog._id ? "Update Showcase" : "Upload Showcase"}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={uploading}
                className="border border-emerald-300 text-emerald-700 px-8 py-3 rounded-lg font-medium hover:bg-emerald-50 disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100">
        <table className="min-w-full divide-y divide-emerald-100">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">Video</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">Upload Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-emerald-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                  </div>
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No showcases found</td>
              </tr>
            ) : (
              blogs.map(blog => (
                <tr key={blog._id} className="hover:bg-emerald-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-emerald-900">{blog.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-block bg-emerald-100 rounded-full px-3 py-1 text-xs font-semibold text-emerald-800">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {blog.video ? (
                      <span className="flex items-center text-emerald-600 font-medium">
                        <Video size={16} className="mr-1" /> Available
                      </span>
                    ) : (
                      <span className="text-gray-400">No video</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-emerald-600 hover:text-emerald-800 mr-4 p-2 rounded-full hover:bg-emerald-100 transition-colors"
                      aria-label="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogManager;
