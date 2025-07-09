import { useState, useEffect } from "react";
import { Link, Links, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MapPin,
  Clock,
  Star,
  Award,
  Leaf,
  PhoneIcon,
  MapPinCheck,
  Clock1,
  LeafIcon,
  Stars,
} from "lucide-react";

import { BiAward } from "react-icons/bi";
import logo from "../assets/logo.png"; // Update with your logo path
const isAdmin = true; // change to true to show the admin panel

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Products",
      path: "/products",
      dropdown: [],
    },
    { name: "BulkOrder", path: "/bulk-orders" },
    { name: "About", path: "/about" },
     { name: "blogPage", path: "/blogs" },
     { name: "Testimonials", path: "/testimonials" },
    // { name: 'Bulk Orders', path: '/bulk-orders' },
    { name: "Contact", path: "/contact" },
    
  ];

  return (
    <>
      {/* Top Info Bar - Compact */}
      <div
        className={`bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800 text-white text-xs px-4 hidden lg:block transition-all duration-500 ${
          isScrolled
            ? "h-0 py-0 overflow-hidden opacity-0"
            : "h-auto py-2 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 hover:text-emerald-200 transition-colors cursor-pointer">
              <PhoneIcon className="w-3 h-3" />
              <span className="font-medium">+91 97870 01188</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-emerald-200 transition-colors cursor-pointer">
              <MapPinCheck className="w-3 h-3" />
              <span>No.5, Muthu Street, Peelamedu, Coimbatore - 641 004</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock1 className="w-3 h-3" />
              <span>Mon-Sat: 9AM-6PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <LeafIcon className="w-3 h-3 text-emerald-300" />
              <span className="font-medium text-emerald-100">
                100% Natural & Pure
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <BiAward className="w-3 h-3 text-yellow-400" />
              <span className="font-medium text-emerald-100">
                Premium Quality
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar - Professional & Compact */}
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-emerald-100 py-2"
            : "bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-700 shadow-lg py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo with Actual Image */}
            <Link to="/" className="flex items-center group cursor-pointer">
              <div
                className={`relative transition-all duration-300 ${
                  isScrolled ? "scale-95" : "scale-100"
                }`}
              >
                <div
                  className={`rounded-lg p-2 mr-3 shadow-md transition-all duration-300 ${
                    isScrolled
                      ? "bg-white border border-emerald-200"
                      : "bg-white/95 backdrop-blur-sm"
                  }`}
                >
                  <img
                    src={logo}
                    alt="C.K Masala Logo"
                    className={`transition-all duration-300 object-contain ${
                      isScrolled ? "w-8 h-8" : "w-10 h-10"
                    }`}
                  />
                </div>
              </div>
              <div>
                <h1
                  className={`text-xl font-bold transition-all duration-300 ${
                    isScrolled
                      ? "bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                >
                  C.K MASALA
                </h1>
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Stars
                        key={i}
                        className="w-2.5 h-2.5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs font-medium transition-colors duration-300 ${
                      isScrolled ? "text-emerald-600" : "text-emerald-100"
                    }`}
                  >
                    Bold, Flavourful & Delicious
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Nav Items - Clean & Professional */}
            <div className="hidden lg:flex items-center space-x-1 relative">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    setActiveDropdown(item.dropdown ? item.name : null)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 ${
                        isActive
                          ? isScrolled
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-white/20 text-white border border-white/30"
                          : isScrolled
                          ? "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
                          : "text-white hover:text-emerald-100 hover:bg-white/15"
                      }`
                    }
                  >
                    <span className="text-sm">{item.name}</span>
                  </NavLink>

                  {/* Dropdown Menu - Clean Design */}
                  {/* {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-80 bg-white/96 backdrop-blur-lg rounded-lg shadow-xl border border-emerald-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 border-b border-emerald-100">
                        <h3 className="text-gray-800 font-semibold text-lg mb-1">
                          Premium Spice Collection
                        </h3>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Leaf className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 text-xs font-medium">
                              100% Pure
                            </span>
                          </div>
                          <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                          <div className="flex items-center space-x-1">
                            <Award className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 text-xs font-medium">
                              Premium Quality
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 grid grid-cols-2 gap-1 max-h-64 overflow-y-auto">
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            to={dropItem.path}
                            className="flex items-center space-x-2 px-3 py-2 hover:bg-emerald-50 rounded-md transition-colors duration-150 group cursor-pointer"
                          >
                            <div className="w-2 h-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full"></div>
                            <span className="text-gray-700 group-hover:text-emerald-800 font-medium text-sm">
                              {dropItem.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 border-t border-emerald-100">
                        <Link
                          to="/products"
                          className="text-emerald-700 hover:text-emerald-800 font-medium text-sm transition-colors cursor-pointer flex items-center space-x-2"
                        >
                          <span>Explore All Premium Products</span>
                          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                        </Link>
                      </div>
                    </div>
                  )} */}
                </div>
              ))}
            </div>

            {/* Mobile Toggle - Simplified */}
            <button
              className={`lg:hidden p-2 rounded-md transition-all duration-200 ${
                isScrolled
                  ? "text-gray-700 hover:bg-emerald-50 border border-emerald-200"
                  : "text-white hover:bg-white/20 border border-white/20"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Clean & Compact */}
        {isOpen && (
          <div className="lg:hidden bg-white/96 backdrop-blur-lg border-t border-emerald-100 shadow-lg animate-in slide-in-from-top-2 duration-300">
            <div className="px-4 py-4 space-y-1 max-h-80 overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-md font-medium transition-all duration-150 cursor-pointer border-l-2 ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-500"
                          : "text-gray-700 border-transparent hover:bg-emerald-50 hover:border-emerald-300"
                      }`
                    }
                  >
                    <span className="text-sm">{item.name}</span>
                  </NavLink>
                  {item.dropdown && (
                    <div className="ml-6 space-y-1 pb-2">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          to={dropItem.path}
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-emerald-50 rounded-md text-gray-600 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span className="font-medium text-sm">
                            {dropItem.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
