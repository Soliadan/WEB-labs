import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ searchValue, onSearchChange, onSearchSubmit }) => (
  <header className="app-header">
    <div className="app-header-top">
      <Link className="brand-link" to="/">
        <span className="brand-icon">🧴</span>
        <span>Solomia’s Perfume</span>
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <a href="#">Create</a>
      </nav>

      <div className="header-icons">
        <button>🤍</button>
        <button>👤</button>
        <button className="cart">$1,689.00</button>
      </div>
    </div>

    <div className="search-bar-wrap">
      <input
        placeholder="Search anything..."
        value={searchValue !== undefined ? searchValue : undefined}
        onChange={(e) => {
          if (onSearchChange) {
            onSearchChange(e.target.value);
          }
        }}
      />
      <button
        className="btn"
        onClick={() => {
          if (onSearchSubmit) {
            onSearchSubmit();
          }
        }}
      >
        Search
      </button>
      <button
        className="btn btn-cancel"
        onClick={() => {
          if (onSearchChange) {
            onSearchChange("");
          }
        }}
      >
        Cancel
      </button>
    </div>
  </header>
);

export default Header;
