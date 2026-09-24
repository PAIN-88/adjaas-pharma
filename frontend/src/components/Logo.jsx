import React from "react";

export default function Logo({ size = 34 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <rect x="6" y="18" width="36" height="14" rx="7" fill="var(--color-teal)" />
        <path d="M24 18 H35 A7 7 0 0 1 35 32 H24 Z" fill="var(--color-primary)" />
        <line x1="24" y1="18" x2="24" y2="32" stroke="#fff" strokeWidth="1.5" />
        <rect x="10.5" y="22.5" width="7" height="2" rx="1" fill="#fff" />
        <rect x="13" y="20" width="2" height="7" rx="1" fill="#fff" />
      </svg>

      <span
        className="logo-text"
        style={{ fontSize: 22, fontWeight: 800, letterSpacing: 0.3, lineHeight: 1, whiteSpace: "nowrap" }}
      >
        <span style={{ color: "var(--color-dark)" }}>ADJAAS</span>
        <span style={{ color: "var(--color-primary)" }}>PHARMA</span>
      </span>
    </div>
  );
}