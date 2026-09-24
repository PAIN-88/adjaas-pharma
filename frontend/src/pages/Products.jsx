import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, getProducts } from "../api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCategories().then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    getProducts(activeCategory).then((r) => setProducts(r.data)).catch(() => {});
  }, [activeCategory]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <div style={filterBarStyle}>
        <h2 style={{ margin: 0 }}>Our Products</h2>

        <div>
          <label htmlFor="category-select" style={labelStyle}>Category</label>
          <select
            id="category-select"
            value={activeCategory}
            onChange={handleCategoryChange}
            style={selectStyle}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {products.length === 0 && (
        <p style={{ color: "#777" }}>No products added yet — add some from the Django admin.</p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

const filterBarStyle = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 28,
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  color: "#777",
  marginBottom: 4,
};

const selectStyle = {
  padding: "10px 14px",
  borderRadius: 6,
  border: "1px solid var(--color-teal)",
  background: "var(--color-teal-light)",
  color: "#333",
  fontSize: 14,
  minWidth: 200,
  cursor: "pointer",
};