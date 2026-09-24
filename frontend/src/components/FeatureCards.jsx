import React from "react";

export default function FeatureCards({ features }) {
  return (
    <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, marginTop: -60, position: "relative", zIndex: 2 }}>
      {features.map((f) => (
        <div key={f.id} style={cardStyle}>
          <div style={{ fontSize: 36 }}>{f.icon}</div>
          <h3>{f.title}</h3>
          <p style={{ color: "#666", fontSize: 14 }}>{f.text}</p>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "28px 20px",
  borderRadius: 8,
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  textAlign: "center",
  borderTop: "4px solid var(--color-primary)",
};
