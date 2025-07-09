// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductManager from "./pages/ProductManager";
import Footer from "../src/Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import BlogManager from "../src/pages/BlogManager";
import Testimonials from "./pages/Testimonials";
// import AdminDashboard from "../src/Components/AdminDashboard";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "../src/Components/navbar";
import HomeManager from "./pages/HomeManager";
const App = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // ✅ Checks login

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductManager />} />
        <Route path="/BlogManager" element={<BlogManager />} />
        <Route path="/Testimonials" element={<Testimonials />} />
        <Route path="/HomeManager" element={<HomeManager />} />
        
      </Routes>
      <Footer />
    </>
  );
};

export default App;
