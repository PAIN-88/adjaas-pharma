import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 50 }}>
      <div className="container navbar-inner">
        <Link to="/" onClick={closeAll} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Logo />
        </Link>

        <button
          className="navbar-toggle"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>

        <nav>
          <ul className="navbar-links">
            <li><Link to="/" onClick={closeAll}>Home</Link></li>
            <li
              style={{ position: "relative" }}
              onMouseEnter={() => setOpenMenu("about")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setOpenMenu(openMenu === "about" ? null : "about")}
              >
                About ▾
              </span>
              {openMenu === "about" && (
                <ul style={dropdownStyle}>
                  <li style={dropdownItemStyle}><Link to="/about" onClick={closeAll}>About Us</Link></li>
                  <li style={dropdownItemStyle}><Link to="/about#vision" onClick={closeAll}>Vision & Values</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/products" onClick={closeAll}>Our Products</Link></li>
            <li><Link to="/contact" onClick={closeAll}>Contact Us</Link></li>
            <li><Link to="/manage-products" onClick={closeAll}>Manage Products</Link></li>
          </ul>
        </nav>
      </div>

      {/* ---- Mobile slide-in drawer (chat-app style) ---- */}
      <div
        className={`drawer-overlay${mobileOpen ? " open" : ""}`}
        onClick={closeAll}
      />
      <aside className={`drawer${mobileOpen ? " open" : ""}`}>
        <div className="drawer-header">
          <Logo size={28} />
          <button className="drawer-close" aria-label="Close menu" onClick={closeAll}>
            ✕
          </button>
        </div>
        <ul className="drawer-links">
          <li><Link to="/" onClick={closeAll}>Home</Link></li>
          <li><Link to="/about" onClick={closeAll}>About Us</Link></li>
          <li><Link to="/about#vision" onClick={closeAll}>Vision & Values</Link></li>
          <li><Link to="/products" onClick={closeAll}>Our Products</Link></li>
          <li><Link to="/contact" onClick={closeAll}>Contact Us</Link></li>
          <li><Link to="/manage-products" onClick={closeAll}>Manage Products</Link></li>
        </ul>
      </aside>
    </header>
  );
}

const dropdownStyle = {
  position: "absolute", top: "100%", left: 0,
  background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  minWidth: 180, padding: "8px 0", borderRadius: 4,
  zIndex: 60,
};
const dropdownItemStyle = { padding: "8px 16px" };