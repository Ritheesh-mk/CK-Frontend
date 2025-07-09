import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X, Star } from 'lucide-react';
import { toast } from 'react-toastify';

const TestimonialManager = () => {
  const [testimonial, setTestimonial] = useState({
    _id: null,
    name: "",
    position: "",
    business: "",
    location: "",
    content: "",
    rating: 5,
    avatar: null,
    products: [],
  });
  
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonial(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTestimonial(prev => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("name", testimonial.name);
      formData.append("position", testimonial.position);
      formData.append("business", testimonial.business);
      formData.append("location", testimonial.location);
      formData.append("content", testimonial.content);
      formData.append("rating", testimonial.rating);
      formData.append("products", JSON.stringify(testimonial.products));
      
      if (testimonial.avatar) {
        formData.append("avatar", testimonial.avatar);
      }
      
      const url = testimonial._id 
        ? `http://localhost:5000/api/testimonials/${testimonial._id}`
        : "http://localhost:5000/api/testimonials";
      const method = testimonial._id ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        body: formData
      });
      
      if (res.ok) {
        toast.success(testimonial._id ? "Testimonial updated!" : "Testimonial created!");
        fetchTestimonials();
        resetForm();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Error saving testimonial");
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);
    }
  };

  const handleEdit = (testimonialToEdit) => {
    setTestimonial({
      _id: testimonialToEdit._id,
      name: testimonialToEdit.name,
      position: testimonialToEdit.position,
      business: testimonialToEdit.business,
      location: testimonialToEdit.location,
      content: testimonialToEdit.content,
      rating: testimonialToEdit.rating,
      products: testimonialToEdit.products,
      avatar: null
    });
    setImagePreview(testimonialToEdit.avatar);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this testimonial?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
          method: "DELETE"
        });
        
        if (res.ok) {
          toast.success("Testimonial deleted");
          fetchTestimonials();
        } else {
          toast.error("Delete failed");
        }
      } catch (error) {
        toast.error("Network error");
      }
    }
  };

  const resetForm = () => {
    setTestimonial({
      _id: null,
      name: "",
      position: "",
      business: "",
      location: "",
      content: "",
      rating: 5,
      avatar: null,
      products: []
    });
    setImagePreview(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Testimonial Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded flex items-center"
        >
          {showForm ? <X size={18} className="mr-1" /> : <Plus size={18} className="mr-1" />}
          {showForm ? "Cancel" : "New Testimonial"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {testimonial._id ? "Edit Testimonial" : "Create New Testimonial"}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={testimonial.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Customer name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={testimonial.position}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Chef, Owner, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business *
                </label>
                <input
                  type="text"
                  name="business"
                  value={testimonial.business}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Restaurant or company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={testimonial.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="City, Country"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating *
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setTestimonial(prev => ({ ...prev, rating: star }))}
                      className="mr-1 focus:outline-none"
                    >
                      <Star
                        size={20}
                        className={star <= testimonial.rating 
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-16 h-16 object-cover rounded-full border"
                    />
                  </div>
                )}
              </div> */}
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Content *
                </label>
                <textarea
                  name="content"
                  value={testimonial.content}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="What they said about our products..."
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mentioned Products (comma separated)
                </label>
                <input
                  type="text"
                  value={testimonial.products.join(", ")}
                  onChange={(e) => setTestimonial(prev => ({
                    ...prev, 
                    products: e.target.value.split(",").map(p => p.trim())
                  }))}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Product 1, Product 2, ..."
                />
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-medium"
              >
                {testimonial._id ? "Update Testimonial" : "Create Testimonial"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  Loading testimonials...
                </td>
              </tr>
            ) : testimonials.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No testimonials found
                </td>
              </tr>
            ) : (
              testimonials.map(testimonial => (
                <tr key={testimonial._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.position}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {testimonial.business}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= testimonial.rating 
                            ? "text-yellow-400 fill-current mr-0.5" 
                            : "text-gray-300 mr-0.5"
                          }
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {testimonial.products.slice(0, 2).map(p => (
                      <span key={p} className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs mr-1 mb-1">
                        {p}
                      </span>
                    ))}
                    {testimonial.products.length > 2 && (
                      <span className="text-xs text-gray-400">+{testimonial.products.length - 2} more</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
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

export default TestimonialManager;