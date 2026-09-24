import React, { useEffect, useState } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory, verifyAdminKey } from "../api";

const emptyForm = { name: "", slug: "", icon: "", order: 0 };

const formatServerError = (data) => {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  try {
    return Object.entries(data)
      .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(" ") : msgs}`)
      .join(" | ");
  } catch {
    return null;
  }
};

export default function ManageCategories() {
  const [secretKey, setSecretKey] = useState(() => sessionStorage.getItem("admin_key") || "");
  const [keyInput, setKeyInput] = useState("");
  const [unlocked, setUnlocked] = useState(() => !!sessionStorage.getItem("admin_key"));
  const [unlockError, setUnlockError] = useState(null);
  const [checkingKey, setCheckingKey] = useState(false);

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState(null);
  const [message, setMessage] = useState(null);

  const loadData = () => {
    getCategories().then((r) => setCategories(r.data)).catch(() => {});
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
      sessionStorage.setItem("admin_key", keyInput);
      setSecretKey(keyInput);
      setUnlocked(true);
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
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
    setEditingSlug(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (form.name.length > 100) {
      setMessage({ type: "error", text: `Name is too long (${form.name.length}/100 characters).` });
      return;
    }
    if (form.slug.length > 110) {
      setMessage({ type: "error", text: `Slug is too long (${form.slug.length}/110 characters).` });
      return;
    }

    const payload = {
      name: form.name,
      slug: form.slug,
      icon: form.icon,
      order: Number(form.order) || 0,
    };

    try {
      if (editingSlug) {
        await updateCategory(editingSlug, payload, secretKey);
        setMessage({ type: "success", text: "Category updated." });
      } else {
        await createCategory(payload, secretKey);
        setMessage({ type: "success", text: "Category added." });
      }
      resetForm();
      loadData();
    } catch (err) {
      const status = err.response?.status;
      if (status === 403 || status === 401) {
        setMessage({ type: "error", text: "Invalid secret key." });
      } else {
        const serverMsg = formatServerError(err.response?.data);
        setMessage({
          type: "error",
          text: serverMsg ? `Rejected by server: ${serverMsg}` : "Something went wrong. Please check the form.",
        });
      }
    }
  };

  const handleEdit = (c) => {
    setEditingSlug(c.slug);
    setForm({ name: c.name, slug: c.slug, icon: c.icon || "", order: c.order || 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("Delete this category? Products inside it will also be deleted.")) return;
    try {
      await deleteCategory(slug, secretKey);
      loadData();
    } catch (err) {
      const status = err.response?.status;
      if (status === 403 || status === 401) {
        setMessage({ type: "error", text: "Invalid secret key." });
      } else {
        const serverMsg = formatServerError(err.response?.data);
        setMessage({
          type: "error",
          text: serverMsg ? `Rejected by server: ${serverMsg}` : "Could not delete category.",
        });
      }
    }
  };

  const autoSlug = (name) =>
    name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleNameChange = (e) => {
    const name = e.target.value;
    setForm((f) => ({
      ...f,
      name,
      slug: editingSlug ? f.slug : autoSlug(name),
    }));
  };

  if (!unlocked) {
    return (
      <div className="container" style={{ padding: "60px 20px", maxWidth: 420 }}>
        <h2>Manage Categories</h2>
        <p style={{ color: "#666" }}>Enter the admin key to add, edit, or delete categories.</p>
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
        <h2 style={{ margin: 0 }}>Manage Categories</h2>
        <button onClick={handleLock} style={lockBtnStyle}>Lock</button>
      </div>

      {message && (
        <p style={{ color: message.type === "error" ? "crimson" : "green" }}>{message.text}</p>
      )}

      <form onSubmit={handleSubmit} style={formGridStyle}>
        <input
          name="name"
          placeholder="Category name (e.g. Tablet)"
          value={form.name}
          onChange={handleNameChange}
          required
          style={inputStyle}
        />

        <input
          name="slug"
          placeholder="Slug (e.g. tablet)"
          value={form.slug}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="icon"
          placeholder="Icon (emoji, e.g. 💊)"
          value={form.icon}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="order"
          placeholder="Display order (e.g. 1)"
          value={form.order}
          onChange={handleChange}
          style={inputStyle}
        />

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10 }}>
          <button type="submit" className="btn">{editingSlug ? "Update Category" : "Add Category"}</button>
          {editingSlug && (
            <button type="button" onClick={resetForm} style={cancelBtnStyle}>Cancel Edit</button>
          )}
        </div>
      </form>

      <h3 style={{ marginTop: 40 }}>Existing Categories</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {categories.map((c) => (
          <div key={c.id} style={cardStyle}>
            <div style={{ fontSize: 24 }}>{c.icon || "💊"}</div>
            <h4 style={{ margin: "6px 0 2px" }}>{c.name}</h4>
            <p style={{ margin: 0, fontSize: 12, color: "#999" }}>/{c.slug}</p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#777" }}>{c.product_count} products</p>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={() => handleEdit(c)} style={editBtnStyle}>Edit</button>
              <button onClick={() => handleDelete(c.slug)} style={deleteBtnStyle}>Delete</button>
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
