import "./Header.css";
import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions";

const Header = ({ searchValue, onSearchChange, onSearchSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((s) => s.auth.currentUserId);
  const userEmail = useSelector((s) => s.auth.users?.[userId]?.email || "");
  const cartItems = useSelector((s) => s.carts[userId] || []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + (i.quantity || 0), 0),
    [cartItems]
  );

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
          {/* Cart icon (left) */}
          <Link className="cart cart-icon-link" to="/cart" aria-label="Open cart">
            <span className="cart-emoji">🛒</span>
            {cartCount > 0 ? <span className="cart-badge">{cartCount}</span> : null}
          </Link>

          {/* Big account icon (right) + logout */}
          <div className="account-wrap">
            <span className="signed-as">Signed in as: {userEmail || userId}</span>
            <button
              className="account-btn"
              type="button"
              onClick={() => {
                localStorage.removeItem("authEmail");
                dispatch(logoutUser());
                navigate("/login");
              }}
              aria-label="Sign out"
              title="Sign me out"
            >
              👤
            </button>

            <button
              className="logout-btn"
              type="button"
              onClick={() => {
                localStorage.removeItem("authEmail");
                dispatch(logoutUser());
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="search-bar-wrap">
        <input
          placeholder="Search anything..."
          value={searchValue !== undefined ? searchValue : ""}
          onChange={(e) => {
            if (onSearchChange) onSearchChange(e.target.value);
          }}
        />
        <button
          className="search-btn"
          type="button"
          onClick={() => {
            if (onSearchSubmit) onSearchSubmit();
          }}
        >
          Search
        </button>

        <button
          className="cancel-btn"
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
