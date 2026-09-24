import React, { useEffect, useState } from "react";
import {
  getCategories, getProducts, createProduct, updateProduct, deleteProduct, verifyAdminKey,
} from "../api";

const emptyForm = { name: "", category: "", description: "", composition: "", image: null };

export default function ManageProducts() {
  const [secretKey, setSecretKey] = useState(() => sessionStorage.getItem("admin_key") || "");
  const [keyInput, setKeyInput] = useState("");
  const [unlocked, setUnlocked] = useState(() => !!sessionStorage.getItem("admin_key"));
  const [unlockError, setUnlockError] = useState(null);
  const [checkingKey, setCheckingKey] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  const loadData = () => {
    getCategories().then((r) => setCategories(r.data)).catch(() => {});
    getProducts().then((r) => setProducts(r.data)).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUnlock = async (e) => {
    e.preventDefault();
    setUnlockError(null);
    setCheckingKey(true);
    try {
      await verifyAdminKey(keyInput);
      // 404 (product id 0 doesn't exist) means key was accepted — shouldn't reach here normally,
      // axios throws on non-2xx, so treat this branch as "somehow succeeded" = valid key too.
      sessionStorage.setItem("admin_key", keyInput);
      setSecretKey(keyInput);
      setUnlocked(true);
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        // Correct key, just no product with id 0 — this IS success.
        sessionStorage.setItem("admin_key", keyInput);
        setSecretKey(keyInput);
        setUnlocked(true);
      } else if (status === 403 || status === 401) {
        setUnlockError("Invalid secret key.");
      } else {
        setUnlockError("Could not verify key. Check your connection.");
      }
    } finally {
      setCheckingKey(false);
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem("admin_key");
    setSecretKey("");
    setUnlocked(false);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((f) => ({ ...f, [name]: files ? files[0] : value }));
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("category", form.category);
    fd.append("description", form.description);
    fd.append("composition", form.composition);
    if (form.image) fd.append("image", form.image);
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const fd = buildFormData();
      if (editingId) {
        await updateProduct(editingId, fd, secretKey);
        setMessage({ type: "success", text: "Product updated." });
      } else {
        await createProduct(fd, secretKey);
        setMessage({ type: "success", text: "Product added." });
      }
      resetForm();
      loadData();
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        setMessage({ type: "error", text: "Invalid secret key." });
      } else {
        setMessage({ type: "error", text: "Something went wrong. Please check the form." });
      }
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      description: p.description || "",
      composition: p.composition || "",
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id, secretKey);
      loadData();
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        setMessage({ type: "error", text: "Invalid secret key." });
      } else {
        setMessage({ type: "error", text: "Could not delete product." });
      }
    }
  };

  if (!unlocked) {
    return (
      <div className="container" style={{ padding: "60px 20px", maxWidth: 420 }}>
        <h2>Manage Products</h2>
        <p style={{ color: "#666" }}>Enter the admin key to add, edit, or delete products.</p>
        <form onSubmit={handleUnlock} style={{ display: "flex", gap: 10 }}>
          <input
            type="password"
            placeholder="Secret key"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" className="btn" disabled={checkingKey}>
            {checkingKey ? "Checking..." : "Unlock"}
          </button>
        </form>
        {unlockError && <p style={{ color: "crimson" }}>{unlockError}</p>}
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Manage Products</h2>
        <button onClick={handleLock} style={lockBtnStyle}>Lock</button>
      </div>

      {message && (
        <p style={{ color: message.type === "error" ? "crimson" : "green" }}>{message.text}</p>
      )}

      <form onSubmit={handleSubmit} style={formGridStyle}>
        <input name="name" placeholder="Product name" value={form.name} onChange={handleChange} required style={inputStyle} />

        <select name="category" value={form.category} onChange={handleChange} required style={inputStyle}>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input name="composition" placeholder="Composition" value={form.composition} onChange={handleChange} style={inputStyle} />

        <input type="file" name="image" accept="image/*" onChange={handleChange} style={inputStyle} />

        <textarea
          name="description" placeholder="Description" rows={3} value={form.description}
          onChange={handleChange} style={{ ...inputStyle, gridColumn: "1 / -1" }}
        />

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10 }}>
          <button type="submit" className="btn">{editingId ? "Update Product" : "Add Product"}</button>
          {editingId && (
            <button type="button" onClick={resetForm} style={cancelBtnStyle}>Cancel Edit</button>
          )}
        </div>
      </form>

      <h3 style={{ marginTop: 40 }}>Existing Products</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {products.map((p) => (
          <div key={p.id} style={cardStyle}>
            <h4 style={{ margin: "0 0 4px" }}>{p.name}</h4>
            <p style={{ margin: 0, fontSize: 13, color: "#777" }}>{p.category_name}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={() => handleEdit(p)} style={editBtnStyle}>Edit</button>
              <button onClick={() => handleDelete(p.id)} style={deleteBtnStyle}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid #ccc",
  borderRadius: 4,
  fontSize: 14,
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 12,
  border: "1px solid #eee",
  borderRadius: 8,
  padding: 20,
  background: "var(--color-teal-light)",
};

const cardStyle = {
  border: "1px solid #eee",
  borderRadius: 8,
  padding: 14,
  background: "#fff",
};

const editBtnStyle = {
  flex: 1,
  padding: "6px 10px",
  border: "1px solid var(--color-teal)",
  background: "#fff",
  borderRadius: 4,
  cursor: "pointer",
};

const deleteBtnStyle = {
  ...editBtnStyle,
  color: "crimson",
  borderColor: "crimson",
};

const cancelBtnStyle = {
  padding: "10px 18px",
  border: "1px solid #ccc",
  background: "#fff",
  borderRadius: 4,
  cursor: "pointer",
};

const lockBtnStyle = {
  padding: "6px 14px",
  border: "1px solid #ccc",
  background: "#fff",
  borderRadius: 4,
  cursor: "pointer",
};