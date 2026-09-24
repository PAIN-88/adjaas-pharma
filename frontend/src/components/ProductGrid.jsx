import React from "react";
import { Link } from "react-router-dom";

export default function ProductGrid({ categories }) {
  return (
    <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20 }}>
      {categories.map((cat) => (
        <Link
          to={`/products?category=${cat.slug}`}
          key={cat.id}
          style={tileStyle}
        >
          <div style={{ fontSize: 28 }}>{cat.icon || "💊"}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>{cat.name}</div>
        </Link>
      ))}
    </div>
  );
}

const tileStyle = {
  background: "var(--color-teal-light)",
  border: "1px solid var(--color-teal)",
  borderRadius: 8,
  padding: "24px 12px",
  textAlign: "center",
  transition: "transform 0.15s ease",
};
