import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import { PerfumeProvider } from "./data/PerfumeContext";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
// X6: Сторінка кошика
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

const App = () => (
  <PerfumeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        {/* X6: маршрут для кошика */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  </PerfumeProvider>
);

export default App;
