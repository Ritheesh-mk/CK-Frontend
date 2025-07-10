import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Using environment variable for the API URL
        const response = await fetch(`${import.meta.env.VITE_BASE_API}/testimonials`);
        const data = await response.json();
        setTestimonials(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to mock data if backend is not available
        setTestimonials(mockTestimonials);
        setLoading(false);
      }
    };

    fetchTestimonials();
    fetchTestimonials();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Mock data for fallback
  const mockTestimonials = [
    {
      _id: '1',
      content: 'The aroma of these masalas transforms my kitchen into a traditional Indian restaurant. My customers are amazed by the authentic flavors in every dish!',
      name: 'Priya Sharma',
      position: 'Executive Chef',
      business: 'Maharaja Palace Restaurant',
      rating: 5,
      avatar: null,
      location: 'Mumbai, India',
      products: ['Garam Masala', 'Biryani Masala', 'Tandoori Masala']
    },
    {
      _id: '2',
      content: 'From turmeric to red chili powder, every spice has that perfect balance of heat and flavor. My family recipes have reached a new level of authenticity!',
      name: 'Rajesh Kumar',
      position: 'Home Chef',
      business: 'Food Blogger',
      rating: 5,
      avatar: null,
      location: 'Delhi, India',
      products: ['Turmeric Powder', 'Red Chili Powder', 'Coriander Powder']
    },
    {
      _id: '3',
      content: 'Quality that speaks for itself! The freshness and purity of these masalas have made our catering business the talk of the town. Simply outstanding!',
      name: 'Meera Patel',
      position: 'Owner',
      business: 'Spice Route Catering',
      rating: 5,
      avatar: null,
      location: 'Ahmedabad, India',
      products: ['Sambar Powder', 'Rasam Powder', 'Pav Bhaji Masala']
    },
    {
      _id: '4',
      content: 'These organic masalas have elevated our South Indian dishes to perfection. The traditional grinding methods really make a difference in taste!',
      name: 'Venkatesh Iyer',
      position: 'Head Chef',
      business: 'Heritage Kitchen',
      rating: 5,
      avatar: null,
      location: 'Chennai, India',
      products: ['Coconut Masala', 'Curry Leaves Powder', 'Pepper Powder']
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-emerald-200 rounded-lg w-96 mx-auto mb-6"></div>
            <div className="h-6 bg-emerald-100 rounded w-80 mx-auto mb-12"></div>
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-20 relative overflow-hidden">
      {/* Decorative Spice Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-200 rounded-full opacity-15"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-emerald-300 rounded-full opacity-25"></div>

        {/* Spice Icons */}
        <div className="absolute top-32 right-1/4 text-6xl opacity-10 animate-spin-slow">🌶️</div>
        <div className="absolute bottom-32 left-1/4 text-5xl opacity-10">⭐</div>
        <div className="absolute top-1/2 left-10 text-4xl opacity-10">🧄</div>
        <div className="absolute top-1/3 right-10 text-5xl opacity-10">🌿</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mr-4"></div>
            <span className="text-emerald-600 font-semibold text-lg tracking-wide">TESTIMONIALS</span>
            <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full ml-4"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Taste the
            <span className="text-gradient bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent"> Authentic </span>
            Difference
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover why chefs, home cooks, and spice lovers across India trust our premium masalas for their most cherished recipes
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-teal-100 to-emerald-100 rounded-tl-full"></div>

            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial._id}
                className={`transition-all duration-700 ease-in-out ${index === activeIndex
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-0 transform translate-y-4 absolute inset-0'
                  }`}
              >
                {/* Quote Icon */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full text-white text-2xl font-bold shadow-lg">
                    <img src={logo} alt="" />
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-8 h-8 mx-1 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-xl md:text-2xl text-gray-700 italic text-center leading-relaxed mb-8 font-light">
                  "{testimonial.content}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 p-1 shadow-lg">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        {testimonial.avatar ? (
                          <img
                            src={
                              testimonial.avatar.startsWith('http')
                                ? testimonial.avatar
                                : `${import.meta.env.VITE_BASE_API}/uploads/${testimonial.avatar}`
                            }
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <img
                            src={logo}
                            alt="Default Logo"
                            className="w-16 h-16 rounded-full object-contain p-1"
                          />
                        )}


                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">{testimonial.name}</h4>
                    <p className="text-emerald-600 font-semibold mb-1">{testimonial.position}</p>
                    <p className="text-gray-600">{testimonial.business}</p>
                    {testimonial.location && (
                      <p className="text-sm text-gray-500 mt-1">📍 {testimonial.location}</p>
                    )}
                  </div>
                </div>

                {/* Products Used */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500 mb-3">Favorite Products:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {testimonial.products.map((product, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg transform scale-125'
                  : 'bg-gray-300 hover:bg-emerald-300'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setActiveIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 text-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 text-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Experience Authentic Flavors?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied customers who trust our premium masalas
            </p>
            <button className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;