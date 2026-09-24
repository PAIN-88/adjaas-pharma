import React, { useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import FeatureCards from "../components/FeatureCards";
import ProductGrid from "../components/ProductGrid";
import { getSlides, getFeatures, getCategories, getCompanyInfo } from "../api";
import labResearch from "../assets/lab-research.jpg";
import pharmacyShelf from "../assets/pharmacy-shelf.jpg";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [features, setFeatures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getSlides().then((r) => setSlides(r.data)).catch(() => {});
    getFeatures().then((r) => setFeatures(r.data)).catch(() => {});
    getCategories().then((r) => setCategories(r.data)).catch(() => {});
    getCompanyInfo().then((r) => setCompany(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      <HeroSlider slides={slides} />
      {features.length > 0 && <FeatureCards features={features} />}

      <section style={{ background: "#fff" }}>
        <div className="container two-col-section">
          <div>
            <h2>{company?.welcome_heading || "Welcome"}</h2>
            <p style={{ color: "#555", lineHeight: 1.7 }}>{company?.welcome_text}</p>
            <a href="/about" className="btn">Read More</a>
          </div>
          <img
            src={labResearch}
            alt="Research and quality testing"
            style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 8 }}
          />
        </div>
      </section>

      <section style={{ background: "var(--color-teal-light)" }}>
        <div className="container two-col-section">
          <img
            src={pharmacyShelf}
            alt="Pharmacy shelf"
            style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 8 }}
          />
          <div>
            <h2>{company?.why_choose_heading || "Why Choose Us"}</h2>
            <p style={{ color: "#555", lineHeight: 1.7 }}>{company?.why_choose_text}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-title">
          <h2>Our Products</h2>
          <div className="underline" />
        </div>
        <ProductGrid categories={categories} />
      </section>
    </div>
  );
}