import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setProduct(null);
    setNotFound(false);
    getProduct(id)
      .then((r) => setProduct(r.data))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="container" style={{ padding: "60px 20px" }}>
        <p>Product not found.</p>
        <Link to="/products" className="btn">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    return <div className="container" style={{ padding: "60px 20px" }}>Loading...</div>;
  }

  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <Link to="/products" style={{ color: "var(--color-primary)" }}>&larr; Back to Products</Link>

      <div className="two-col-section" style={{ marginTop: 24 }}>
        <div style={{ background: "#fafafa", border: "1px solid #eee", borderRadius: 8, minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {product.image ? (
            <img src={product.image} alt={product.name} style={{ maxWidth: "100%", maxHeight: 320, objectFit: "contain" }} />
          ) : (
            <span style={{ color: "#bbb" }}>No Image</span>
          )}
        </div>

        <div>
          <h1>{product.name}</h1>
          <p style={{ color: "var(--color-primary)", fontWeight: 600 }}>{product.category_name}</p>

          {product.composition && (
            <>
              <h4>Composition</h4>
              <p style={{ color: "#555" }}>{product.composition}</p>
            </>
          )}

          {product.description && (
            <>
              <h4>Description</h4>
              <p style={{ color: "#555", lineHeight: 1.7 }}>{product.description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}