import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ searchValue, onSearchChange, onSearchSubmit }) => {
  return (
    <header className="app-header">
      <div className="app-header-top">
        <Link className="brand-link" to="/">
          <span className="brand-icon">🧴</span>
          <span>Solomia’s Perfume</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/create">Create</Link>
        </nav>

        <div className="header-icons">
          <Link className="cart cart-icon-link" to="/cart" aria-label="Open cart">
            🛒
          </Link>

          <button type="button" className="icon-btn" aria-label="Wishlist">
            🤍
          </button>
        </div>
      </div>

      <div className="search-bar-wrap">
        <input
          placeholder="Search anything..."
          value={searchValue !== undefined ? searchValue : ""}
          onChange={(e) => {
            if (onSearchChange) onSearchChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onSearchSubmit) onSearchSubmit();
          }}
        />
        <button
          className="btn-dark"
          type="button"
          onClick={() => {
            if (onSearchSubmit) onSearchSubmit();
          }}
        >
          Search
        </button>
        <button
          className="btn btn-cancel"
          type="button"
          onClick={() => {
            if (onSearchChange) onSearchChange("");
          }}
        >
          Cancel
        </button>
      </div>
    </header>
  );
};

export default Header;
