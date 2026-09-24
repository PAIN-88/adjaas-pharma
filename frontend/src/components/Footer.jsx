import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ company, categories }) {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "var(--color-dark)", color: "#ddd", paddingTop: 40 }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, paddingBottom: 30 }}>
        <div>
          <h3 style={{ color: "#fff" }}>{company?.company_name || "ADJAASPHARMA"}</h3>
          <p style={{ fontSize: 14 }}>{company?.tagline}</p>
        </div>
        <div>
          <h4 style={{ color: "#fff" }}>Useful Links</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Our Products</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: "#fff" }}>Our Products</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
            {(categories || []).slice(0, 5).map((c) => (
              <li key={c.id}><Link to={`/products?category=${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ color: "#fff" }}>Our Address</h4>
          <p style={{ fontSize: 14 }}>{company?.address}</p>
          <p style={{ fontSize: 14 }}>{company?.phone}</p>
          <p style={{ fontSize: 14 }}>{company?.email}</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #444", textAlign: "center", padding: "14px 0", fontSize: 13 }}>
        © {year} {company?.company_name || "Your Company Name"}. All Rights Reserved.
      </div>
    </footer>
  );
}
