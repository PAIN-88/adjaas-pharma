import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api",
});

export const getCompanyInfo = () => api.get("/company/");
export const getFeatures = () => api.get("/features/");
export const getSlides = () => api.get("/slides/");
export const getCategories = () => api.get("/categories/");
export const getProducts = (categorySlug) =>
  api.get("/products/", { params: categorySlug ? { category: categorySlug } : {} });
export const getProduct = (id) => api.get(`/products/${id}/`);

// Category CRUD (admin-key-protected)
export const createCategory = (payload, secretKey) =>
  api.post("/categories/", payload, { headers: { "X-Admin-Key": secretKey } });

export const updateCategory = (slug, payload, secretKey) =>
  api.patch(`/categories/${slug}/`, payload, { headers: { "X-Admin-Key": secretKey } });

export const deleteCategory = (slug, secretKey) =>
  api.delete(`/categories/${slug}/`, { headers: { "X-Admin-Key": secretKey } });

// Product CRUD (admin-key-protected)
export const createProduct = (formData, secretKey) =>
  api.post("/products/", formData, { headers: { "X-Admin-Key": secretKey } });

export const updateProduct = (id, formData, secretKey) =>
  api.patch(`/products/${id}/`, formData, { headers: { "X-Admin-Key": secretKey } });

export const deleteProduct = (id, secretKey) =>
  api.delete(`/products/${id}/`, { headers: { "X-Admin-Key": secretKey } });

export const verifyAdminKey = (secretKey) =>
  api.delete(`/products/0/`, { headers: { "X-Admin-Key": secretKey } });

export const submitContact = (payload) => api.post("/contact/", payload);

export default api;
