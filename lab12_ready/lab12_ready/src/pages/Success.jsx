// Новий файл

import React from "react";
import { Link } from "react-router-dom";
import "./Success.css";

export default function Success() {
  return (
    <main className="success-page">
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
  );
}
