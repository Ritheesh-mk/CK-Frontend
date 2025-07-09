import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, MapPin, Clock, Star, Award, Leaf } from 'lucide-react';
import logo from '../assets/logo.png';

const isAdmin = true;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const navItems = [
    {name: 'Home', path: '/HomeManager'},
    { name: 'Products', path: '/' },
    { name: 'BlogManager', path: '/BlogManager' },
    { name: 'TestimonialManager', path: '/Testimonials' },
    
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className={`bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800 text-white text-[11px] px-3 hidden lg:block transition-all duration-500 ${
        isScrolled ? 'h-0 py-0 overflow-hidden opacity-0' : 'h-auto py-1.5 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <Phone className="w-2.5 h-2.5" />
              <span>+91 97870 01188</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-2.5 h-2.5" />
              <span>No.5, Muthu Street, Peelamedu</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="w-2.5 h-2.5" />
              <span>Mon-Sat: 9AM-6PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Leaf className="w-2.5 h-2.5 text-emerald-300" />
              <span className="text-emerald-100">100% Natural</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="w-2.5 h-2.5 text-yellow-400" />
              <span className="text-emerald-100">Premium</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-emerald-100 py-2'
          : 'bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-700 shadow-md py-2'
      }`}>
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className={`rounded p-1 mr-2 shadow-sm transition-all duration-300 ${
                isScrolled ? 'bg-white border border-emerald-200' : 'bg-white/90'
              }`}>
                <img 
                  src={logo} 
                  alt="Logo" 
                  className={`object-contain transition-all duration-300 ${
                    isScrolled ? 'w-6 h-6' : 'w-8 h-8'
                  }`} 
                />
              </div>
              <div>
                <h1 className={`text-lg font-semibold transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent' 
                    : 'text-white'
                }`}>
                  C.K MASALA
                </h1>
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2 h-2 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className={`text-[10px] font-medium ${
                    isScrolled ? 'text-emerald-600' : 'text-emerald-100'
                  }`}>
                    Bold & Flavourful
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => 
                    `px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? isScrolled 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-white/20 text-white border border-white/20'
                        : isScrolled 
                          ? 'text-gray-700 hover:text-emerald-700 hover:bg-emerald-50' 
                          : 'text-white hover:text-emerald-100 hover:bg-white/10'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              className={`lg:hidden p-1.5 rounded-md transition-all ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-emerald-50 border border-emerald-200' 
                  : 'text-white hover:bg-white/20 border border-white/20'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-md">
            <div className="px-3 py-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-sm font-medium border-l-2 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-600'
                        : 'text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 border-transparent'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
