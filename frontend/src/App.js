import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import ManageProducts from "./pages/ManageProducts";
import ManageCategories from "./pages/ManageCategories";
import { getCompanyInfo, getCategories } from "./api";

export default function App() {
  const [company, setCompany] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCompanyInfo().then((r) => setCompany(r.data)).catch(() => {});
    getCategories().then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/manage-categories" element={<ManageCategories />} />
      </Routes>
      <Footer company={company} categories={categories} />
    </BrowserRouter>
  );
}
