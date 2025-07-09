// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import BulkOrderDemo from "./components/bulkorder";
import AdminLogin from "./components/AdminLogin";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Blog from "./components/blogs";
import Testimonials from "./components/Testimonials";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/bulk-orders" element={<BulkOrderDemo />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;