// Новий файл

import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Success.css";

export default function Success() {
  return (
    <div className="page-with-footer">
      <Header />
      <main className="page-inner success-page">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h1>Order placed!</h1>
          <p>Your order was submitted successfully. Thank you 😊</p>
          <div className="success-actions">
            <Link className="btn-dark" to="/products">
              Continue shopping
            </Link>
            <Link className="btn" to="/cart">
              View cart
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
