import React, { useState, useEffect, useRef } from 'react';
import BulkOrderDemo from "./BulkOrderModal";
import Slider1 from '../assets/Slider1.jpg';
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    mobile: '',
    address: ''
  });
  const [showBulkOrderPage, setShowBulkOrderPage] = useState(false);
  
  const videoRef = useRef(null);
  
  // Fetch products from backend
  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_API}/products`);
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          setProducts(
            data.map(product => ({
              ...product,
              price: product.price || (150 + (parseInt(product._id.slice(-4), 16) % 100))
            })
          ));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
     };

    fetchProducts();
  }, []);

  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeFilter, sortOption]);

  // Try to autoplay video with sound muted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  // Star icon component
  const StarIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" 
         className={`h-4 w-4 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
         viewBox="0 0 20 20"
         fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  // Heart icon component
  const HeartIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={`h-5 w-5 ${filled ? 'text-red-500 fill-current' : 'text-gray-400'}`}
         viewBox="0 0 20 20"
         fill="currentColor">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  );

  // Shopping bag icon for "Buy Now"
  const ShoppingBagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" 
         className="h-5 w-5 mr-2" 
         viewBox="0 0 20 20" 
         fill="currentColor">
      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v1H8V6zm0 3a1 1 0 012 0 1 1 0 11-2 0z" clipRule="evenodd" />
    </svg>
  );

  // Filter icon
  const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" 
         className="h-5 w-5 text-emerald-700" 
         viewBox="0 0 20 20" 
         fill="currentColor">
      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
    </svg>
  );

  // Chevron down icon
  const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" 
         className="h-4 w-4 text-emerald-700 pointer-events-none" 
         viewBox="0 0 20 20" 
         fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  // Check icon
  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" 
         className="h-4 w-4" 
         viewBox="0 0 20 20" 
         fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  // Leaf icon for premium quality section
  const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" 
         className="h-6 w-6 text-emerald-300" 
         viewBox="0 0 20 20" 
         fill="currentColor">
      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" clipRule="evenodd" />
    </svg>
  );

  // History icon for premium quality section
  const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" 
         className="h-6 w-6 text-emerald-300" 
         viewBox="0 0 20 20" 
         fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  );

  // Gem icon for premium quality section
  const GemIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" 
         className="h-6 w-6 text-emerald-300" 
         viewBox="0 0 20 20" 
         fill="currentColor">
      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
    </svg>
  );

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // Handle product selection for modal
  const handleProductSelect = (product) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p._id === product._id);
      if (existing) {
        return prev.map(p => 
          p._id === product._id ? {...p, quantity: p.quantity + 1} : p
        );
      }
      return [...prev, {...product, quantity: 1, weight: 0.5}]; // Default weight 0.5kg
    });
  };

  // Handle quantity changes
  const handleQuantityChange = (id, quantity) => {
    setSelectedProducts(prev => 
      prev.map(p => p._id === id ? {...p, quantity} : p)
    );
  };

  // Handle weight changes
  const handleWeightChange = (id, weight) => {
    setSelectedProducts(prev => 
      prev.map(p => p._id === id ? {...p, weight: parseFloat(weight) || 0} : p)
    );
  };

  // Handle product removal
  const handleRemoveProduct = (id) => {
    setSelectedProducts(prev => prev.filter(p => p._id !== id));
  };

  // Handle Buy Now - Open modal with product
  const handleBuyNow = (product) => {
    handleProductSelect(product);
    setShowOrderModal(true);
  };

  // Handle bulk order button
  const handleBulkOrder = () => {
    setShowBulkOrderPage(true);
  };

  // Submit order via WhatsApp
  const handleSubmitOrder = () => {
    let message = "Hello C.K Masala! I would like to place an order:\n\n";
    
    // Add customer info
    message += `Name: ${customerInfo.name}\n`;
    message += `Mobile: ${customerInfo.mobile}\n`;
    message += `Address: ${customerInfo.address}\n\n`;
    
    // Add products
    message += "Products:\n";
    selectedProducts.forEach(product => {
      message += `- ${product.name} (${product.weight}kg) x ${product.quantity}\n`;
    });
    
    // Add total calculation
    const total = selectedProducts.reduce(
      (sum, product) => sum + (product.price * product.quantity * product.weight * 2), // Assuming price is for 500g
      0
    );
    message += `\nTotal: ₹${total.toFixed(2)}`;
    
    // Generate WhatsApp URL
    const whatsappUrl = `https://wa.me/919787001188?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setShowOrderModal(false);
    setSelectedProducts([]);
    setCustomerInfo({ name: '', mobile: '', address: '' });
  };

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => 
        activeFilter === 'featured' ? product.featured : product.category === activeFilter
      );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'popular') return b.reviews - a.reviews;
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    return a.featured ? -1 : 1; // Featured first
  });

  // MOVED CONDITIONAL RENDERING AFTER ALL HOOKS
  if (showBulkOrderPage) {
    return <BulkOrderDemo onBack={() => setShowBulkOrderPage(false)} />;
  }

  return (
    <div className="font-sans bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section with Video */}
      <div className="relative bg-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        
        {/* Image Banner */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={Slider1}
              alt="Spices and Spice Mixes Banner"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center bg-emerald-700/70 px-6 py-3 rounded-full border border-emerald-500 mb-6">
                <span className="font-medium tracking-wider">PREMIUM SPICES</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Authentic Indian</span>
                <span className="block text-yellow-300 mt-2">Spices & Masalas</span>
              </h1>
              
              <p className="text-xl text-emerald-100 mt-6 max-w-2xl">
                Discover our premium range of authentic Indian spices and masalas, crafted with traditional recipes and the finest ingredients.
              </p>
              
              <div className="mt-8 flex gap-4">
                <a 
            href="#products" 
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
            Shop Now
                </a>
                <button
            onClick={handleBulkOrder}
            className="px-6 py-3 bg-yellow-500 text-emerald-900 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                >
            Bulk Orders
                </button>
              </div>
            </div>
          </div>
              </div>
              
              {/* Products Section */}
      <div id="products" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900">Our Premium Collection</h2>
            <p className="text-gray-600 mt-2">{products.length} authentic spices & masalas crafted to perfection</p>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-md border border-emerald-200 hover:shadow-lg transition-all"
            >
              <FilterIcon />
              <span className="font-medium text-emerald-900">Filters</span>
            </button>
            
            <div className="relative">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white px-5 py-3 rounded-xl shadow-md border border-emerald-200 hover:shadow-lg transition-all pl-4 pr-10 font-medium text-emerald-900 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="rating">Top Rated</option>
                <option value="popular">Most Popular</option>
                <option value="name">A to Z</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-emerald-700">
                <ChevronDownIcon />
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-emerald-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h3 className="font-bold text-emerald-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveFilter('all')}
                    className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg ${activeFilter === 'all' ? 'bg-emerald-100 text-emerald-800 font-medium' : 'hover:bg-emerald-50'}`}
                  >
                    {activeFilter === 'all' && <CheckIcon />}
                    <span>All Products</span>
                  </button>
                  <button 
                    onClick={() => setActiveFilter('masalas')}
                    className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg ${activeFilter === 'masalas' ? 'bg-emerald-100 text-emerald-800 font-medium' : 'hover:bg-emerald-50'}`}
                  >
                    {activeFilter === 'masalas' && <CheckIcon />}
                    <span>Masalas</span>
                  </button>
                  <button 
                    onClick={() => setActiveFilter('powders')}
                    className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg ${activeFilter === 'powders' ? 'bg-emerald-100 text-emerald-800 font-medium' : 'hover:bg-emerald-50'}`}
                  >
                    {activeFilter === 'powders' && <CheckIcon />}
                    <span>Powders</span>
                  </button>
                  <button 
                    onClick={() => setActiveFilter('specialty')}
                    className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg ${activeFilter === 'specialty' ? 'bg-emerald-100 text-emerald-800 font-medium' : 'hover:bg-emerald-50'}`}
                  >
                    {activeFilter === 'specialty' && <CheckIcon />}
                    <span>Specialty Blends</span>
                  </button>
                  <button 
                    onClick={() => setActiveFilter('featured')}
                    className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg ${activeFilter === 'featured' ? 'bg-emerald-100 text-emerald-800 font-medium' : 'hover:bg-emerald-50'}`}
                  >
                    {activeFilter === 'featured' && <CheckIcon />}
                    <span>Featured Products</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-emerald-900 mb-3">Weight</h3>
                <div className="space-y-2">
                  <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50">
                    <span>100g</span>
                  </button>
                  <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50">
                    <span>250g</span>
                  </button>
                  <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-emerald-100 text-emerald-800 font-medium">
                    <CheckIcon />
                    <span>500g</span>
                  </button>
                  <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50">
                    <span>1kg</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-emerald-900 mb-3">Customer Ratings</h3>
                <div className="space-y-2">
                  <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={true} />
                      ))}
                    </div>
                    <span>& above</span>
                  </button>
                  <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50">
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <StarIcon key={i} filled={true} />
                      ))}
                      <StarIcon filled={false} />
                    </div>
                    <span>& above</span>
                  </button>
                  <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50">
                    <div className="flex">
                      {[...Array(3)].map((_, i) => (
                        <StarIcon key={i} filled={true} />
                      ))}
                      {[...Array(2)].map((_, i) => (
                        <StarIcon key={i} filled={false} />
                      ))}
                    </div>
                    <span>& above</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-emerald-900 mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">₹100</span>
                    <span className="text-sm">₹500</span>
                    <span className="text-sm">₹1000</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    className="w-full accent-emerald-600"
                  />
                  <div className="flex gap-4">
                    <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                      Apply
                    </button>
                    <button className="flex-1 py-2 bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-emerald-800">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-xl">
            <p className="text-red-600 font-medium">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : (
<>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
    {sortedProducts.map(product => (
      <div 
        key={product._id} 
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
      >
                  <div className="relative">
                    {/* Product image with lazy loading */}
                    <div className="h-60 overflow-hidden">
                      <img 
                        src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'} 
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-fit transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                        }}
                      />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.featured && (
                        <div className="bg-yellow-500 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold">
                          FEATURED
                        </div>
                      )}
                      <div className="bg-emerald-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {product.weight || '500g'}
                      </div>
                    </div>
                    
                    {/* Wishlist button */}
                    <button 
                      onClick={() => toggleWishlist(product._id)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${wishlist.includes(product._id) ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
                    >
                      <HeartIcon filled={wishlist.includes(product._id)} />
                    </button>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-emerald-900">{product.name}</h3>
                        <p className="text-emerald-600 font-medium mt-1">{product.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            filled={i < Math.floor(product.rating || 4.5)} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{product.rating || 4.5} ({product.reviews || 100})</span>
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <div>
                        <span className="text-lg font-bold text-emerald-900">₹{product.price}</span>
                        <span className="text-gray-500 text-sm line-through ml-2">₹{Math.round(product.price * 1.2)}</span>
                      </div>
                      
                      <button 
                        onClick={() => handleBuyNow(product)}
                        className="flex items-center justify-center bg-emerald-600 text-white rounded-lg px-4 py-2 hover:bg-emerald-700 transition-colors group-hover:scale-105"
                      >
                        <ShoppingBagIcon />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Bulk Order Section */}
      <div id="bulk-order" className="max-w-7xl mx-auto px-4 py-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-yellow-400/5 to-orange-400/5 rounded-full blur-3xl"></div>
        
        <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 left-1/4 w-24 h-24 bg-yellow-400 rounded-full blur-2xl"></div>
            <div className="absolute bottom-8 right-1/3 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-emerald-300 rounded-full blur-xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold">Interested in Bulk Orders?</h3>
            </div>
            
            <p className="text-emerald-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Get wholesale prices for large quantity orders. Perfect for restaurants, retailers, and events.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button 
                onClick={handleBulkOrder} id='bulkorder'
                className="group inline-flex items-center px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl shadow-xl hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="mr-3">WhatsApp Us</span>
                <div className="bg-emerald-100 rounded-full p-2 group-hover:bg-emerald-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
              
              <a 
                href="tel:+919787001188"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-emerald-900 font-bold rounded-2xl shadow-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-emerald-100">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">1000+ Happy Customers</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">100% Secure Packaging</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V6a1 1 0 00-1-1H4a1 1 0 00-1 1z" />
                </svg>
                <span className="font-medium">Free Delivery Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Choose C.K Masala? Section */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-700 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose C.K Masala?</h2>
              <p className="text-emerald-100 text-lg mb-6">
                Our commitment to quality and tradition sets us apart in the world of spices.
              </p>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start">
                  <div className="bg-emerald-700 rounded-full p-2 mr-4">
                    <LeafIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">100% Natural Ingredients</h3>
                    <p className="text-emerald-100">No artificial additives or preservatives</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-emerald-700 rounded-full p-2 mr-4">
                    <HistoryIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Traditional Recipes</h3>
                    <p className="text-emerald-100">Authentic flavors passed down through generations</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-emerald-700 rounded-full p-2 mr-4">
                    <GemIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                    <p className="text-emerald-100">Rigorous quality control at every stage</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-emerald-900/30 rounded-2xl p-6 text-center border border-emerald-500/30">
                  <div className="text-4xl font-bold text-white mb-2">10+</div>
                  <div className="text-emerald-200">Premium Products</div>
                </div>
                <div className="bg-emerald-900/30 rounded-2xl p-6 text-center border border-emerald-500/30">
                  <div className="text-4xl font-bold text-white mb-2">98%</div>
                  <div className="text-emerald-200">Customer Satisfaction</div>
                </div>
                <div className="bg-emerald-900/30 rounded-2xl p-6 text-center border border-emerald-500/30">
                  <div className="text-4xl font-bold text-white mb-2">500g</div>
                  <div className="text-emerald-200">Standard Pack Size</div>
                </div>
                <div className="bg-emerald-900/30 rounded-2xl p-6 text-center border border-emerald-500/30">
                  <div className="text-4xl font-bold text-white mb-2">30+</div>
                  <div className="text-emerald-200">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-emerald-900">Place Your Order</h3>
                <button 
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {/* Selected Products */}
              <div className="mb-6">
                <h4 className="font-bold text-emerald-800 mb-3">Selected Products</h4>
                {selectedProducts.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No products selected</p>
                ) : (
                  <div className="space-y-4">
                    {selectedProducts.map(product => (
                      <div key={product._id} className="p-3 bg-emerald-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium">{product.name}</h5>
                            <p className="text-sm text-gray-600">₹{product.price} per 500g</p>
                          </div>
                          <button 
                            onClick={() => handleRemoveProduct(product._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Quantity</label>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => handleQuantityChange(product._id, Math.max(1, product.quantity - 1))}
                                className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"
                              >
                                -
                              </button>
                              <span className="font-medium">{product.quantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Weight (kg)</label>
                            <select
                              value={product.weight}
                              onChange={(e) => handleWeightChange(product._id, e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                              <option value="0.5">0.5 kg</option>
                              <option value="1">1 kg</option>
                              <option value="2">2 kg</option>
                              <option value="5">5 kg</option>
                              <option value="10">10 kg</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-right font-medium">
                          Subtotal: ₹{(product.price * product.quantity * product.weight * 2).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <button 
                  onClick={() => {
                    setShowOrderModal(false);
                    setTimeout(() => setShowFilters(true), 300);
                  }}
                  className="mt-4 text-emerald-700 hover:text-emerald-900 flex items-center gap-2"
                >
                  + Add more products
                </button>
              </div>
              
              {/* Customer Info Form */}
              <div className="mb-6">
                <h4 className="font-bold text-emerald-800 mb-3">Your Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={customerInfo.mobile}
                      onChange={(e) => setCustomerInfo({...customerInfo, mobile: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Delivery Address</label>
                    <textarea
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter full delivery address"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-emerald-800 mb-3">Order Summary</h4>
                <div className="space-y-2">
                  {selectedProducts.map(product => (
                    <div key={product._id} className="flex justify-between">
                      <span>{product.name} ({product.weight}kg) x {product.quantity}</span>
                      <span>₹{(product.price * product.quantity * product.weight * 2).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    ₹{selectedProducts.reduce(
                      (sum, product) => sum + (product.price * product.quantity * product.weight * 2),
                      0
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                onClick={handleSubmitOrder}
                disabled={selectedProducts.length === 0 || !customerInfo.name || !customerInfo.mobile || !customerInfo.address}
                className={`w-full py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2 ${selectedProducts.length === 0 || !customerInfo.name || !customerInfo.mobile || !customerInfo.address
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Send Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;