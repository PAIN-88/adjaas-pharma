import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/products/${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={cardStyle(hovered)}
    >
      <div style={imageWrapStyle}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={imgStyle} />
        ) : (
          <div style={placeholderStyle}>No Image</div>
        )}

        {/* hover overlay with quick info */}
        {hovered && (
          <div style={overlayStyle}>
            <p style={{ fontSize: 13, margin: 0, textAlign: "center" }}>
              {product.composition || product.description || "View details"}
            </p>
          </div>
        )}
      </div>

      <div style={infoStyle}>
        <h4 style={{ margin: "10px 0 4px" }}>{product.name}</h4>
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-primary)" }}>
          {product.category_name}
        </p>
        {product.composition && (
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#777" }}>
            {product.composition}
          </p>
        )}
      </div>
    </Link>
  );
}

const cardStyle = (hovered) => ({
  display: "block",
  border: "1px solid #e2e2e2",
  borderRadius: 6,
  overflow: "hidden",
  textAlign: "center",
  background: "#fff",
  transform: hovered ? "translateY(-4px)" : "none",
  boxShadow: hovered
    ? "0 10px 24px rgba(0,0,0,0.12)"
    : "0 2px 6px rgba(0,0,0,0.05)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  cursor: "pointer",
});

const imageWrapStyle = {
  position: "relative",
  height: 160,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fafafa",
};

const imgStyle = {
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "contain",
};

const placeholderStyle = {
  color: "#bbb",
  fontSize: 13,
};

const overlayStyle = {
  position: "absolute",
  inset: 0,
  background: "rgba(242,145,145,0.92)", // var(--color-primary) w/ opacity
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 12,
};

const infoStyle = {
  padding: "6px 10px 14px",
  borderTop: "1px solid #f0f0f0",
};
