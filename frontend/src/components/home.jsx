import React, { useState, useEffect, useRef } from 'react';
import SambarPowder from '../assets/CK_Sambar-Powder.avif'
import BiryaniMasala from '../assets/CK_Chicken-Masala.jpeg';
import Chicken from '../assets/CK_Chicken-Masala.jpeg';
import Mutton from '../assets/CK_Mutton-Masala.jpeg';
import Sambar from '../assets/CK_Sambar-Powder.avif';
import { Star, ShoppingBag } from 'react-feather';

const Home = () => {
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState({});
  const [showOfferBanner, setShowOfferBanner] = useState(true);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [activeProductId, setActiveProductId] = useState(null);
  
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const products = [
    { id: 1, name: 'Sambar Powder', tamilName: 'சாம்பார் பொடி', description: 'Authentic South Indian blend', image: SambarPowder },
    { id: 2, name: 'Chicken Masala', tamilName: 'சிக்கன் மசாலா', description: 'Rich & aromatic poultry spice', image: Chicken },
    { id: 3, name: 'Mutton Masala', tamilName: 'மட்டன் மசாலா', description: 'Robust flavor for red meats', image: Mutton },
  ];

  const popularProducts = [
    {
      id: 1,
      name: "Sambar Powder",
      tamilName: "சாம்பார் பொடி",
      description: "Authentic South Indian blend with 18 handpicked spices",
      image: SambarPowder,
      price: 249,
      pricePerKg: 498,
      weight: "500g",
      rating: 4.9
    },
    {
      id: 2,
      name: "Chicken Masala",
      tamilName: "சிக்கன் மசாலா",
      description: "Perfectly balanced spices for tender chicken dishes",
      image: BiryaniMasala,
      price: 299,
      pricePerKg: 598,
      weight: "500g",
      rating: 4.8
    },
    {
      id: 3,
      name: "Mutton Masala",
      tamilName: "மட்டன் மசாலா",
      description: "Robust blend specially crafted for mutton dishes",
      image: Mutton,
      price: 349,
      pricePerKg: 698,
      weight: "500g",
      rating: 4.7
    }
  ];

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const addToCart = (product) => {
    // Add to cart functionality
    console.log("Added to cart:", product);
  };

  const handleViewAllProducts = () => {
    // View all products functionality
    console.log("View all products clicked");
  };

  // Auto-rotate products every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantity({
      ...quantity,
      [productId]: value
    });
  };

  const handleSubmit = () => {
    let message = "Hello, I would like to place a bulk order:\n\n";
    
    selectedProducts.forEach(id => {
      const product = products.find(p => p.id === id);
      const qty = quantity[id] || 1;
      message += `${product.name}: ${qty} units\n`;
    });
    
    message += `\nPhone: ${phone}\nAddress: ${address}\n\nThank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/919787001188?text=${encodedMessage}`;
  };

  const BulkOrderModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden ">
          <div className="bg-gradient-to-r from-emerald-700 to-green-600 p-6">
            <h2 className="text-2xl font-bold text-white">Bulk Order Request</h2>
            <p className="text-emerald-100">Fill the details below for wholesale orders</p>
          </div>
          
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="mb-6">
              <h3 className="font-bold text-lg text-gray-800 mb-3">Select Products:</h3>
              <div className="space-y-3">
                {products.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 border border-emerald-100 rounded-xl hover:bg-emerald-50 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <div className="flex items-center ml-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden mr-4 bg-gray-100 flex items-center justify-center">
                          {typeof product.image === 'string' && product.image.includes('.') ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs text-gray-500 text-center">Image</span>
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">{product.name}</span>
                          <span className="block text-xs text-emerald-600">{product.tamilName}</span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedProducts.includes(product.id) && (
                      <div className="flex items-center">
                        <span className="mr-2 text-gray-600">Quantity:</span>
                        <input
                          type="number"
                          min="1"
                          value={quantity[product.id] || ''}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          className="w-20 px-3 py-1 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Qty"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="+91 00000 00000"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Delivery Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows="2"
                  placeholder="Enter your complete address"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
            <button
              onClick={() => setBulkModalOpen(false)}
              className="px-6 py-2 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-medium rounded-xl shadow-md hover:from-emerald-700 hover:to-green-600 transition-all transform hover:scale-105"
              disabled={selectedProducts.length === 0}
            >
              Send via WhatsApp
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Kolam pattern component
  const KolamPattern = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
    {/* Floating spice particles with animation */}
    <div className="absolute inset-0">
      {[...Array(25)].map((_, i) => (
        <div
          key={`spice-particle-${i}`}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          <div 
            className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-200 to-orange-200 opacity-30"
            style={{
              filter: 'blur(0.5px)',
              boxShadow: '0 0 8px rgba(255, 165, 0, 0.3)'
            }}
          />
        </div>
      ))}
    </div>

    {/* Elegant spice leaf trails */}
    <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Top flowing trail */}
      <path 
        d="M0,20 Q25,15 50,25 Q75,35 100,20" 
        stroke="url(#leafGradient)" 
        strokeWidth="0.3" 
        fill="none"
        opacity="0.6"
      />
      
      {/* Bottom flowing trail */}
      <path 
        d="M0,80 Q25,85 50,75 Q75,65 100,80" 
        stroke="url(#leafGradient)" 
        strokeWidth="0.3" 
        fill="none"
        opacity="0.6"
      />
      
      {/* Vertical accent lines */}
      <path 
        d="M15,0 Q20,50 15,100" 
        stroke="rgba(255,255,255,0.2)" 
        strokeWidth="0.2" 
        fill="none"
      />
      <path 
        d="M85,0 Q80,50 85,100" 
        stroke="rgba(255,255,255,0.2)" 
        strokeWidth="0.2" 
        fill="none"
      />
      
      <defs>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#ffd700" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>

    {/* Rotating spice elements */}
    <div className="absolute top-1/4 left-1/4 opacity-20">
      <div 
        className="w-16 h-16 animate-spin"
        style={{ animation: 'spin 20s linear infinite' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-40 blur-sm" />
        <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-200 rounded-full opacity-50" />
      </div>
    </div>

    <div className="absolute top-3/4 right-1/4 opacity-20">
      <div 
        className="w-12 h-12 animate-spin"
        style={{ animation: 'spin 15s linear infinite reverse' }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-yellow-200 to-amber-200 rounded-full opacity-40 blur-sm" />
        <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-60" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-orange-200 rounded-full opacity-50" />
      </div>
    </div>

    {/* Elegant corner decorations */}
    <div className="absolute top-8 left-8 opacity-25">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-yellow-100 rounded-full opacity-30 blur-md" />
        <div className="absolute top-4 left-4 w-12 h-12 border border-white rounded-full opacity-40" />
        <div className="absolute top-6 left-6 w-8 h-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full opacity-50" />
      </div>
    </div>

    <div className="absolute top-8 right-8 opacity-25">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 bg-gradient-to-bl from-white to-yellow-100 rounded-full opacity-30 blur-md" />
        <div className="absolute top-4 left-4 w-12 h-12 border border-white rounded-full opacity-40" />
        <div className="absolute top-6 left-6 w-8 h-8 bg-gradient-to-l from-amber-100 to-orange-100 rounded-full opacity-50" />
      </div>
    </div>

    <div className="absolute bottom-8 left-8 opacity-25">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-gradient-to-tr from-white to-yellow-100 rounded-full opacity-30 blur-md" />
        <div className="absolute top-2 left-2 w-12 h-12 border border-white rounded-full opacity-40" />
        <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full opacity-50" />
      </div>
    </div>

    <div className="absolute bottom-8 right-8 opacity-25">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-gradient-to-tl from-white to-yellow-100 rounded-full opacity-30 blur-md" />
        <div className="absolute top-2 left-2 w-12 h-12 border border-white rounded-full opacity-40" />
        <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-l from-amber-100 to-orange-100 rounded-full opacity-50" />
      </div>
    </div>

    {/* Subtle aromatic waves */}
    <div className="absolute inset-0 opacity-10">
      {[...Array(5)].map((_, i) => (
        <div
          key={`wave-${i}`}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: `${20 + i * 15}%`,
            animation: `wave ${4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>

    {/* Premium spice dust effect */}
    <div className="absolute inset-0 opacity-8">
      <div 
        className="w-full h-full bg-gradient-radial from-yellow-100 via-transparent to-transparent"
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(255, 215, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255, 165, 0, 0.08) 0%, transparent 50%)'
        }}
      />
    </div>

    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        25% { transform: translateY(-10px) translateX(5px); }
        50% { transform: translateY(0px) translateX(10px); }
        75% { transform: translateY(-5px) translateX(5px); }
      }
      
      @keyframes wave {
        0%, 100% { transform: translateX(-100%); opacity: 0; }
        50% { transform: translateX(0%); opacity: 1; }
      }
      
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

  // Floating spice particles component
  const FloatingSpices = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              background: i % 3 === 0 ? '#f59e0b' : i % 3 === 1 ? '#dc2626' : '#059669',
              width: (Math.random() * 10 + 5) + "px",
              height: (Math.random() * 10 + 5) + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDuration: (Math.random() * 10 + 10) + "s",
              animationDelay: (Math.random() * 5) + "s",
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="font-sans bg-gradient-to-b from-white to-emerald-50 relative overflow-x-hidden">
      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        
        @keyframes rotate3d {
          0% { transform: perspective(1000px) rotateY(0deg); }
          100% { transform: perspective(1000px) rotateY(360deg); }
        }
        .animate-rotate3d {
          animation: rotate3d 20s linear infinite;
        }
        
        .spice-jar {
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        
        .spice-jar:hover {
          transform: perspective(1000px) rotateY(10deg) rotateX(5deg) scale(1.05);
        }
        
        .kolam-border {
          position: relative;
        }
        
        .kolam-border::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 0;
          right: 0;
          height: 20px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 10' preserveAspectRatio='none'%3E%3Cpath d='M0,0 Q25,10 50,0 T100,0' fill='%23059669'/%3E%3C/svg%3E") center top repeat-x;
          background-size: 100px 20px;
        }
        
        .spice-video-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #0f766e, #047857, #065f46);
          opacity: 0.1;
          z-index: 0;
        }
        
        .spice-video-bg::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.1) 0%, transparent 20%),
            radial-gradient(circle at 80% 70%, rgba(220, 38, 38, 0.1) 0%, transparent 20%),
            radial-gradient(circle at 50% 20%, rgba(5, 150, 105, 0.1) 0%, transparent 30%);
          animation: rotate3d 60s linear infinite;
        }
      `}</style>
      
      {/* Offer Alert Banner */}
      {showOfferBanner && (
        <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-3 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-400/20"></div>
          <div className="relative flex items-center justify-center">
            <div className="flex items-center space-x-2 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.395 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-sm md:text-base">
                🎉 LIMITED TIME OFFER: Get 20% OFF on bulk orders above ₹5000! 
              </span>
              <span className="hidden md:inline-block text-yellow-200 font-medium">
                Use code: BULK20
              </span>
              <div className="hidden sm:flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium">Ends Soon!</span>
              </div>
            </div>
            <button 
              onClick={() => setShowOfferBanner(false)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-1 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute top-2 right-1/3 w-1 h-1 bg-yellow-200 rounded-full animate-ping"></div>
            <div className="absolute bottom-1 left-1/3 w-1.5 h-1.5 bg-orange-200 rounded-full animate-pulse"></div>
            <div className="absolute bottom-2 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>
      )}
      
      {/* Hero Banner */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900 text-white overflow-hidden min-h-screen">
        {/* Enhanced background with floating spices and kolam pattern */}
        <div className="spice-video-bg" />
        <FloatingSpices />
        <KolamPattern />
        
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Authentic Indian</span>
                <span className="block text-yellow-300 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  Spices & Masalas
                </span>
                <span className="block mt-2 text-emerald-300 text-2xl md:text-3xl font-light">
                  சுவையான மசாலாப் பொருட்கள்
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-emerald-100 max-w-xl">
                100% pure spices sourced directly from Indian farms. Experience the bold, 
                authentic flavors of traditional Indian cuisine.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('popular-products').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-white text-emerald-800 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-colors transform hover:scale-105 flex items-center"
                >
                  Explore Products
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={() => setBulkModalOpen(true)}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-emerald-900 font-bold rounded-xl shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition-colors transform hover:scale-105 flex items-center"
                >
                  Bulk Order
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 004.9 0H10a1 1 0 001-1v-1h8V5a1 1 0 00-1-1H3zM14 7h-3v2h3V7zM5 11a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center">
                  <div className="bg-emerald-700/30 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-emerald-100">No Artificial Preservatives</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-emerald-700/30 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-emerald-100">Direct from Farms</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -top-8 -right-8 w-56 h-56 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
                
                <div className="relative grid grid-cols-2 gap-5">
                  <div className="spice-jar bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-2xl transform rotate-3">
                    <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 border-2 border-emerald-700/50 rounded-xl w-full h-64 flex items-center justify-center overflow-hidden">
                      <div className="bg-emerald-900/50 w-32 h-40 rounded-lg absolute top-4 left-4 transform -rotate-12"></div>
                      <div className="bg-emerald-800/80 w-32 h-40 rounded-lg absolute bottom-4 right-4 transform rotate-6"></div>
                      <div className="relative z-10 text-center px-4">
                        <div className="w-32 h-32 rounded-xl overflow-hidden mx-auto mb-3 bg-white flex items-center justify-center">
                          <img src={SambarPowder} alt="Sambar Powder" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <span className="text-emerald-200 font-bold text-lg">SAMBAR POWDER</span>
                        <span className="block text-emerald-300 text-sm mt-1">சாம்பார் பொடி</span>
                        <div className="mt-3 bg-gradient-to-r from-yellow-500 to-yellow-400 h-1 w-16 mx-auto rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="spice-jar bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-2xl transform -rotate-2 mt-12">
                    <div className="bg-gradient-to-br from-amber-800 to-amber-900 border-2 border-amber-700/50 rounded-xl w-full h-64 flex items-center justify-center overflow-hidden">
                      <div className="bg-amber-900/50 w-32 h-40 rounded-lg absolute top-4 left-4 transform rotate-6"></div>
                      <div className="bg-amber-800/80 w-32 h-40 rounded-lg absolute bottom-4 right-4 transform -rotate-12"></div>
                      <div className="relative z-10 text-center px-4">
                        <div className="w-32 h-32 rounded-xl overflow-hidden mx-auto mb-3 bg-white flex items-center justify-center">
                          <img src={BiryaniMasala} alt="Biryani Masala" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <span className="text-amber-200 font-bold text-lg">BIRYANI MASALA</span>
                        <span className="block text-amber-300 text-sm mt-1">பிரியாணி மசாலா</span>
                        <div className="mt-3 bg-gradient-to-r from-yellow-500 to-yellow-400 h-1 w-16 mx-auto rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Kolam Divider */}
      <div className="relative h-12 bg-emerald-50 overflow-hidden">
        <div className="absolute inset-0 flex justify-center">
          <svg viewBox="0 0 100 10" className="w-full h-full">
            <path d="M0,5 Q25,10 50,5 T100,5" fill="none" stroke="#059669" strokeWidth="0.5" />
            <circle cx="10" cy="5" r="1" fill="#059669" />
            <circle cx="30" cy="5" r="1" fill="#059669" />
            <circle cx="50" cy="5" r="1" fill="#059669" />
            <circle cx="70" cy="5" r="1" fill="#059669" />
            <circle cx="90" cy="5" r="1" fill="#059669" />
          </svg>
        </div>
      </div>
      
      /* Popular Products Section */
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="popular-products">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Popular Products</h2>
            <p className="text-xl text-emerald-600 font-medium mb-2">"Bold, Flavorful & Delicious"</p>
            <p className="text-lg text-gray-600">Our customers love these premium spices</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-48">
              <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            width={500}
            height={300}
            className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center text-sm font-medium">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            {product.rating}
              </div>
              <div className="absolute top-4 left-4 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
            {product.weight}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-green-600">{formatINR(product.price)}</span>
              <p className="text-xs text-gray-500">{formatINR(product.pricePerKg)}/kg</p>
            </div>
            {/* <button 
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all flex items-center"
              onClick={() => addToCart(product)}
              aria-label={`Buy ${product.name} now`}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Buy Now
            </button> */}
              </div>
            </div>
          </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
          className="bg-white/80 backdrop-blur-sm text-gray-900 px-8 py-3 rounded-2xl font-semibold text-lg border-2 border-green-200 hover:border-green-300 hover:bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          onClick={() => window.location.href = '/products'}
          aria-label="View all products" id='products'
            >
          View All Products
            </button>
          </div>
        </section>
        
        {/* Kolam Divider */}
      <div className="relative h-12 bg-emerald-50 overflow-hidden">
        <div className="absolute inset-0 flex justify-center">
          <svg viewBox="0 0 100 10" className="w-full h-full">
            <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#059669" strokeWidth="0.5" />
            <circle cx="10" cy="5" r="1" fill="#059669" />
            <circle cx="30" cy="5" r="1" fill="#059669" />
            <circle cx="50" cy="5" r="1" fill="#059669" />
            <circle cx="70" cy="5" r="1" fill="#059669" />
            <circle cx="90" cy="5" r="1" fill="#059669" />
          </svg>
        </div>
      </div>
      
      {/* Footer Section */}
    
      
      {bulkModalOpen && <BulkOrderModal />}
      
      {/* Floating WhatsApp button */}
      {/* <a 
        href="https://wa.me/919034598000" 
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg z-50 hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a> */}
    </div>
  );
};

export default Home;