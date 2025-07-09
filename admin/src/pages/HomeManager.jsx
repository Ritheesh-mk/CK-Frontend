import React, { useState, useEffect } from 'react';
import { Plus, X, Star, Trash2, Edit2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';

const HomeManager = () => {
  // State for alert banner
  const [alertBanner, setAlertBanner] = useState({
    message: '',
    couponCode: '',
    expiresAt: ''
  });
  const [hasActiveBanner, setHasActiveBanner] = useState(false);

  // State for home products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    _id: null,
    name: '',
    tamilName: '',
    description: '',
    image: null,
    price: '',
    pricePerKg: '',
    weight: '500g',
    rating: 5,
    position: 1
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch alert banner
      const bannerRes = await fetch('http://localhost:5000/api/alert-banner');
      const bannerData = await bannerRes.json();
      if (bannerData._id) {
        setAlertBanner({
          message: bannerData.message,
          couponCode: bannerData.couponCode,
          expiresAt: new Date(bannerData.expiresAt).toISOString().split('T')[0]
        });
        setHasActiveBanner(true);
      }

      // Fetch products
      const productsRes = await fetch('http://localhost:5000/api/home-products');
      const productsData = await productsRes.json();
      setProducts(productsData);
    } catch (error) {
      toast.error('Failed to load data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Alert banner handlers
  const handleBannerChange = (e) => {
    const { name, value } = e.target;
    setAlertBanner(prev => ({ ...prev, [name]: value }));
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/alert-banner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...alertBanner,
          expiresAt: new Date(alertBanner.expiresAt).toISOString()
        })
      });

      if (res.ok) {
        toast.success('Alert banner updated!');
        setHasActiveBanner(true);
        fetchData();
      } else {
        toast.error('Failed to update banner');
      }
    } catch (error) {
      toast.error('Network error');
      console.error(error);
    }
  };

  const handleRemoveBanner = async () => {
    if (window.confirm('Are you sure you want to remove the alert banner?')) {
      try {
        const res = await fetch('http://localhost:5000/api/alert-banner', {
          method: 'DELETE'
        });

        if (res.ok) {
          toast.success('Alert banner removed');
          setHasActiveBanner(false);
          setAlertBanner({
            message: '',
            couponCode: '',
            expiresAt: ''
          });
        }
      } catch (error) {
        toast.error('Failed to remove banner');
        console.error(error);
      }
    }
  };

  // Product handlers
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentProduct(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('name', currentProduct.name);
      formData.append('tamilName', currentProduct.tamilName);
      formData.append('description', currentProduct.description);
      formData.append('price', currentProduct.price);
      formData.append('pricePerKg', currentProduct.pricePerKg);
      formData.append('weight', currentProduct.weight);
      formData.append('rating', currentProduct.rating);
      formData.append('position', currentProduct.position);
      
      if (currentProduct.image) {
        formData.append('image', currentProduct.image);
      }
      
      const url = currentProduct._id 
        ? `http://localhost:5000/api/home-products/${currentProduct._id}`
        : 'http://localhost:5000/api/home-products';
      const method = currentProduct._id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        body: formData
      });
      
      if (res.ok) {
        toast.success(currentProduct._id ? 'Product updated!' : 'Product created!');
        fetchData();
        resetProductForm();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Error saving product');
      }
    } catch (error) {
      toast.error('Network error');
      console.error(error);
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct({
      _id: product._id,
      name: product.name,
      tamilName: product.tamilName,
      description: product.description,
      image: null,
      price: product.price,
      pricePerKg: product.pricePerKg,
      weight: product.weight,
      rating: product.rating,
      position: product.position
    });
    setImagePreview(product.image);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/home-products/${id}`, {
          method: 'DELETE'
        });
        
        if (res.ok) {
          toast.success('Product deleted');
          fetchData();
        } else {
          toast.error('Delete failed');
        }
      } catch (error) {
        toast.error('Network error');
      }
    }
  };

  const resetProductForm = () => {
    setCurrentProduct({
      _id: null,
      name: '',
      tamilName: '',
      description: '',
      image: null,
      price: '',
      pricePerKg: '',
      weight: '500g',
      rating: 5,
      position: 1
    });
    setImagePreview(null);
    setShowProductForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Home Page Manager</h1>
      
      {/* Alert Banner Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Alert Banner</h2>
          {hasActiveBanner && (
            <button
              onClick={handleRemoveBanner}
              className="text-red-600 hover:text-red-800 flex items-center"
            >
              <Trash2 size={18} className="mr-1" /> Remove Banner
            </button>
          )}
        </div>
        
        <form onSubmit={handleBannerSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Message *
              </label>
              <input
                type="text"
                name="message"
                value={alertBanner.message}
                onChange={handleBannerChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="e.g., LIMITED TIME OFFER: Get 20% OFF on bulk orders above ₹5000!"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Code *
              </label>
              <input
                type="text"
                name="couponCode"
                value={alertBanner.couponCode}
                onChange={handleBannerChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="e.g., BULK20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="date"
                name="expiresAt"
                value={alertBanner.expiresAt}
                onChange={handleBannerChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-medium"
            >
              {hasActiveBanner ? 'Update Banner' : 'Create Banner'}
            </button>
          </div>
        </form>
        
        {hasActiveBanner && (
          <div className="mt-6 p-4 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="mr-2" />
              <span>Preview: {alertBanner.message} Use code: {alertBanner.couponCode}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Featured Products Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Featured Products (Max 3)</h2>
          <button
            onClick={() => {
              resetProductForm();
              setShowProductForm(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded flex items-center"
          >
            <Plus size={18} className="mr-1" /> Add Product
          </button>
        </div>
        
        {showProductForm && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {currentProduct._id ? 'Edit Product' : 'Add New Product'}
            </h3>
            
            <form onSubmit={handleProductSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentProduct.name}
                    onChange={handleProductChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="e.g., Sambar Powder"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tamil Name *
                  </label>
                  <input
                    type="text"
                    name="tamilName"
                    value={currentProduct.tamilName}
                    onChange={handleProductChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="e.g., சாம்பார் பொடி"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={currentProduct.description}
                    onChange={handleProductChange}
                    required
                    rows="3"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Short description of the product"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Image *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required={!currentProduct._id}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleProductChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="e.g., 249"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price per kg (₹) *
                  </label>
                  <input
                    type="number"
                    name="pricePerKg"
                    value={currentProduct.pricePerKg}
                    onChange={handleProductChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="e.g., 498"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight *
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={currentProduct.weight}
                    onChange={handleProductChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="e.g., 500g"
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
                        onClick={() => setCurrentProduct(prev => ({ ...prev, rating: star }))}
                        className="mr-1 focus:outline-none"
                      >
                        <Star
                          size={20}
                          className={star <= currentProduct.rating 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position (1-3) *
                  </label>
                  <select
                    name="position"
                    value={currentProduct.position}
                    onChange={handleProductChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="1">Position 1</option>
                    <option value="2">Position 2</option>
                    <option value="3">Position 3</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-medium"
                >
                  {currentProduct._id ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetProductForm}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No featured products added yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product._id} className="border rounded-lg p-4">
                <div className="h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No image
                    </div>
                  )}
                </div>
                
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.tamilName}</p>
                <p className="text-sm mt-2">{product.description}</p>
                
                <div className="mt-3 flex items-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= product.rating 
                        ? "text-yellow-400 fill-current mr-0.5" 
                        : "text-gray-300 mr-0.5"
                      }
                    />
                  ))}
                  <span className="ml-1 text-sm">{product.rating}</span>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold">₹{product.price}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeManager;