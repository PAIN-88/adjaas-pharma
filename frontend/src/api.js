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

// Admin-key-protected CRUD (X-Admin-Key header checked by the backend)
// NOTE: Do NOT set "Content-Type" manually for FormData — axios/browser
// must add the multipart boundary itself, otherwise Django can't parse it.
export const createProduct = (formData, secretKey) =>
  api.post("/products/", formData, {
    headers: { "X-Admin-Key": secretKey },
  });

export const updateProduct = (id, formData, secretKey) =>
  api.patch(`/products/${id}/`, formData, {
    headers: { "X-Admin-Key": secretKey },
  });

export const deleteProduct = (id, secretKey) =>
  api.delete(`/products/${id}/`, {
    headers: { "X-Admin-Key": secretKey },
  });

// Verify the admin key is actually correct, without touching real data.
// Backend returns 403 for a bad key, 404 for a good key + missing id.
export const verifyAdminKey = (secretKey) =>
  api.delete(`/products/0/`, { headers: { "X-Admin-Key": secretKey } });

export const submitContact = (payload) => api.post("/contact/", payload);

export default api;