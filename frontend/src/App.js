import ManageCategories from "./pages/ManageCategories";
// ... baaki imports same

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products/:id" element={<ProductDetail />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/manage-products" element={<ManageProducts />} />
  <Route path="/manage-categories" element={<ManageCategories />} />
</Routes>
